import { useState } from 'react';
import { Play, Pause, Heart, Music } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

function GradientCover({ gradient, icon, size = 'md' }) {
  const sizeClass = size === 'sm' ? 'w-12 h-12' : size === 'lg' ? 'w-full aspect-square' : 'w-full aspect-square';
  return (
    <div
      className={`${sizeClass} flex items-center justify-center rounded`}
      style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
    >
      {icon === 'heart' && <Heart size={size === 'sm' ? 16 : 40} fill="white" className="text-white" />}
      {icon === 'music' && <Music size={size === 'sm' ? 16 : 40} className="text-white opacity-60" />}
    </div>
  );
}

export default function PlaylistCard({ item, onPlay, isRound = false }) {
  const [hovered, setHovered] = useState(false);
  const { currentTrack, isPlaying, togglePlay } = usePlayer();

  const isCurrentlyPlaying = currentTrack && isPlaying;

  return (
    <div
      className="bg-[#181818] hover:bg-[#282828] rounded-md p-4 cursor-pointer transition-all duration-200 group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay && onPlay(item)}
    >
      {/* Cover image / gradient */}
      <div className={`relative mb-4 shadow-2xl ${isRound ? 'rounded-full overflow-hidden' : 'rounded'}`}>
        <GradientCover gradient={item.gradient || ['#333', '#555']} icon={item.icon} size="lg" />

        {/* Play/Pause button overlay */}
        <button
          className={`absolute bottom-2 right-2 w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ${
            hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          } hover:scale-110 hover:bg-[#3be377]`}
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
        >
          {isCurrentlyPlaying
            ? <Pause size={20} fill="black" className="text-black" />
            : <Play size={20} fill="black" className="text-black ml-0.5" />
          }
        </button>
      </div>

      {/* Info */}
      <div className="overflow-hidden">
        <p className="text-white text-sm font-semibold truncate mb-1">{item.name}</p>
        <p className="text-[#b3b3b3] text-xs truncate leading-relaxed">
          {item.description || item.type || 'Playlist'}
        </p>
      </div>
    </div>
  );
}

export function RecentCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  const { isPlaying, togglePlay } = usePlayer();

  return (
    <button
      className="flex items-center gap-3 bg-[#ffffff1a] hover:bg-[#ffffff33] rounded-md overflow-hidden transition-all duration-200 group relative w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="w-14 h-14 flex-shrink-0">
        <GradientCover gradient={item.gradient || ['#333', '#555']} icon={item.icon} size="sm" />
      </div>
      <span className="text-white text-sm font-bold truncate pr-2">{item.name}</span>

      {/* Floating play button */}
      <button
        className={`absolute right-3 w-10 h-10 bg-[#1ed760] rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        } hover:scale-110`}
        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
      >
        {isPlaying
          ? <Pause size={16} fill="black" className="text-black" />
          : <Play size={16} fill="black" className="text-black ml-0.5" />
        }
      </button>
    </button>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-[#181818] rounded-md p-4">
      <div className="skeleton w-full aspect-square rounded mb-4" />
      <div className="skeleton h-4 rounded mb-2 w-3/4" />
      <div className="skeleton h-3 rounded w-1/2" />
    </div>
  );
}
