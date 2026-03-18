import {
  Home,
  Search,
  Library,
  Plus,
  ArrowRight,
  Music,
  Heart,
} from "lucide-react";
import { userPlaylists, getTracksForPlaylist } from "../data/mockData";
import { usePlayer } from "../context/PlayerContext";
import { useNav } from "../context/NavContext";
import GradientCover from "./GradientCover";

const SpotifyLogo = () => (
  <img src="/public/Spotify-White.png" alt="spotify logo" />
);

export default function Sidebar() {
  const { currentTrack, isPlaying } = usePlayer();
  const { view, navigate } = useNav();

  const navItems = [
    { id: "home", icon: Home, label: "Início" },
    { id: "search", icon: Search, label: "Buscar" },
  ];

  return (
    <aside className="flex flex-col h-full w-60 flex-shrink-0 bg-black select-none">
      <div className="px-6 pt-6 pb-2">
        <SpotifyLogo />
      </div>

      <nav className="px-3 pb-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => navigate(id)}
            className={`flex items-center gap-4 w-full px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-150 ${
              view === id ? "text-white" : "text-[#b3b3b3] hover:text-white"
            }`}
          >
            <Icon
              size={24}
              fill={view === id ? "white" : "transparent"}
              className={view === id ? "text-white" : ""}
            />
            {label}
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-hidden flex flex-col mx-2 rounded-lg bg-[#121212] mt-2">
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center gap-3 text-[#b3b3b3] hover:text-white transition-colors">
              <Library size={24} />
              <span className="text-sm font-semibold">Sua Biblioteca</span>
            </button>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#b3b3b3] hover:text-white hover:bg-[#282828] transition-all">
                <Plus size={20} />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#b3b3b3] hover:text-white hover:bg-[#282828] transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Playlists", "Podcasts", "Artistas"].map((f) => (
              <button
                key={f}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[#282828] text-white hover:bg-[#3e3e3e] transition-all"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {/* Liked songs */}
          <button
            className="flex items-center gap-3 w-full px-2 py-2 rounded-md hover:bg-[#282828] transition-colors"
            onClick={() =>
              navigate("playlist", {
                playlist: {
                  id: "liked",
                  name: "Curtidas",
                  description: "Suas músicas curtidas",
                  gradient: ["#450af5", "#c4efd9"],
                  trackIds: ["t1", "t2", "t5", "t9"],
                  owner: "Você",
                  followers: "432",
                },
              })
            }
          >
            <div
              className="w-10 h-10 rounded flex-shrink-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#450af5,#c4efd9)" }}
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

          {userPlaylists.map((playlist) => {
            const tracks = getTracksForPlaylist(playlist);
            const isCurrent =
              isPlaying && tracks.some((t) => t.id === currentTrack?.id);
            return (
              <button
                key={playlist.id}
                className="flex items-center gap-3 w-full px-2 py-2 rounded-md hover:bg-[#282828] transition-colors"
                onClick={() => navigate("playlist", { playlist })}
              >
                <div className="w-10 h-10 rounded bg-[#282828] flex-shrink-0 flex items-center justify-center">
                  <Music size={16} className="text-[#b3b3b3]" />
                </div>
                <div className="text-left overflow-hidden flex-1">
                  <p
                    className={`text-sm font-medium truncate ${isCurrent ? "text-[#1ed760]" : "text-white"}`}
                  >
                    {playlist.name}
                  </p>
                  <p className="text-xs text-[#b3b3b3] truncate">
                    Playlist · Você
                  </p>
                </div>
                {isCurrent && (
                  <div className="flex items-end gap-[2px] flex-shrink-0 h-4">
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
            );
          })}
        </div>
      </div>
    </aside>
  );
}
