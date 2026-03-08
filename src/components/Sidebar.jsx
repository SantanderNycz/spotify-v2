import { Home, Search, Library, Plus, ArrowRight, Music, Heart } from 'lucide-react';
import { userPlaylists, getTracksForPlaylist } from '../data/mockData';
import { usePlayer } from '../context/PlayerContext';
import { useNav } from '../context/NavContext';
import GradientCover from './GradientCover';

const SpotifyLogo = () => (
  <svg viewBox="0 0 1134 340" className="w-28 fill-white">
    <path d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 220 22 17 9 1 37-16 27-54-32-141-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 0l14-20c1-1 1-1 0-2-16-13-35-20-55-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 61 61 61s61-27 61-61-27-60-61-60-61 26-61 60zm30 0c0-19 13-34 31-34s31 15 31 34-13 35-31 35-31-16-31-35zm165-60h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2V147c0-1-1-2-2-2zm-13-58c-10 0-17 7-17 17s7 17 17 17 17-7 17-17-7-17-17-17zm83 65v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm98-116v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35z"/>
  </svg>
);

export default function Sidebar() {
  const { currentTrack, isPlaying } = usePlayer();
  const { view, navigate } = useNav();

  const navItems = [
    { id: 'home',   icon: Home,   label: 'Início' },
    { id: 'search', icon: Search, label: 'Buscar' },
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
              view === id ? 'text-white' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            <Icon size={24} fill={view === id ? 'white' : 'transparent'} className={view === id ? 'text-white' : ''} />
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
            {['Playlists','Podcasts','Artistas'].map(f => (
              <button key={f} className="px-3 py-1 rounded-full text-xs font-medium bg-[#282828] text-white hover:bg-[#3e3e3e] transition-all">
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {/* Liked songs */}
          <button
            className="flex items-center gap-3 w-full px-2 py-2 rounded-md hover:bg-[#282828] transition-colors"
            onClick={() => navigate('playlist', { playlist: { id: 'liked', name: 'Curtidas', description: 'Suas músicas curtidas', gradient: ['#450af5','#c4efd9'], trackIds: ['t1','t2','t5','t9'], owner: 'Você', followers: '432' } })}
          >
            <div className="w-10 h-10 rounded flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#450af5,#c4efd9)' }}>
              <Heart size={16} fill="white" className="text-white" />
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Músicas curtidas</p>
              <p className="text-xs text-[#b3b3b3] truncate">Playlist · 432 músicas</p>
            </div>
          </button>

          {userPlaylists.map(playlist => {
            const tracks = getTracksForPlaylist(playlist);
            const isCurrent = isPlaying && tracks.some(t => t.id === currentTrack?.id);
            return (
              <button
                key={playlist.id}
                className="flex items-center gap-3 w-full px-2 py-2 rounded-md hover:bg-[#282828] transition-colors"
                onClick={() => navigate('playlist', { playlist })}
              >
                <div className="w-10 h-10 rounded bg-[#282828] flex-shrink-0 flex items-center justify-center">
                  <Music size={16} className="text-[#b3b3b3]" />
                </div>
                <div className="text-left overflow-hidden flex-1">
                  <p className={`text-sm font-medium truncate ${isCurrent ? 'text-[#1ed760]' : 'text-white'}`}>
                    {playlist.name}
                  </p>
                  <p className="text-xs text-[#b3b3b3] truncate">Playlist · Você</p>
                </div>
                {isCurrent && (
                  <div className="flex items-end gap-[2px] flex-shrink-0 h-4">
                    {[1,2,3].map(i => <div key={i} className="eq-bar w-[3px] bg-[#1ed760] rounded-sm" style={{height:'8px'}} />)}
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
