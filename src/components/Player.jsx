import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Volume1,
  VolumeX,
  Heart,
  Maximize2,
  Mic2,
  List,
  MonitorSpeaker,
  Loader2,
} from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import GradientCover from "./GradientCover";
import { useNav } from "../context/NavContext";

function ProgressBar() {
  const {
    progress,
    currentTime,
    duration,
    seek,
    currentTimeStr,
    totalTimeStr,
  } = usePlayer();

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seek(((e.clientX - rect.left) / rect.width) * duration);
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <span className="text-[#b3b3b3] text-xs w-9 text-right tabular-nums">
        {currentTimeStr}
      </span>
      <div
        className="player-range flex-1 group cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative h-1 bg-[#535353] rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-white group-hover:bg-[#1ed760] rounded-full transition-colors pointer-events-none"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ left: `calc(${Math.min(100, progress)}% - 6px)` }}
          />
        </div>
      </div>
      <span className="text-[#b3b3b3] text-xs w-9 tabular-nums">
        {totalTimeStr}
      </span>
    </div>
  );
}

function VolumeControl() {
  const { volume, setVolume, isMuted, setIsMuted } = usePlayer();
  const VIcon =
    isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="player-range flex items-center gap-2">
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="text-[#b3b3b3] hover:text-white transition-colors"
      >
        <VIcon size={16} />
      </button>
      <div
        className="relative w-24 group cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setVolume((e.clientX - rect.left) / rect.width);
          setIsMuted(false);
        }}
      >
        <div className="h-1 bg-[#535353] rounded-full">
          <div
            className="h-full bg-white group-hover:bg-[#1ed760] rounded-full transition-colors pointer-events-none"
            style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    skipNext,
    skipPrev,
    isShuffle,
    setIsShuffle,
    repeatMode,
    setRepeatMode,
    isLiked,
    setIsLiked,
    isLoading,
  } = usePlayer();
  const { navigate } = useNav();
  const RepeatIcon = repeatMode === 2 ? Repeat1 : Repeat;

  return (
    <footer className="flex items-center justify-between px-4 h-[90px] bg-[#181818] border-t border-[#282828] flex-shrink-0 z-20 select-none">
      {/* Left: now playing */}
      <div className="flex items-center gap-3 w-[30%] min-w-0">
        {currentTrack ? (
          <>
            <div
              className="w-14 h-14 flex-shrink-0 rounded cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() =>
                currentTrack.artist &&
                navigate("artist", { artist: currentTrack.artist })
              }
            >
              <GradientCover
                gradient={
                  currentTrack.album?.gradient || currentTrack.artist?.gradient
                }
                className="w-14 h-14"
              />
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-white text-sm font-medium truncate hover:underline cursor-pointer">
                {currentTrack.title}
              </p>
              <p
                className="text-[#b3b3b3] text-xs truncate hover:text-white hover:underline cursor-pointer transition-colors"
                onClick={() =>
                  currentTrack.artist &&
                  navigate("artist", { artist: currentTrack.artist })
                }
              >
                {currentTrack.artist?.name}
              </p>
            </div>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex-shrink-0 transition-all hover:scale-110 ${isLiked ? "text-[#1ed760]" : "text-[#b3b3b3] hover:text-white"}`}
            >
              <Heart size={16} fill={isLiked ? "#1ed760" : "transparent"} />
            </button>
          </>
        ) : (
          <p className="text-[#b3b3b3] text-sm">Nenhuma faixa selecionada</p>
        )}
      </div>

      {/* Center: controls */}
      <div className="flex flex-col items-center gap-2 w-[40%]">
        <div className="flex items-center gap-5">
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`relative transition-all hover:scale-110 ${isShuffle ? "text-[#1ed760]" : "text-[#b3b3b3] hover:text-white"}`}
          >
            <Shuffle size={16} />
            {isShuffle && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1ed760] rounded-full" />
            )}
          </button>

          <button
            onClick={skipPrev}
            className="text-[#b3b3b3] hover:text-white hover:scale-110 transition-all"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>

          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all hover:bg-[#f0f0f0] disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin text-black" />
            ) : isPlaying ? (
              <Pause size={16} fill="black" className="text-black" />
            ) : (
              <Play size={16} fill="black" className="text-black ml-0.5" />
            )}
          </button>

          <button
            onClick={skipNext}
            className="text-[#b3b3b3] hover:text-white hover:scale-110 transition-all"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>

          <button
            onClick={() => setRepeatMode((repeatMode + 1) % 3)}
            className={`relative transition-all hover:scale-110 ${repeatMode > 0 ? "text-[#1ed760]" : "text-[#b3b3b3] hover:text-white"}`}
          >
            <RepeatIcon size={16} />
            {repeatMode > 0 && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1ed760] rounded-full" />
            )}
          </button>
        </div>
        <ProgressBar />
      </div>

      {/* Right: extras */}
      <div className="flex items-center gap-3 justify-end w-[30%]">
        <button className="text-[#b3b3b3] hover:text-white transition-colors hidden lg:block">
          <Mic2 size={16} />
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors hidden lg:block">
          <List size={16} />
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors hidden lg:block">
          <MonitorSpeaker size={16} />
        </button>
        <VolumeControl />
        <button className="text-[#b3b3b3] hover:text-white transition-colors hidden xl:block">
          <Maximize2 size={14} />
        </button>
      </div>
    </footer>
  );
}
