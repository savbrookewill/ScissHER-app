
import React from 'react';

export const NormalScissorsIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="7" cy="18" r="2.5" stroke={color} strokeWidth="2" />
    <circle cx="17" cy="18" r="2.5" stroke={color} strokeWidth="2" />
    <circle cx="12" cy="12" r="1" fill={color} />
    <path d="M 8.5 16.5 L 18 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 15.5 16.5 L 6 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const RoseIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 4C9.5 4 7 6 7 9C7 11.5 9 13.5 12 16C15 13.5 17 11.5 17 9C17 6 14.5 4 12 4Z" fill={color} stroke={color} strokeWidth="1.5"/>
    <path d="M12 7C11 7 10 7.5 10 8.5C10 9.5 11 10 12 11" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    <path d="M12 16V21M12 21L9 19M12 21L15 19" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="px-6 py-5 flex items-center justify-between sticky top-0 z-50 glass border-b border-white/5 overflow-hidden">
      <div className="flex items-center gap-4 relative">
        <div className="absolute -left-2 top-2 animate-pulse">
          <RoseIcon className="w-3 h-3 text-pink-500 rotate-[-20deg]" />
        </div>

        <div className="w-11 h-11 petal-gradient rounded-xl flex items-center justify-center text-white shadow-[0_0_25px_rgba(255,0,128,0.4)] rotate-[15deg] group hover:rotate-0 transition-all duration-700 border border-white/20">
          <NormalScissorsIcon className="w-7 h-7 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" color="white" />
        </div>

        <div className="absolute left-9 -bottom-1 animate-pulse delay-75">
          <RoseIcon className="w-2.5 h-2.5 text-purple-500 rotate-[15deg]" />
        </div>

        <div className="flex flex-col ml-1">
          <h1 className="text-xl font-black tracking-tight leading-none flex items-center gap-1">
            <span className="shimmer-text uppercase">ScissHER</span>
            <i className="fa-solid fa-sparkles text-[10px] text-pink-400"></i>
          </h1>
          <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">
            Interact With Intention
          </span>
        </div>
      </div>
      
      <div className="flex gap-3 text-slate-400">
        <button className="w-9 h-9 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-center hover:text-pink-500 transition-all shadow-lg">
          <i className="fa-regular fa-bell text-lg"></i>
        </button>
        <button className="w-9 h-9 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-center hover:text-purple-500 transition-all shadow-lg">
          <i className="fa-solid fa-sliders text-lg"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
