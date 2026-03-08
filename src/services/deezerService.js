/**
 * Deezer API Service
 * - Gratuita, sem API key, CORS aberto
 * - Cache em memória para evitar chamadas repetidas
 * - Proxy via allorigins para evitar qualquer bloqueio CORS
 */

const cache = new Map(); // artistName -> { imageSmall, imageMedium, imageLarge, id }
const pending = new Map(); // artistName -> Promise (evita chamadas duplicadas em paralelo)

const DEEZER_BASE = "https://api.deezer.com";

// allorigins proxy para garantir CORS em qualquer ambiente
function proxyUrl(url) {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
}

/**
 * Busca dados de um artista na Deezer API.
 * Retorna { imageSmall, imageMedium, imageLarge, deezerId } ou null.
 */
export async function fetchArtistFromDeezer(artistName) {
  if (!artistName) return null;

  const key = artistName.toLowerCase().trim();

  // Cache hit
  if (cache.has(key)) return cache.get(key);

  // Deduplicate in-flight requests
  if (pending.has(key)) return pending.get(key);

  const promise = (async () => {
    try {
      const searchUrl = `${DEEZER_BASE}/search/artist?q=${encodeURIComponent(artistName)}&limit=5`;
      const res = await fetch(proxyUrl(searchUrl));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (!data?.data?.length) return null;

      // Pega o resultado com nome mais parecido
      const best =
        data.data.find((a) => a.name.toLowerCase() === key) || data.data[0];

      const result = {
        deezerId: best.id,
        imageSmall: best.picture_small, // 56x56
        imageMedium: best.picture_medium, // 250x250
        imageLarge: best.picture_xl || best.picture_big, // 1000x1000 ou 500x500
        name: best.name,
        fans: best.nb_fan,
      };

      cache.set(key, result);
      return result;
    } catch (err) {
      console.warn(`[Deezer] Falha ao buscar "${artistName}":`, err.message);
      cache.set(key, null); // cache negativo para não tentar de novo
      return null;
    } finally {
      pending.delete(key);
    }
  })();

  pending.set(key, promise);
  return promise;
}

/**
 * Busca imagens de vários artistas em paralelo (com limite de concorrência).
 */
export async function fetchArtistsBatch(artistNames, concurrency = 4) {
  const results = {};
  const chunks = [];

  for (let i = 0; i < artistNames.length; i += concurrency) {
    chunks.push(artistNames.slice(i, i + concurrency));
  }

  for (const chunk of chunks) {
    const settled = await Promise.allSettled(
      chunk.map((name) =>
        fetchArtistFromDeezer(name).then((data) => ({ name, data })),
      ),
    );
    for (const s of settled) {
      if (s.status === "fulfilled" && s.value.data) {
        results[s.value.name.toLowerCase()] = s.value.data;
      }
    }
  }

  return results;
}

/**
 * Retorna URL de imagem do cache (síncrono), ou null se ainda não carregou.
 */
export function getArtistImageCached(artistName) {
  return cache.get(artistName?.toLowerCase()?.trim()) ?? null;
}
