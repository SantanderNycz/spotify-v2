import { useState } from 'react';
import { useArtistImage } from '../hooks/useArtistImage';
import GradientCover from './GradientCover';

/**
 * Componente universal para imagem de artista.
 * - Busca automaticamente na Deezer API
 * - Mostra skeleton enquanto carrega
 * - Faz fade-in suave quando a imagem chega
 * - Cai de volta para o GradientCover se falhar
 *
 * Props:
 *   artistName  - string, nome do artista para buscar
 *   gradient    - array, fallback de gradiente se a imagem falhar
 *   className   - classes Tailwind para o container
 *   rounded     - boolean, true para artistas (círculo), false para álbuns
 *   size        - 'small' | 'medium' | 'large'
 */
export default function ArtistImage({
  artistName,
  gradient,
  className = '',
  rounded = false,
  size = 'medium',
}) {
  const { imageUrl, loading } = useArtistImage(artistName, size);
  const [imgLoaded, setImgLoaded] = useState(false);

  const shape = rounded ? 'rounded-full' : 'rounded';

  // Skeleton enquanto a requisição está em voo
  if (loading && !imageUrl) {
    return (
      <div className={`skeleton ${shape} ${className}`} />
    );
  }

  // Se temos URL, renderiza a img com fade-in + fallback de gradiente por baixo
  if (imageUrl) {
    return (
      <div className={`relative overflow-hidden ${shape} ${className}`}>
        {/* Gradiente de fundo (visível até a img carregar) */}
        <GradientCover
          gradient={gradient}
          className={`absolute inset-0 w-full h-full ${shape}`}
          rounded={rounded}
        />
        {/* Imagem real */}
        <img
          src={imageUrl}
          alt={artistName}
          onLoad={() => setImgLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover ${shape} transition-opacity duration-500 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          draggable={false}
        />
      </div>
    );
  }

  // Fallback: gradiente puro
  return (
    <GradientCover
      gradient={gradient}
      className={`${shape} ${className}`}
      rounded={rounded}
    />
  );
}
