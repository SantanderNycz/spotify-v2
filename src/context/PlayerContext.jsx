import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  tracks as allTracks,
  getArtistById,
  getAlbumById,
} from "../data/mockData";

const PlayerContext = createContext(null);

function formatTime(secs) {
  const s = Math.floor(isNaN(secs) ? 0 : secs);
  return String(Math.floor(s / 60)) + ":" + String(s % 60).padStart(2, "0");
}

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(allTracks[0]);
  const [queue, setQueue] = useState(allTracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const skipNextRef = useRef(null);

  const enrichedTrack = currentTrack
    ? {
        ...currentTrack,
        artist: getArtistById(currentTrack.artistId),
        album: getAlbumById(currentTrack.albumId),
      }
    : null;

  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDuration = () =>
      setDuration(isNaN(audio.duration) ? 0 : audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onEnded = () => {
      if (skipNextRef.current) skipNextRef.current();
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onDuration);
    audio.addEventListener("durationchange", onDuration);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onDuration);
      audio.removeEventListener("durationchange", onDuration);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const loadAndPlay = useCallback((track) => {
    const audio = audioRef.current;
    audio.src = track.audioUrl;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    audio.play().catch(() => {});
  }, []);

  const play = useCallback(
    (track) => {
      if (track) {
        setCurrentTrack(track);
        loadAndPlay(track);
      } else {
        audioRef.current.play().catch(() => {});
      }
    },
    [loadAndPlay],
  );

  const pause = useCallback(() => audioRef.current.pause(), []);
  const togglePlay = useCallback(() => {
    if (audioRef.current.paused) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, []);

  const seek = useCallback((time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const skipNext = useCallback(() => {
    setQueue((currentQueue) => {
      setCurrentTrack((currentTrack) => {
        const idx = currentQueue.findIndex((t) => t.id === currentTrack?.id);
        const nextIdx = isShuffle
          ? Math.floor(Math.random() * currentQueue.length)
          : (idx + 1) % currentQueue.length;
        const next = currentQueue[nextIdx];
        loadAndPlay(next);
        return next;
      });
      return currentQueue;
    });
  }, [isShuffle, loadAndPlay]);

  skipNextRef.current = skipNext;

  const skipPrev = useCallback(() => {
    if (currentTime > 3) {
      seek(0);
      return;
    }
    setQueue((currentQueue) => {
      setCurrentTrack((currentTrack) => {
        const idx = currentQueue.findIndex((t) => t.id === currentTrack?.id);
        const prevIdx = (idx - 1 + currentQueue.length) % currentQueue.length;
        const prev = currentQueue[prevIdx];
        loadAndPlay(prev);
        return prev;
      });
      return currentQueue;
    });
  }, [currentTime, seek, loadAndPlay]);

  const setVolume = useCallback((v) => {
    setVolumeState(v);
    if (v > 0) setIsMuted(false);
  }, []);

  const playQueue = useCallback(
    (trackList, startTrack) => {
      setQueue(trackList);
      const t = startTrack || trackList[0];
      setCurrentTrack(t);
      loadAndPlay(t);
    },
    [loadAndPlay],
  );

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <PlayerContext.Provider
      value={{
        currentTrack: enrichedTrack,
        isPlaying,
        progress,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        repeatMode,
        isLiked,
        isLoading,
        queue,
        currentTimeStr: formatTime(currentTime),
        totalTimeStr: formatTime(duration),
        play,
        pause,
        togglePlay,
        seek,
        skipNext,
        skipPrev,
        setVolume,
        setIsMuted,
        setIsShuffle,
        setRepeatMode,
        setIsLiked,
        playQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
