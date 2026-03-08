import { useEffect, useState, useRef } from "react";
import {
  recentlyPlayed,
  madeForYou,
  playlists,
  artists,
  getPlaylistById,
  getArtistById,
} from "../data/mockData";
import PlaylistCard, { RecentCard, SkeletonCard } from "./PlaylistCard";
import TopBar from "./TopBar";
import { useNav } from "../context/NavContext";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

function Section({ title, children, onSeeAll }) {
  return (
    <section className="mb-8">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-white text-2xl font-bold">{title}</h2>
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="text-[#b3b3b3] hover:text-white text-sm font-semibold transition-colors"
          >
            Ver tudo
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

export default function HomeView() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { navigate } = useNav();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // Resolve recently played to actual items
  const recentItems = recentlyPlayed
    .map((r) => {
      if (r.type === "artist")
        return { ...getArtistById(r.id), _type: "artist" };
      return { ...getPlaylistById(r.id), _type: "playlist" };
    })
    .filter(Boolean);

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #1a3a2a 0%, #121212 35%)",
        }}
      />
      <div
        className="relative flex-1 overflow-y-auto"
        onScroll={(e) => setScrolled(e.target.scrollTop > 10)}
      >
        <TopBar scrolled={scrolled} gradientColor="#1a3a2a" />
        <div className="px-8 pb-8">
          <h1 className="text-white text-3xl font-bold mb-6">
            {getGreeting()}
          </h1>

          {/* Recently played grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {recentItems.map((item) => (
              <RecentCard key={item.id} item={item} type={item._type} />
            ))}
          </div>

          <Section title="Feitos para você" onSeeAll={() => {}}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {loading
                ? Array(6)
                    .fill(0)
                    .map((_, i) => <SkeletonCard key={i} />)
                : madeForYou.map((item) => (
                    <PlaylistCard key={item.id} item={item} />
                  ))}
            </div>
          </Section>

          <Section title="Populares agora" onSeeAll={() => {}}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {loading
                ? Array(6)
                    .fill(0)
                    .map((_, i) => <SkeletonCard key={i} />)
                : playlists.map((item) => (
                    <PlaylistCard key={item.id} item={item} />
                  ))}
            </div>
          </Section>

          <Section title="Artistas populares" onSeeAll={() => {}}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {loading
                ? Array(6)
                    .fill(0)
                    .map((_, i) => <SkeletonCard key={i} />)
                : artists.map((item) => (
                    <PlaylistCard
                      key={item.id}
                      item={item}
                      isRound
                      type="artist"
                    />
                  ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
