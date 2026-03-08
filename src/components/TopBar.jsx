import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNav } from '../context/NavContext';

export default function TopBar({ scrolled, gradientColor }) {
  const { goBack, goForward, canGoBack, canGoForward } = useNav();

  return (
    <header
      className="flex items-center justify-between px-6 py-4 sticky top-0 z-10 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? `${gradientColor || '#121212'}ee` : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={goBack}
          disabled={!canGoBack}
          className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors disabled:opacity-40 disabled:cursor-default"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goForward}
          disabled={!canGoForward}
          className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors disabled:opacity-40 disabled:cursor-default"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-[#b3b3b3] hover:text-white text-sm font-semibold px-4 py-2 transition-colors">
          Inscreva-se
        </button>
        <button className="bg-white text-black text-sm font-bold px-7 py-2 rounded-full hover:scale-105 transition-all hover:bg-[#f0f0f0]">
          Entrar
        </button>
      </div>
    </header>
  );
}
