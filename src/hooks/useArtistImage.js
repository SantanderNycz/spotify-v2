import { useState, useEffect } from 'react';
import { fetchArtistFromDeezer } from '../services/deezerService';

/**
 * Hook que retorna a imagem de um artista via Deezer.
 * Enquanto carrega, retorna { imageUrl: null, loading: true }.
 * Se falhar, retorna { imageUrl: null, loading: false } — o componente usa o fallback de gradiente.
 *
 * @param {string} artistName - nome do artista
 * @param {'small'|'medium'|'large'} size - tamanho desejado (default: 'medium')
 */
export function useArtistImage(artistName, size = 'medium') {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading]   = useState(!!artistName);
  const [error, setError]       = useState(false);

  useEffect(() => {
    if (!artistName) { setLoading(false); return; }

    let cancelled = false;
    setLoading(true);
    setError(false);

    fetchArtistFromDeezer(artistName).then(data => {
      if (cancelled) return;
      if (data) {
        const url = size === 'small'  ? data.imageSmall
                  : size === 'large'  ? data.imageLarge
                  : data.imageMedium;
        setImageUrl(url);
      } else {
        setError(true);
      }
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [artistName, size]);

  return { imageUrl, loading, error };
}

/**
 * Hook que pré-carrega imagens de múltiplos artistas de uma vez.
 * Útil para pré-aquecer o cache numa vista de grid.
 */
export function useArtistImages(artistNames) {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!artistNames?.length) { setLoading(false); return; }

    let cancelled = false;

    Promise.allSettled(
      artistNames.map(name =>
        fetchArtistFromDeezer(name).then(data => ({ name, data }))
      )
    ).then(results => {
      if (cancelled) return;
      const map = {};
      for (const r of results) {
        if (r.status === 'fulfilled' && r.value.data) {
          map[r.value.name.toLowerCase()] = r.value.data;
        }
      }
      setImages(map);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [artistNames?.join(',')]);

  return { images, loading };
}
