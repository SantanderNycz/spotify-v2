import { useEffect, useState, useRef } from 'react';
import { recentlyPlayed, featuredPlaylists, madeForYou, topArtists } from '../data/mockData';
import PlaylistCard, { RecentCard, SkeletonCard } from './PlaylistCard';
import TopBar from './TopBar';
import { usePlayer } from '../context/PlayerContext';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

function Section({ title, children, onSeeAll }) {
  return (
    <section className="mb-8">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-white text-2xl font-bold">{title}</h2>
        {onSeeAll && (
          <button onClick={onSeeAll} className="text-[#b3b3b3] hover:text-white text-sm font-semibold transition-colors">
            Ver tudo
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

export default function HomeView({ setGradientColor }) {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const contentRef = useRef(null);
  const { play } = usePlayer();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setGradientColor('#1a3a2a');
  }, []);

  const handleScroll = (e) => {
    setScrolled(e.target.scrollTop > 10);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative">
      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: 'linear-gradient(to bottom, #1a3a2a 0%, #121212 40%)',
        }}
      />

      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="relative flex-1 overflow-y-auto"
      >
        <TopBar scrolled={scrolled} gradientColor="#1a3a2a" />

        <div className="px-8 pb-8">
          {/* Greeting */}
          <h1 className="text-white text-3xl font-bold mb-6">{getGreeting()}</h1>

          {/* Recently played - 2-col grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {recentlyPlayed.map(item => (
              <RecentCard key={item.id} item={item} onClick={() => play()} />
            ))}
          </div>

          {/* Made for you */}
          <Section title="Feitos para você" onSeeAll={() => {}}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {loading
                ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                : madeForYou.map(item => (
                    <PlaylistCard key={item.id} item={item} onPlay={() => play()} />
                  ))}
            </div>
          </Section>

          {/* Featured playlists */}
          <Section title="Populares agora" onSeeAll={() => {}}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {loading
                ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                : featuredPlaylists.map(item => (
                    <PlaylistCard key={item.id} item={item} onPlay={() => play()} />
                  ))}
            </div>
          </Section>

          {/* Top artists */}
          <Section title="Artistas populares" onSeeAll={() => {}}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {loading
                ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                : topArtists.map(item => (
                    <PlaylistCard key={item.id} item={item} isRound onPlay={() => play()} />
                  ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
