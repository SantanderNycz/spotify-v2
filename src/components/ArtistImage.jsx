import { useState, useEffect } from "react";
import {
  fetchArtistFromDeezer,
  fetchPlaylistCover,
} from "../services/deezerService";
import GradientCover from "./GradientCover";

/**
 * Componente universal para capas vindas da Deezer.
 *
 * Props:
 *   name       - nome do artista ou playlist a pesquisar
 *   type       - 'artist' | 'playlist' (default: 'artist')
 *   gradient   - fallback de gradiente
 *   className  - classes para o container
 *   rounded    - true → círculo (artistas)
 *   size       - 'small' | 'medium' | 'large'
 */
export default function ArtistImage({
  name,
  // legacy prop support
  artistName,
  type = "artist",
  gradient,
  className = "",
  rounded = false,
  size = "medium",
}) {
  const resolvedName = name || artistName;
  const [imageUrl, setImageUrl] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loading, setLoading] = useState(!!resolvedName);

  useEffect(() => {
    if (!resolvedName) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setImgLoaded(false);
    setImageUrl(null);

    const fetcher =
      type === "playlist"
        ? fetchPlaylistCover(resolvedName)
        : fetchArtistFromDeezer(resolvedName);

    fetcher.then((data) => {
      if (cancelled || !data) {
        setLoading(false);
        return;
      }
      const url =
        size === "small"
          ? data.imageSmall
          : size === "large"
            ? data.imageLarge
            : data.imageMedium;
      setImageUrl(url || null);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [resolvedName, type, size]);

  const shape = rounded ? "rounded-full" : "rounded";

  if (loading && !imageUrl) {
    return <div className={`skeleton ${shape} ${className}`} />;
  }

  if (imageUrl) {
    return (
      <div className={`relative overflow-hidden ${shape} ${className}`}>
        <GradientCover
          gradient={gradient}
          className={`absolute inset-0 w-full h-full ${shape}`}
          rounded={rounded}
        />
        <img
          src={imageUrl}
          alt={resolvedName}
          onLoad={() => setImgLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover ${shape} transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          draggable={false}
        />
      </div>
    );
  }

  return (
    <GradientCover
      gradient={gradient}
      className={`${shape} ${className}`}
      rounded={rounded}
    />
  );
}
