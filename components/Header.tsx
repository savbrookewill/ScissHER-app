
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

// Added SunflowerIcon to fix the compilation error in PetalsView.tsx
export const SunflowerIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="4" fill={color} />
    <path 
      d="M12 2C12 2 13 5 12 5C11 5 12 2 12 2ZM12 22C12 22 11 19 12 19C13 19 12 22 12 22ZM2 12C2 12 5 11 5 12C5 13 2 12 2 12ZM22 12C22 12 19 13 19 12C19 11 22 12 22 12ZM19.07 4.93C19.07 4.93 16.24 6.34 17 7.07C17.76 7.8 19.07 4.93 19.07 4.93ZM4.93 19.07C4.93 19.07 7.76 17.66 7 16.93C6.24 16.2 4.93 19.07 4.93 19.07ZM4.93 4.93C4.93 4.93 6.34 7.76 7.07 7C7.8 6.24 4.93 4.93 4.93 4.93ZM19.07 19.07C19.07 19.07 17.66 16.24 16.93 17C16.2 17.76 19.07 19.07 19.07 19.07Z" 
      fill={color} 
    />
  </svg>
);

export const FullConnectionIcon = ({ className = "w-12 h-12", color = "#fb7185" }: { className?: string, color?: string }) => (
  <div className={`relative ${className} flex items-center justify-center`}>
    <div className="absolute inset-0 rounded-full border border-current opacity-20 animate-ping"></div>
    <div className="absolute inset-2 rounded-full border border-current opacity-30 animate-pulse"></div>
    
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(251,113,133,0.4)]">
      <circle cx="40" cy="50" r="25" stroke={color} strokeWidth="2.5" strokeDasharray="5 5" className="opacity-50" />
      <circle cx="60" cy="50" r="25" stroke={color} strokeWidth="2.5" strokeDasharray="5 5" className="opacity-50" />
      <path d="M50 30L55 45L70 50L55 55L50 70L45 55L30 50L45 45L50 30Z" fill={color} className="animate-pulse" />
      <path d="M75 35c-1-1-2.5-1-3.5 0l-.5.5-.5-.5c-1-1-2.5-1-3.5 0s-1 2.5 0 3.5l4 4 4-4c1-1 1-2.5 0-3.5z" fill="#a855f7" className="animate-bounce" />
    </svg>
  </div>
);

export const SeshClockIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="7" cy="5" r="3" stroke={color} strokeWidth="1.5" />
    <circle cx="17" cy="5" r="3" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="13" r="8" stroke={color} strokeWidth="2" />
    <path d="M12 13L15 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 13L9 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="px-6 py-6 flex items-center justify-between sticky top-0 z-50 glass border-b border-white/5 overflow-hidden rounded-b-[2rem]">
      <div className="flex items-center gap-4 relative">
        <div className="star-bit animate-float" style={{ top: '-8px', left: '0px' }}></div>
        <div className="star-bit animate-float" style={{ top: '15px', right: '-8px', animationDelay: '1.5s' }}></div>

        <div className="relative group">
          <div className="w-12 h-12 bg-slate-900 rounded-[1.1rem] flex items-center justify-center text-white shadow-[0_10px_25px_rgba(251,113,133,0.3)] group-hover:shadow-[0_15px_35px_rgba(251,113,133,0.5)] transition-all duration-500 border border-white/10 overflow-hidden relative active:scale-90">
            <div className="absolute inset-0 petal-gradient opacity-15 group-hover:opacity-40 transition-opacity"></div>
            <NormalScissorsIcon className="w-7 h-7 relative z-10 drop-shadow-[0_0_10px_white]" color="white" />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter leading-none flex items-center gap-1.5">
            <span className="shimmer-text italic">ScissHER</span>
          </h1>
          <span className="text-[7px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-1.5 opacity-80">
            Intentional Connection
          </span>
        </div>
      </div>
      
      <div className="flex gap-2.5">
        <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-rose-400 transition-all hover:border-rose-500/30 active:scale-90 group">
          <i className="fa-regular fa-bell text-base group-hover:rotate-12 transition-transform"></i>
        </button>
        <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-violet-400 transition-all hover:border-violet-500/30 active:scale-90 group">
          <i className="fa-solid fa-sliders text-base group-hover:rotate-[-12deg] transition-transform"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
