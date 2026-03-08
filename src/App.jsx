import { useState } from 'react';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import Player from './components/Player';
import { PlayerProvider } from './context/PlayerContext';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [gradientColor, setGradientColor] = useState('#1a3a2a');

  return (
    <PlayerProvider>
      <div className="flex flex-col h-screen bg-[#121212] overflow-hidden">
        {/* Main layout: sidebar + content */}
        <div className="flex flex-1 gap-2 p-2 overflow-hidden">
          {/* Sidebar */}
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

          {/* Main content area */}
          <main className="flex-1 rounded-lg overflow-hidden bg-[#121212]">
            {currentView === 'home' && (
              <HomeView setGradientColor={setGradientColor} />
            )}
            {currentView === 'search' && (
              <SearchView />
            )}
          </main>
        </div>

        {/* Player bar */}
        <Player />
      </div>
    </PlayerProvider>
  );
}
