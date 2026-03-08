/**
 * Deezer API Service — via Vite proxy (/deezer → https://api.deezer.com)
 * Sem CORS, cache em memória, deduplicação de requests paralelos.
 */

const artistCache = new Map();
const playlistCache = new Map();
const pending = new Map();

async function deezerFetch(path) {
  const res = await fetch(`/deezer${path}`, {
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ─── Artistas ────────────────────────────────────────────────────────────────

export async function fetchArtistFromDeezer(artistName) {
  if (!artistName) return null;
  const key = "artist:" + artistName.toLowerCase().trim();

  if (artistCache.has(key)) return artistCache.get(key);
  if (pending.has(key)) return pending.get(key);

  const promise = (async () => {
    try {
      const data = await deezerFetch(
        `/search/artist?q=${encodeURIComponent(artistName)}&limit=5`,
      );
      if (!data?.data?.length) {
        artistCache.set(key, null);
        return null;
      }

      const best =
        data.data.find(
          (a) => a.name.toLowerCase() === artistName.toLowerCase(),
        ) || data.data[0];
      const result = {
        deezerId: best.id,
        imageSmall: best.picture_small,
        imageMedium: best.picture_medium,
        imageLarge: best.picture_xl || best.picture_big,
        name: best.name,
        fans: best.nb_fan,
      };
      artistCache.set(key, result);
      return result;
    } catch (err) {
      console.warn(`[Deezer] Artista "${artistName}":`, err.message);
      artistCache.set(key, null);
      return null;
    } finally {
      pending.delete(key);
    }
  })();

  pending.set(key, promise);
  return promise;
}

// ─── Playlists ────────────────────────────────────────────────────────────────

export async function fetchPlaylistCover(playlistName) {
  if (!playlistName) return null;
  const key = "playlist:" + playlistName.toLowerCase().trim();

  if (playlistCache.has(key)) return playlistCache.get(key);
  if (pending.has(key)) return pending.get(key);

  const promise = (async () => {
    try {
      const data = await deezerFetch(
        `/search/playlist?q=${encodeURIComponent(playlistName)}&limit=5`,
      );
      if (!data?.data?.length) {
        playlistCache.set(key, null);
        return null;
      }

      const best = data.data[0];
      const result = {
        imageSmall: best.picture_small,
        imageMedium: best.picture_medium,
        imageLarge: best.picture_xl || best.picture_big || best.picture_medium,
        title: best.title,
      };
      playlistCache.set(key, result);
      return result;
    } catch (err) {
      console.warn(`[Deezer] Playlist "${playlistName}":`, err.message);
      playlistCache.set(key, null);
      return null;
    } finally {
      pending.delete(key);
    }
  })();

  pending.set(key, promise);
  return promise;
}

export function getArtistImageCached(artistName) {
  return artistCache.get("artist:" + artistName?.toLowerCase()?.trim()) ?? null;
}
