import { useState } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1,
  Volume2, Volume1, VolumeX, Heart, Maximize2, Mic2, List,
  MonitorSpeaker, PictureInPicture2
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

function ProgressBar() {
  const { progress, setProgress, currentTime, totalTime, currentTrack } = usePlayer();

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setProgress(Math.max(0, Math.min(100, pct)));
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <span className="text-[#b3b3b3] text-xs w-9 text-right tabular-nums">{currentTime}</span>
      <div
        className="player-range flex-1 h-1 group cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative h-1 bg-[#535353] rounded-full group-hover:bg-[#535353]">
          <div
            className="absolute top-0 left-0 h-full bg-white group-hover:bg-[#1ed760] rounded-full transition-colors"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={e => setProgress(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          />
        </div>
      </div>
      <span className="text-[#b3b3b3] text-xs w-9 tabular-nums">{totalTime}</span>
    </div>
  );
}

function VolumeControl() {
  const { volume, setVolume, isMuted, setIsMuted } = usePlayer();

  const VIcon = isMuted || volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  return (
    <div className="player-range flex items-center gap-2">
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="text-[#b3b3b3] hover:text-white transition-colors"
      >
        <VIcon size={16} />
      </button>
      <div className="relative w-24 h-1 group cursor-pointer">
        <div className="absolute top-0 left-0 w-full h-full bg-[#535353] rounded-full">
          <div
            className="h-full bg-white group-hover:bg-[#1ed760] rounded-full transition-colors"
            style={{ width: `${isMuted ? 0 : volume}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={isMuted ? 0 : volume}
          onChange={e => { setVolume(Number(e.target.value)); setIsMuted(false); }}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          style={{ height: '4px' }}
        />
      </div>
    </div>
  );
}

export default function Player() {
  const {
    currentTrack, isPlaying, togglePlay, skipNext, skipPrev,
    isShuffle, setIsShuffle, repeatMode, setRepeatMode,
    isLiked, setIsLiked,
  } = usePlayer();

  const RepeatIcon = repeatMode === 2 ? Repeat1 : Repeat;

  return (
    <footer className="flex items-center justify-between px-4 h-[90px] bg-[#181818] border-t border-[#282828] flex-shrink-0 z-20">

      {/* Left: Now playing info */}
      <div className="flex items-center gap-4 w-[30%] min-w-0">
        {currentTrack ? (
          <>
            <div
              className="w-14 h-14 rounded flex-shrink-0 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #a13028, #351010)',
              }}
            />
            <div className="overflow-hidden min-w-0">
              <p className="text-white text-sm font-medium truncate hover:underline cursor-pointer">
                {currentTrack.title}
              </p>
              <p className="text-[#b3b3b3] text-xs truncate hover:text-white hover:underline cursor-pointer transition-colors">
                {currentTrack.artist}
              </p>
            </div>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex-shrink-0 transition-all hover:scale-110 ${isLiked ? 'text-[#1ed760]' : 'text-[#b3b3b3] hover:text-white'}`}
            >
              <Heart size={16} fill={isLiked ? '#1ed760' : 'transparent'} />
            </button>
            <button className="flex-shrink-0 text-[#b3b3b3] hover:text-white transition-colors hidden lg:block">
              <PictureInPicture2 size={16} />
            </button>
          </>
        ) : (
          <div className="text-[#b3b3b3] text-sm">Nenhuma faixa selecionada</div>
        )}
      </div>

      {/* Center: Controls + progress */}
      <div className="flex flex-col items-center gap-2 w-[40%]">
        <div className="flex items-center gap-6">
          {/* Shuffle */}
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`transition-all hover:scale-110 relative ${isShuffle ? 'text-[#1ed760]' : 'text-[#b3b3b3] hover:text-white'}`}
          >
            <Shuffle size={16} />
            {isShuffle && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1ed760] rounded-full" />}
          </button>

          {/* Skip back */}
          <button onClick={skipPrev} className="text-[#b3b3b3] hover:text-white hover:scale-110 transition-all">
            <SkipBack size={20} fill="currentColor" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all hover:bg-[#f0f0f0]"
          >
            {isPlaying
              ? <Pause size={16} fill="black" className="text-black" />
              : <Play size={16} fill="black" className="text-black ml-0.5" />
            }
          </button>

          {/* Skip forward */}
          <button onClick={skipNext} className="text-[#b3b3b3] hover:text-white hover:scale-110 transition-all">
            <SkipForward size={20} fill="currentColor" />
          </button>

          {/* Repeat */}
          <button
            onClick={() => setRepeatMode((repeatMode + 1) % 3)}
            className={`transition-all hover:scale-110 relative ${repeatMode > 0 ? 'text-[#1ed760]' : 'text-[#b3b3b3] hover:text-white'}`}
          >
            <RepeatIcon size={16} />
            {repeatMode > 0 && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1ed760] rounded-full" />}
          </button>
        </div>

        {/* Progress bar */}
        <ProgressBar />
      </div>

      {/* Right: Extra controls */}
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
