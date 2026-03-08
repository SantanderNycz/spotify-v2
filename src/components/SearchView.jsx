import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X } from "lucide-react";
import {
  categories,
  searchAll,
  getArtistById,
  getAlbumById,
} from "../data/mockData";
import TopBar from "./TopBar";
import PlaylistCard from "./PlaylistCard";
import { useNav } from "../context/NavContext";
import { usePlayer } from "../context/PlayerContext";
import GradientCover from "./GradientCover";
import TrackRow from "./TrackRow";

function CategoryCard({ category }) {
  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:brightness-110 relative"
      style={{ backgroundColor: category.color, aspectRatio: "1.6" }}
    >
      <div className="p-4">
        <p className="text-white font-bold text-base leading-tight">
          {category.name}
        </p>
      </div>
      <div className="absolute bottom-2 right-2 text-4xl transform rotate-12 drop-shadow-xl select-none">
        {category.emoji}
      </div>
    </div>
  );
}

function EmptySearch() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="text-6xl mb-4">🎵</div>
      <h3 className="text-white text-xl font-bold mb-2">
        Nenhum resultado encontrado
      </h3>
      <p className="text-[#b3b3b3] text-sm text-center max-w-xs">
        Tente palavras diferentes ou verifique a grafia.
      </p>
    </div>
  );
}

export default function SearchView() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);
  const { navigate } = useNav();
  const { playQueue } = usePlayer();

  const doSearch = useCallback((q) => {
    if (!q.trim()) {
      setResults(null);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setResults(searchAll(q));
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query), 280);
    return () => clearTimeout(debounceRef.current);
  }, [query, doSearch]);

  const hasResults =
    results &&
    (results.artists.length > 0 ||
      results.playlists.length > 0 ||
      results.tracks.length > 0 ||
      results.albums.length > 0);

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom,#1a1a1a 0%,#121212 30%)",
        }}
      />
      <div
        className="relative flex-1 overflow-y-auto"
        onScroll={(e) => setScrolled(e.target.scrollTop > 10)}
      >
        <TopBar scrolled={scrolled} gradientColor="#1a1a1a" />
        <div className="px-8 pb-8">
          {/* Search bar */}
          <div className="relative mb-8 max-w-lg">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-black z-10"
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="O que você quer ouvir?"
              className="w-full bg-white text-black rounded-full py-3 pl-11 pr-10 text-sm font-medium placeholder:text-[#7a7a7a] focus:outline-none focus:ring-2 focus:ring-white transition-all"
              autoFocus
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setResults(null);
                  inputRef.current?.focus();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/60 hover:text-black"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-[#181818] rounded-md p-4">
                    <div className="skeleton w-full aspect-square rounded mb-4" />
                    <div className="skeleton h-4 rounded mb-2 w-3/4" />
                    <div className="skeleton h-3 rounded w-1/2" />
                  </div>
                ))}
            </div>
          )}

          {/* Results */}
          {!loading &&
            results !== null &&
            (hasResults ? (
              <div className="animate-fade-in space-y-8">
                {results.artists.length > 0 && (
                  <section>
                    <h2 className="text-white text-2xl font-bold mb-4">
                      Artistas
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {results.artists.map((a) => (
                        <PlaylistCard
                          key={a.id}
                          item={a}
                          isRound
                          type="artist"
                        />
                      ))}
                    </div>
                  </section>
                )}
                {results.tracks.length > 0 && (
                  <section>
                    <h2 className="text-white text-2xl font-bold mb-4">
                      Músicas
                    </h2>
                    <div>
                      {results.tracks.map((t, i) => (
                        <TrackRow
                          key={t.id}
                          track={t}
                          index={i}
                          queue={results.tracks}
                          showAlbum
                        />
                      ))}
                    </div>
                  </section>
                )}
                {results.playlists.length > 0 && (
                  <section>
                    <h2 className="text-white text-2xl font-bold mb-4">
                      Playlists
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {results.playlists.map((p) => (
                        <PlaylistCard key={p.id} item={p} />
                      ))}
                    </div>
                  </section>
                )}
                {results.albums.length > 0 && (
                  <section>
                    <h2 className="text-white text-2xl font-bold mb-4">
                      Álbuns
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {results.albums.map((a) => (
                        <div
                          key={a.id}
                          className="bg-[#181818] hover:bg-[#282828] rounded-md p-4 cursor-pointer transition-all duration-200 group"
                        >
                          <GradientCover
                            gradient={a.gradient}
                            className="w-full aspect-square rounded mb-4"
                          />
                          <p className="text-white text-sm font-semibold truncate mb-1">
                            {a.name}
                          </p>
                          <p className="text-[#b3b3b3] text-xs">
                            {a.year} • {getArtistById(a.artistId)?.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ) : (
              <EmptySearch />
            ))}

          {/* Default: categories */}
          {!loading && results === null && (
            <>
              <h2 className="text-white text-2xl font-bold mb-4">
                Navegar por todas as categorias
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {categories.map((cat) => (
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
