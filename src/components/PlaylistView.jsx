import { useState, useRef } from "react";
import { Play, Pause, Heart, MoreHorizontal, Clock } from "lucide-react";
import {
  getTracksForPlaylist,
  getTrackById,
  getArtistById,
} from "../data/mockData";
import { usePlayer } from "../context/PlayerContext";
import GradientCover from "./GradientCover";
import ArtistImage from "./ArtistImage";
import TrackRow from "./TrackRow";
import TopBar from "./TopBar";

export default function PlaylistView({ playlist }) {
  const [scrolled, setScrolled] = useState(false);
  const [liked, setLiked] = useState(false);
  const { currentTrack, isPlaying, playQueue, togglePlay } = usePlayer();
  const tracks = getTracksForPlaylist(playlist);

  const isThisPlaying =
    isPlaying && tracks.some((t) => t.id === currentTrack?.id);

  const handleMainPlay = () => {
    if (isThisPlaying) {
      togglePlay();
    } else {
      playQueue(tracks, tracks[0]);
    }
  };

  const totalDuration = tracks.reduce((acc, t) => acc + (t.duration || 0), 0);
  const totalMins = Math.floor(totalDuration / 60);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div
        className="flex-1 overflow-y-auto"
        onScroll={(e) => setScrolled(e.target.scrollTop > 300)}
      >
        {/* Sticky top bar that appears on scroll */}
        <div
          className={`sticky top-0 z-10 transition-all duration-300 ${scrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{ backgroundColor: playlist.gradient?.[0] + "ee" }}
        >
          <div className="flex items-center gap-4 px-6 py-3">
            <button
              onClick={handleMainPlay}
              className="w-8 h-8 bg-[#1ed760] rounded-full flex items-center justify-center hover:scale-110 transition-all hover:bg-[#3be377]"
            >
              {isThisPlaying ? (
                <Pause size={14} fill="black" className="text-black" />
              ) : (
                <Play size={14} fill="black" className="text-black ml-px" />
              )}
            </button>
            <span className="text-white font-bold text-lg">
              {playlist.name}
            </span>
          </div>
        </div>

        {/* Gradient header */}
        <div
          className="relative px-6 pt-16 pb-6 flex items-end gap-6"
          style={{
            background: `linear-gradient(to bottom, ${playlist.gradient?.[0] || "#333"} 0%, ${playlist.gradient?.[1] || "#121212"} 100%)`,
            minHeight: "340px",
          }}
        >
          {/* Cover art — usa imagem do artista da 1ª faixa */}
          {(() => {
            const firstTrack = playlist.trackIds?.[0]
              ? getTrackById(playlist.trackIds[0])
              : null;
            const coverArtist = firstTrack
              ? getArtistById(firstTrack.artistId)
              : null;
            return coverArtist ? (
              <ArtistImage
                name={coverArtist.name}
                type="artist"
                gradient={playlist.gradient}
                className="w-56 h-56 flex-shrink-0 shadow-2xl rounded"
                size="large"
              />
            ) : (
              <GradientCover
                gradient={playlist.gradient}
                className="w-56 h-56 flex-shrink-0 shadow-2xl"
              />
            );
          })()}

          {/* Meta info */}
          <div className="text-white pb-2 animate-slide-up">
            <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">
              Playlist
            </p>
            <h1 className="text-5xl font-black mb-4 leading-tight">
              {playlist.name}
            </h1>
            {playlist.description && (
              <p className="text-[#b3b3b3] text-sm mb-3">
                {playlist.description}
              </p>
            )}
            <div className="flex items-center gap-1 text-sm">
              <span className="font-bold">{playlist.owner}</span>
              <span className="text-[#b3b3b3]">•</span>
              <span className="text-[#b3b3b3]">
                {playlist.followers} curtidas
              </span>
              <span className="text-[#b3b3b3]">•</span>
              <span className="text-[#b3b3b3]">{tracks.length} músicas,</span>
              <span className="text-[#b3b3b3]">cerca de {totalMins} min</span>
            </div>
          </div>
        </div>

        {/* Controls bar */}
        <div className="px-6 py-6 bg-gradient-to-b from-black/60 to-[#121212]">
          <div className="flex items-center gap-6 mb-8">
            <button
              onClick={handleMainPlay}
              className="w-14 h-14 bg-[#1ed760] rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all hover:bg-[#3be377]"
            >
              {isThisPlaying ? (
                <Pause size={24} fill="black" className="text-black" />
              ) : (
                <Play size={24} fill="black" className="text-black ml-1" />
              )}
            </button>
            <button
              onClick={() => setLiked((l) => !l)}
              className={`transition-all hover:scale-110 ${liked ? "text-[#1ed760]" : "text-[#b3b3b3] hover:text-white"}`}
            >
              <Heart size={32} fill={liked ? "#1ed760" : "transparent"} />
            </button>
            <button className="text-[#b3b3b3] hover:text-white transition-colors">
              <MoreHorizontal size={32} />
            </button>
          </div>

          {/* Track list header */}
          <div
            className="grid items-center gap-4 px-4 pb-2 border-b border-white/10 mb-2 text-[#b3b3b3] text-xs uppercase tracking-wider"
            style={{ gridTemplateColumns: "16px 4fr 2fr 1fr" }}
          >
            <span>#</span>
            <span>Título</span>
            <span className="hidden md:block">Álbum</span>
            <div className="flex justify-end">
              <Clock size={14} />
            </div>
          </div>

          {/* Tracks */}
          <div className="animate-fade-in">
            {tracks.map((track, i) => (
              <TrackRow
                key={track.id}
                track={track}
                index={i}
                queue={tracks}
                showAlbum
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
