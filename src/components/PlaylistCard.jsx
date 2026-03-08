import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import { useNav } from "../context/NavContext";
import { getTracksForPlaylist } from "../data/mockData";
import GradientCover from "./GradientCover";

export default function PlaylistCard({
  item,
  isRound = false,
  type = "playlist",
}) {
  const [hovered, setHovered] = useState(false);
  const { currentTrack, isPlaying, playQueue, togglePlay } = usePlayer();
  const { navigate } = useNav();

  const tracks = item.trackIds ? getTracksForPlaylist(item) : [];
  const isThisPlaying =
    isPlaying &&
    tracks.length > 0 &&
    tracks.some((t) => t.id === currentTrack?.id);

  const handlePlay = (e) => {
    e.stopPropagation();
    if (isThisPlaying) {
      togglePlay();
    } else if (tracks.length > 0) {
      playQueue(tracks, tracks[0]);
    }
  };

  const handleClick = () => {
    if (type === "artist" || (item.followers === undefined && item.genre)) {
      navigate("artist", { artist: item });
    } else {
      navigate("playlist", { playlist: item });
    }
  };

  return (
    <div
      className="bg-[#181818] hover:bg-[#282828] rounded-md p-4 cursor-pointer transition-all duration-200 group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <div
        className={`relative mb-4 shadow-2xl ${isRound ? "rounded-full overflow-hidden" : "rounded"}`}
      >
        <GradientCover
          gradient={item.gradient}
          className={`w-full aspect-square ${isRound ? "rounded-full" : "rounded"}`}
          rounded={isRound}
        />
        {tracks.length > 0 && (
          <button
            className={`absolute bottom-2 right-2 w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 hover:bg-[#3be377] ${
              hovered || isThisPlaying
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
            onClick={handlePlay}
          >
            {isThisPlaying ? (
              <Pause size={20} fill="black" className="text-black" />
            ) : (
              <Play size={20} fill="black" className="text-black ml-0.5" />
            )}
          </button>
        )}
      </div>
      <p className="text-white text-sm font-semibold truncate mb-1">
        {item.name}
      </p>
      <p className="text-[#b3b3b3] text-xs truncate leading-relaxed">
        {item.description || item.genre || item.type || "Playlist"}
      </p>
    </div>
  );
}

export function RecentCard({ item, type = "playlist" }) {
  const [hovered, setHovered] = useState(false);
  const { isPlaying, playQueue, togglePlay, currentTrack } = usePlayer();
  const { navigate } = useNav();

  const tracks = item.trackIds ? getTracksForPlaylist(item) : [];
  const isThisPlaying =
    isPlaying && tracks.some((t) => t.id === currentTrack?.id);

  const handlePlay = (e) => {
    e.stopPropagation();
    if (isThisPlaying) togglePlay();
    else if (tracks.length > 0) playQueue(tracks, tracks[0]);
  };

  const handleClick = () => {
    if (type === "artist") navigate("artist", { artist: item });
    else navigate("playlist", { playlist: item });
  };

  return (
    <button
      className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-md overflow-hidden transition-all duration-200 group relative w-full text-left"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <div className="w-14 h-14 flex-shrink-0">
        <GradientCover
          gradient={item.gradient}
          className="w-14 h-14"
          rounded={type === "artist"}
        />
      </div>
      <span className="text-white text-sm font-bold truncate pr-2 flex-1">
        {item.name}
      </span>
      {tracks.length > 0 && (
        <button
          className={`absolute right-3 w-10 h-10 bg-[#1ed760] rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 ${
            hovered || isThisPlaying
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2"
          }`}
          onClick={handlePlay}
        >
          {isThisPlaying ? (
            <Pause size={16} fill="black" className="text-black" />
          ) : (
            <Play size={16} fill="black" className="text-black ml-0.5" />
          )}
        </button>
      )}
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
