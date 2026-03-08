import { useState } from 'react';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { getArtistById, getAlbumById } from '../data/mockData';
import GradientCover from './GradientCover';

function formatDuration(secs) {
  const s = Math.floor(secs || 0);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// Equalizer bars
function Equalizer({ playing }) {
  if (!playing) return <span className="text-[#1ed760] text-sm font-bold">▶</span>;
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="eq-bar w-[3px] bg-[#1ed760] rounded-sm" style={{ height: '8px' }} />
      ))}
    </div>
  );
}

export default function TrackRow({ track, index, showAlbum = true, queue, onPlay }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const { currentTrack, isPlaying, play, pause, playQueue } = usePlayer();

  const artist = getArtistById(track.artistId);
  const album  = getAlbumById(track.albumId);
  const isCurrent = currentTrack?.id === track.id;
  const isThisPlaying = isCurrent && isPlaying;

  const handlePlay = () => {
    if (isCurrent) {
      if (isPlaying) pause();
      else play();
    } else {
      if (queue) playQueue(queue, track);
      else if (onPlay) onPlay(track);
      else play(track);
    }
  };

  return (
    <div
      className={`grid items-center gap-4 px-4 py-2 rounded-md group cursor-default transition-colors duration-150 ${
        hovered ? 'bg-white/10' : isCurrent ? 'bg-white/5' : ''
      }`}
      style={{ gridTemplateColumns: showAlbum ? '16px 4fr 2fr 1fr' : '16px 1fr 1fr' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={handlePlay}
    >
      {/* Index / play button */}
      <div className="flex items-center justify-center w-4 h-4">
        {hovered ? (
          <button onClick={handlePlay} className="text-white">
            {isThisPlaying
              ? <Pause size={14} fill="white" />
              : <Play  size={14} fill="white" className="ml-px" />
            }
          </button>
        ) : isCurrent ? (
          <Equalizer playing={isThisPlaying} />
        ) : (
          <span className="text-[#b3b3b3] text-sm">{index + 1}</span>
        )}
      </div>

      {/* Title + artist */}
      <div className="flex items-center gap-3 overflow-hidden">
        {album && (
          <GradientCover
            gradient={album.gradient}
            className="w-10 h-10 flex-shrink-0"
          />
        )}
        <div className="overflow-hidden">
          <p className={`text-sm font-medium truncate ${isCurrent ? 'text-[#1ed760]' : 'text-white'}`}>
            {track.title}
          </p>
          <p className="text-xs text-[#b3b3b3] truncate hover:underline hover:text-white cursor-pointer transition-colors">
            {artist?.name}
          </p>
        </div>
      </div>

      {/* Album (optional) */}
      {showAlbum && (
        <p className="text-sm text-[#b3b3b3] truncate hover:underline hover:text-white cursor-pointer hidden md:block transition-colors">
          {album?.name}
        </p>
      )}

      {/* Right controls */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => setLiked(l => !l)}
          className={`transition-all hover:scale-110 ${
            liked ? 'text-[#1ed760] opacity-100' : 'text-[#b3b3b3] opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart size={14} fill={liked ? '#1ed760' : 'transparent'} />
        </button>
        <span className="text-sm text-[#b3b3b3] tabular-nums w-10 text-right">
          {formatDuration(track.duration)}
        </span>
        <button className="text-[#b3b3b3] opacity-0 group-hover:opacity-100 transition-opacity hover:text-white">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}
