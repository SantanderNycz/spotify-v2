import { useState } from "react";
import { Play, Pause, UserPlus, MoreHorizontal } from "lucide-react";
import {
  getTopTracksForArtist,
  getAlbumsForArtist,
  getArtistById,
  artists,
} from "../data/mockData";
import { usePlayer } from "../context/PlayerContext";
import { useNav } from "../context/NavContext";
import GradientCover from "./GradientCover";
import TrackRow from "./TrackRow";

function AlbumCard({ album, onClick }) {
  const [hovered, setHovered] = useState(false);
  const { playQueue } = usePlayer();
  return (
    <div
      className="bg-[#181818] hover:bg-[#282828] rounded-md p-4 cursor-pointer transition-all duration-200 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="relative mb-4">
        <GradientCover
          gradient={album.gradient}
          className="w-full aspect-square rounded"
        />
        <button
          className={`absolute bottom-2 right-2 w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 hover:bg-[#3be377] ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Play size={20} fill="black" className="text-black ml-0.5" />
        </button>
      </div>
      <p className="text-white text-sm font-semibold truncate mb-1">
        {album.name}
      </p>
      <p className="text-[#b3b3b3] text-xs">{album.year} • Álbum</p>
    </div>
  );
}

export default function ArtistView({ artist }) {
  const [followed, setFollowed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAllTracks, setShowAllTracks] = useState(false);
  const { currentTrack, isPlaying, playQueue, togglePlay } = usePlayer();
  const { navigate } = useNav();

  const topTracks = getTopTracksForArtist(artist.id);
  const artistAlbums = getAlbumsForArtist(artist.id);
  const similarArtists = artists.filter((a) => a.id !== artist.id).slice(0, 6);

  const visibleTracks = showAllTracks ? topTracks : topTracks.slice(0, 5);
  const isThisPlaying =
    isPlaying && topTracks.some((t) => t.id === currentTrack?.id);

  const handleMainPlay = () => {
    if (isThisPlaying) togglePlay();
    else playQueue(topTracks, topTracks[0]);
  };

  return (
    <div
      className="flex-1 overflow-y-auto"
      onScroll={(e) => setScrolled(e.target.scrollTop > 280)}
    >
      {/* Sticky bar */}
      <div
        className={`sticky top-0 z-10 transition-all duration-300 flex items-center gap-4 px-6 py-3 ${
          scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: artist.gradient?.[0] + "ee" }}
      >
        <button
          onClick={handleMainPlay}
          className="w-8 h-8 bg-[#1ed760] rounded-full flex items-center justify-center hover:scale-110 transition-all"
        >
          {isThisPlaying ? (
            <Pause size={14} fill="black" className="text-black" />
          ) : (
            <Play size={14} fill="black" className="text-black ml-px" />
          )}
        </button>
        <span className="text-white font-bold text-lg">{artist.name}</span>
      </div>

      {/* Hero gradient header */}
      <div
        className="relative flex items-end px-6 pb-6"
        style={{
          background: `linear-gradient(to bottom, ${artist.gradient?.[0]} 0%, ${artist.gradient?.[1]} 100%)`,
          minHeight: "340px",
        }}
      >
        <div className="animate-slide-up">
          <p className="text-white text-xs font-bold uppercase tracking-widest mb-2 opacity-80">
            Artista
          </p>
          <h1 className="text-7xl font-black text-white mb-4 leading-none">
            {artist.name}
          </h1>
          <p className="text-white/80 text-sm font-medium">
            {artist.followers} seguidores mensais
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gradient-to-b from-black/80 to-[#121212] px-6 py-6">
        {/* Controls */}
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
            onClick={() => setFollowed((f) => !f)}
            className={`px-4 py-1.5 rounded-full border text-sm font-semibold transition-all hover:scale-105 ${
              followed
                ? "border-white text-white"
                : "border-[#727272] text-white hover:border-white"
            }`}
          >
            {followed ? "A seguir" : "Seguir"}
          </button>
          <button className="text-[#b3b3b3] hover:text-white transition-colors">
            <MoreHorizontal size={28} />
          </button>
        </div>

        {/* Popular tracks */}
        <section className="mb-10">
          <h2 className="text-white text-2xl font-bold mb-4">Popular</h2>
          <div>
            {visibleTracks.map((track, i) => (
              <TrackRow
                key={track.id}
                track={track}
                index={i}
                queue={topTracks}
                showAlbum={false}
              />
            ))}
          </div>
          {topTracks.length > 5 && (
            <button
              onClick={() => setShowAllTracks((s) => !s)}
              className="mt-2 px-4 py-2 text-[#b3b3b3] hover:text-white text-sm font-semibold transition-colors"
            >
              {showAllTracks ? "Mostrar menos" : "Ver mais"}
            </button>
          )}
        </section>

        {/* Discography */}
        {artistAlbums.length > 0 && (
          <section className="mb-10">
            <div className="flex items-end justify-between mb-4">
              <h2 className="text-white text-2xl font-bold">Discografia</h2>
              <button className="text-[#b3b3b3] hover:text-white text-sm font-semibold transition-colors">
                Mostrar tudo
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {artistAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} onClick={() => {}} />
              ))}
            </div>
          </section>
        )}

        {/* Similar artists */}
        <section className="mb-10">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-white text-2xl font-bold">
              Fãs também curtiram
            </h2>
            <button className="text-[#b3b3b3] hover:text-white text-sm font-semibold transition-colors">
              Mostrar tudo
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {similarArtists.map((a) => (
              <div
                key={a.id}
                className="bg-[#181818] hover:bg-[#282828] rounded-md p-4 cursor-pointer transition-all duration-200 group"
                onClick={() => navigate("artist", { artist: a })}
              >
                <div className="relative mb-4">
                  <GradientCover
                    gradient={a.gradient}
                    className="w-full aspect-square rounded-full"
                    rounded
                  />
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:scale-110">
                    <Play
                      size={20}
                      fill="black"
                      className="text-black ml-0.5"
                    />
                  </button>
                </div>
                <p className="text-white text-sm font-semibold truncate mb-1">
                  {a.name}
                </p>
                <p className="text-[#b3b3b3] text-xs">Artista</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
