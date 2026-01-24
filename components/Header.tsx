
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
    <path 
      d="M12 16.5C14.5 14 18 11.5 18 8C18 5 15.5 3 12 3C8.5 3 6 5 6 8C6 11.5 9.5 14 12 16.5Z" 
      fill={color} 
      fillOpacity="0.2"
    />
    <path 
      d="M12 16.5C13.5 15 16.5 13 16.5 8.5C16.5 6 14.5 4.5 12 4.5C9.5 4.5 7.5 6 7.5 8.5C7.5 13 10.5 15 12 16.5Z" 
      fill={color}
    />
    <path d="M12 16.5V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SunflowerIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="3" fill={color} />
    <path d="M12 8C12 8 11 4 12 4C13 4 12 8 12 8Z" fill={color} />
    <path d="M12 16C12 16 11 20 12 20C13 20 12 16 12 16Z" fill={color} />
    <path d="M16 12C16 12 20 11 20 12C20 13 16 12 16 12Z" fill={color} />
    <path d="M8 12C8 12 4 11 4 12C4 13 8 12 8 12Z" fill={color} />
    <path d="M14.8284 14.8284C14.8284 14.8284 17.6569 17.6569 16.9497 18.364C16.2426 19.0711 14.8284 16.2426 14.8284 14.8284Z" fill={color} />
    <path d="M9.17157 9.17157C9.17157 9.17157 6.34315 6.34315 7.05025 5.63604C7.75736 4.92893 9.17157 7.75736 9.17157 9.17157Z" fill={color} />
    <path d="M14.8284 9.17157C14.8284 9.17157 17.6569 6.34315 18.364 7.05025C19.0711 7.75736 16.2426 9.17157 14.8284 9.17157Z" fill={color} />
    <path d="M9.17157 14.8284C9.17157 14.8284 6.34315 17.6569 5.63604 16.9497C4.92893 16.2426 7.75736 14.8284 9.17157 14.8284Z" fill={color} />
  </svg>
);

export const FullConnectionIcon = ({ className = "w-12 h-12", color = "#10b981" }: { className?: string, color?: string }) => (
  <div className={`relative ${className} flex items-center justify-center`}>
    {/* Concentric Connection Rings */}
    <div className="absolute inset-0 rounded-full border border-current opacity-10 animate-ping"></div>
    <div className="absolute inset-2 rounded-full border border-current opacity-20 animate-pulse"></div>
    
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]">
      {/* Interlocking Circles (Venn Diagram style) */}
      <circle cx="40" cy="50" r="25" stroke={color} strokeWidth="2" strokeDasharray="4 4" className="opacity-40" />
      <circle cx="60" cy="50" r="25" stroke={color} strokeWidth="2" strokeDasharray="4 4" className="opacity-40" />
      
      {/* Central Sparkle */}
      <path d="M50 30L55 45L70 50L55 55L50 70L45 55L30 50L45 45L50 30Z" fill={color} className="animate-pulse" />
      
      {/* Tiny Orbiting Hearts */}
      <path d="M75 35c-1-1-2.5-1-3.5 0l-.5.5-.5-.5c-1-1-2.5-1-3.5 0s-1 2.5 0 3.5l4 4 4-4c1-1 1-2.5 0-3.5z" fill="#8b5cf6" className="animate-bounce" />
      <path d="M25 65c-1-1-2.5-1-3.5 0l-.5.5-.5-.5c-1-1-2.5-1-3.5 0s-1 2.5 0 3.5l4 4 4-4c1-1 1-2.5 0-3.5z" fill="#10b981" className="animate-bounce" style={{animationDelay: '0.5s'}} />
    </svg>
  </div>
);

const TinyHeart = ({ className = "w-2 h-2", color = "#10b981" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const SeshClockIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="7" cy="5" r="3" stroke={color} strokeWidth="1.5" />
    <circle cx="17" cy="5" r="3" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="13" r="8" stroke={color} strokeWidth="2" />
    <path d="M12 13L15 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 13L9 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 20L6 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 20L18 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="px-6 py-5 flex items-center justify-between sticky top-0 z-50 glass border-b border-white/5 overflow-hidden">
      <div className="flex items-center gap-5 relative">
        {/* Luminous Star-bits */}
        <div className="star-bit animate-float" style={{ top: '-10px', left: '0px' }}></div>
        <div className="star-bit animate-float" style={{ top: '20px', right: '-10px', animationDelay: '1s' }}></div>
        <div className="star-bit animate-float" style={{ bottom: '-5px', left: '20px', animationDelay: '2s' }}></div>

        <div className="relative group">
          {/* Orbiting Hearts with Squishy Motion */}
          <div className="absolute -top-2 -left-2 animate-bounce transition-transform duration-1000 group-hover:scale-150">
            <TinyHeart className="w-3.5 h-3.5 drop-shadow-[0_0_8px_#10b981]" color="#10b981" />
          </div>
          <div className="absolute -bottom-2 -right-2 animate-bounce delay-300 transition-transform duration-1000 group-hover:scale-150">
            <TinyHeart className="w-3.5 h-3.5 drop-shadow-[0_0_8px_#8b5cf6]" color="#8b5cf6" />
          </div>

          {/* Squircle Logo Container */}
          <div className="w-14 h-14 bg-slate-900 rounded-[1.25rem] flex items-center justify-center text-white shadow-[0_15px_35px_rgba(16,185,129,0.25)] group-hover:shadow-[0_20px_45px_rgba(16,185,129,0.4)] transition-all duration-500 border border-white/10 overflow-hidden relative active:scale-90">
            <div className="absolute inset-0 petal-gradient opacity-10 group-hover:opacity-30 transition-opacity"></div>
            <NormalScissorsIcon className="w-8 h-8 relative z-10 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]" color="white" />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter leading-none flex items-center gap-1.5">
            <span className="shimmer-text">ScissHER</span>
            <span className="flex gap-1">
               <i className="fa-solid fa-sparkles text-[10px] text-emerald-400 animate-pulse"></i>
            </span>
          </h1>
          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-1.5 opacity-60">
            Interact With Intention
          </span>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button className="w-11 h-11 rounded-2xl glass flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all hover:border-emerald-500/30 active:scale-90 group">
          <i className="fa-regular fa-bell text-lg group-hover:rotate-12 transition-transform"></i>
        </button>
        <button className="w-11 h-11 rounded-2xl glass flex items-center justify-center text-slate-400 hover:text-violet-400 transition-all hover:border-violet-500/30 active:scale-90 group">
          <i className="fa-solid fa-sliders text-lg group-hover:rotate-[-12deg] transition-transform"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
