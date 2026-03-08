import { useState } from "react";
import {
  Home,
  Search,
  Library,
  Plus,
  ArrowRight,
  Music,
  Heart,
  ChevronRight,
} from "lucide-react";
import { userPlaylists } from "../data/mockData";
import { usePlayer } from "../context/PlayerContext";

const SpotifyLogo = () => (
  <img src="/src/public/Spotify-White.png" alt="logo spotify" />
);

export default function Sidebar({ currentView, setCurrentView }) {
  const [libraryFilter, setLibraryFilter] = useState("all");
  const { currentTrack, isPlaying } = usePlayer();

  const navItems = [
    { id: "home", icon: Home, label: "Início" },
    { id: "search", icon: Search, label: "Buscar" },
  ];

  const filters = ["Playlists", "Podcasts", "Álbuns", "Artistas"];

  return (
    <aside className="flex flex-col h-full w-60 flex-shrink-0 bg-black select-none">
      {/* Logo */}
      <div className="px-6 pt-6 pb-2">
        <SpotifyLogo />
      </div>

      {/* Nav */}
      <nav className="px-3 pb-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setCurrentView(id)}
            className={`flex items-center gap-4 w-full px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-150 ${
              currentView === id
                ? "text-white"
                : "text-[#b3b3b3] hover:text-white"
            }`}
          >
            <Icon
              size={24}
              className={currentView === id ? "text-white" : ""}
              fill={currentView === id ? "white" : "transparent"}
            />
            {label}
          </button>
        ))}
      </nav>

      {/* Library */}
      <div className="flex-1 overflow-hidden flex flex-col mx-2 rounded-lg bg-[#121212] mt-2">
        {/* Library header */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center gap-3 text-[#b3b3b3] hover:text-white transition-colors group">
              <Library size={24} />
              <span className="text-sm font-semibold">Sua Biblioteca</span>
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#b3b3b3] hover:text-white hover:bg-[#282828] transition-all">
                <Plus size={20} />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#b3b3b3] hover:text-white hover:bg-[#282828] transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() =>
                  setLibraryFilter(f === libraryFilter ? "all" : f)
                }
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 ${
                  libraryFilter === f
                    ? "bg-white text-black"
                    : "bg-[#282828] text-white hover:bg-[#3e3e3e]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Playlist list */}
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {/* Liked songs */}
          <button className="flex items-center gap-3 w-full px-2 py-2 rounded-md hover:bg-[#282828] transition-colors group">
            <div
              className="w-10 h-10 rounded flex-shrink-0 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #450af5, #c4efd9)",
              }}
            >
              <Heart size={16} fill="white" className="text-white" />
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-sm font-medium text-white truncate">
                Músicas curtidas
              </p>
              <p className="text-xs text-[#b3b3b3] truncate">
                Playlist · 432 músicas
              </p>
            </div>
          </button>

          {userPlaylists.map((playlist) => (
            <button
              key={playlist.id}
              className="flex items-center gap-3 w-full px-2 py-2 rounded-md hover:bg-[#282828] transition-colors group"
            >
              <div className="w-10 h-10 rounded bg-[#282828] flex-shrink-0 flex items-center justify-center">
                <Music size={16} className="text-[#b3b3b3]" />
              </div>
              <div className="text-left overflow-hidden">
                <p
                  className={`text-sm font-medium truncate ${
                    currentTrack && isPlaying && playlist.id === "p1"
                      ? "text-[#1ed760]"
                      : "text-white"
                  }`}
                >
                  {playlist.name}
                </p>
                <p className="text-xs text-[#b3b3b3] truncate">
                  Playlist · Você
                </p>
              </div>
              {/* Equalizer for currently playing */}
              {currentTrack && isPlaying && playlist.id === "p1" && (
                <div className="flex items-end gap-[2px] ml-auto flex-shrink-0 h-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="eq-bar w-[3px] bg-[#1ed760] rounded-sm"
                      style={{ height: "8px" }}
                    />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
