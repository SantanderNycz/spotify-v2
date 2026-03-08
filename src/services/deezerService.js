/**
 * Deezer API Service
 * Tenta CORS direto primeiro (Deezer suporta), fallback para corsproxy.io.
 * Cache em memória + deduplicação de requests em paralelo.
 */

const cache = new Map(); // key -> data | null
const pending = new Map(); // key -> Promise

const ENDPOINTS = [
  // 1. Direto (Deezer tem CORS headers para GET público)
  (q) =>
    `https://api.deezer.com/search/artist?q=${encodeURIComponent(q)}&limit=5`,
  // 2. Fallback: corsproxy.io
  (q) =>
    `https://corsproxy.io/?${encodeURIComponent(`https://api.deezer.com/search/artist?q=${q}&limit=5`)}`,
];

async function fetchWithFallback(artistName) {
  for (const endpoint of ENDPOINTS) {
    try {
      const res = await fetch(endpoint(artistName), {
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data?.data?.length) return data.data;
    } catch (err) {
      // tenta próximo endpoint
      console.warn(
        `[Deezer] endpoint falhou (${err.message}), tentando fallback…`,
      );
    }
  }
  return null;
}

export async function fetchArtistFromDeezer(artistName) {
  if (!artistName) return null;
  const key = artistName.toLowerCase().trim();

  if (cache.has(key)) return cache.get(key);
  if (pending.has(key)) return pending.get(key);

  const promise = (async () => {
    try {
      const results = await fetchWithFallback(artistName);
      if (!results) {
        cache.set(key, null);
        return null;
      }

      const best =
        results.find((a) => a.name.toLowerCase() === key) || results[0];
      const result = {
        deezerId: best.id,
        imageSmall: best.picture_small,
        imageMedium: best.picture_medium,
        imageLarge: best.picture_xl || best.picture_big,
        name: best.name,
        fans: best.nb_fan,
      };
      cache.set(key, result);
      return result;
    } catch (err) {
      console.warn(`[Deezer] Falha ao buscar "${artistName}":`, err.message);
      cache.set(key, null);
      return null;
    } finally {
      pending.delete(key);
    }
  })();

  pending.set(key, promise);
  return promise;
}

export function getArtistImageCached(artistName) {
  return cache.get(artistName?.toLowerCase()?.trim()) ?? null;
}
