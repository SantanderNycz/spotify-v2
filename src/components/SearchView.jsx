import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { categories } from '../data/mockData';
import TopBar from './TopBar';
import PlaylistCard from './PlaylistCard';
import { usePlayer } from '../context/PlayerContext';

const MOCK_RESULTS = [
  { id: 'r1', name: 'The Weeknd', description: 'Artista', gradient: ['#a13028', '#351010'] },
  { id: 'r2', name: 'After Hours', description: 'Álbum · The Weeknd', gradient: ['#cc2121', '#3b0a0a'] },
  { id: 'r3', name: 'Blinding Lights', description: 'The Weeknd · After Hours', gradient: ['#8d1010', '#3b0a0a'] },
  { id: 'r4', name: 'The Weeknd Mix', description: 'Playlist · Spotify', gradient: ['#4773a5', '#374a5d'] },
  { id: 'r5', name: 'Weekend Vibes', description: 'Playlist · Spotify', gradient: ['#1e3264', '#4b917d'] },
  { id: 'r6', name: 'Save Your Tears', description: 'The Weeknd · After Hours', gradient: ['#dc148c', '#6a0040'] },
];

function CategoryCard({ category }) {
  const CATEGORY_IMAGES = {
    'Podcasts': '🎙️', 'Para você': '✨', 'Lançamentos': '🆕', 'Sertanejo': '🤠',
    'Samba e pagode': '🥁', 'Funk': '🎤', 'Pop': '💫', 'Rock': '🎸',
    'Hip Hop': '🎧', 'MPB': '🇧🇷', 'Indie': '🌿', 'Eletrônica': '⚡',
    'Jazz': '🎷', 'Classical': '🎻', 'R&B': '🎵', 'Latin': '💃',
    'K-Pop': '🌸', 'Para Treinar': '💪', 'Relax': '🌊', 'Festas': '🎉',
  };

  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:brightness-110 relative"
      style={{ backgroundColor: category.color, aspectRatio: '1.6' }}
    >
      <div className="p-4">
        <p className="text-white font-bold text-base leading-tight">{category.name}</p>
      </div>
      <div className="absolute bottom-2 right-2 text-4xl transform rotate-12 drop-shadow-lg">
        {CATEGORY_IMAGES[category.name] || '🎵'}
      </div>
    </div>
  );
}

function EmptySearch() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-white text-xl font-bold mb-2">Nenhum resultado encontrado</h3>
      <p className="text-[#b3b3b3] text-sm text-center max-w-xs">
        Tente palavras diferentes ou verifique a grafia do que procurou.
      </p>
    </div>
  );
}

export default function SearchView() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);
  const { play } = usePlayer();

  const doSearch = useCallback((q) => {
    if (!q.trim()) {
      setShowResults(false);
      setResults([]);
      return;
    }
    setLoading(true);
    setShowResults(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = MOCK_RESULTS.filter(r =>
        r.name.toLowerCase().includes(q.toLowerCase()) ||
        r.description.toLowerCase().includes(q.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 400);
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(debounceRef.current);
  }, [query, doSearch]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #1a1a1a 0%, #121212 30%)' }}
      />

      <div
        className="relative flex-1 overflow-y-auto"
        onScroll={(e) => setScrolled(e.target.scrollTop > 10)}
      >
        <TopBar scrolled={scrolled} gradientColor="#1a1a1a" />

        <div className="px-8 pb-8">
          {/* Search input */}
          <div className="relative mb-8 max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black z-10" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="O que você quer ouvir?"
              className="w-full bg-white text-black rounded-full py-3 pl-11 pr-10 text-sm font-medium placeholder:text-[#7a7a7a] focus:outline-none focus:ring-2 focus:ring-white transition-all"
              autoFocus
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setShowResults(false); inputRef.current?.focus(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/60 hover:text-black"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Search results */}
          {showResults ? (
            loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-[#181818] rounded-md p-4">
                    <div className="skeleton w-full aspect-square rounded mb-4" />
                    <div className="skeleton h-4 rounded mb-2 w-3/4" />
                    <div className="skeleton h-3 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="animate-fade-in">
                <h2 className="text-white text-2xl font-bold mb-4">Principais resultados</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {results.map(item => (
                    <PlaylistCard key={item.id} item={item} onPlay={() => play()} />
                  ))}
                </div>
              </div>
            ) : (
              <EmptySearch />
            )
          ) : (
            <>
              {/* Browse categories */}
              <h2 className="text-white text-2xl font-bold mb-4">Navegar por todas as categorias</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {categories.map(cat => (
                  <CategoryCard key={cat.id} category={cat} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
