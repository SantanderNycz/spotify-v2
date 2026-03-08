import { ChevronLeft, ChevronRight, Bell, User } from 'lucide-react';

export default function TopBar({ scrolled, gradientColor }) {
  return (
    <header
      className="flex items-center justify-between px-8 py-4 sticky top-0 z-10 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? `${gradientColor}ee`
          : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      {/* Navigation arrows */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-3">
        <button className="text-[#b3b3b3] hover:text-white text-sm font-semibold hover:scale-105 transition-all px-4 py-2">
          Inscreva-se
        </button>
        <button className="bg-white text-black text-sm font-bold px-8 py-2 rounded-full hover:scale-105 transition-all hover:bg-[#f0f0f0]">
          Entrar
        </button>
      </div>
    </header>
  );
}
