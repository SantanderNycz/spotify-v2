import { createContext, useContext, useState, useRef, useCallback } from 'react';
import { mockTracks } from '../data/mockData';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(mockTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(32);
  const [volume, setVolume] = useState(70);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0=off, 1=all, 2=one
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [queue, setQueue] = useState(mockTracks);
  const intervalRef = useRef(null);

  const play = useCallback((track) => {
    if (track) setCurrentTrack(track);
    setIsPlaying(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          return 0;
        }
        return p + 0.1;
      });
    }, 100);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const skipNext = useCallback(() => {
    const idx = queue.findIndex(t => t.id === currentTrack.id);
    const next = queue[(idx + 1) % queue.length];
    setCurrentTrack(next);
    setProgress(0);
    if (isPlaying) play(next);
  }, [queue, currentTrack, isPlaying, play]);

  const skipPrev = useCallback(() => {
    if (progress > 5) { setProgress(0); return; }
    const idx = queue.findIndex(t => t.id === currentTrack.id);
    const prev = queue[(idx - 1 + queue.length) % queue.length];
    setCurrentTrack(prev);
    setProgress(0);
    if (isPlaying) play(prev);
  }, [queue, currentTrack, isPlaying, progress, play]);

  const formatTime = (secs) => {
    const s = Math.floor(secs);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  };

  const currentTime = formatTime((progress / 100) * (currentTrack?.duration || 0));
  const totalTime = formatTime(currentTrack?.duration || 0);

  return (
    <PlayerContext.Provider value={{
      currentTrack, isPlaying, progress, volume, isShuffle, repeatMode,
      isMuted, isLiked, queue, currentTime, totalTime,
      setProgress, setVolume, setIsShuffle, setRepeatMode,
      setIsMuted, setIsLiked,
      play, pause, togglePlay, skipNext, skipPrev,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
