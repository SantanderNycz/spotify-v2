import { useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import HomeView from "./components/HomeView";
import SearchView from "./components/SearchView";
import PlaylistView from "./components/PlaylistView";
import ArtistView from "./components/ArtistView";
import Player from "./components/Player";
import { PlayerProvider } from "./context/PlayerContext";
import { NavProvider, useNav } from "./context/NavContext";

function PageTransition({ children, viewKey }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.opacity = "0";
    ref.current.style.transform = "translateY(12px)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!ref.current) return;
        ref.current.style.transition =
          "opacity 0.25s ease, transform 0.25s ease";
        ref.current.style.opacity = "1";
        ref.current.style.transform = "translateY(0)";
      });
    });
  }, [viewKey]);
  return (
    <div ref={ref} className="flex flex-col flex-1 overflow-hidden h-full">
      {children}
    </div>
  );
}

function MainContent() {
  const { view, params } = useNav();

  const renderView = () => {
    switch (view) {
      case "home":
        return <HomeView />;
      case "search":
        return <SearchView />;
      case "playlist":
        return params.playlist ? (
          <PlaylistView playlist={params.playlist} />
        ) : (
          <HomeView />
        );
      case "artist":
        return params.artist ? (
          <ArtistView artist={params.artist} />
        ) : (
          <HomeView />
        );
      default:
        return <HomeView />;
    }
  };

  const pageKey =
    view + (params?.playlist?.id || "") + (params?.artist?.id || "");

  return (
    <main className="flex-1 rounded-lg overflow-hidden bg-[#121212] flex flex-col">
      <PageTransition viewKey={pageKey}>{renderView()}</PageTransition>
    </main>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <NavProvider>
        <div className="flex flex-col h-screen bg-[#121212] overflow-hidden">
          <div className="flex flex-1 gap-2 p-2 overflow-hidden min-h-0">
            <Sidebar />
            <MainContent />
          </div>
          <Player />
        </div>
      </NavProvider>
    </PlayerProvider>
  );
}
