
import React from 'react';
import { NormalScissorsIcon } from './Header';

const AgeVerification: React.FC<{ onVerify: () => void }> = ({ onVerify }) => {
  return (
    <div className="fixed inset-0 bg-[#020617] z-[100] flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(255,0,128,0.1)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="relative mb-12">
        {/* Logo with decorative hearts */}
        <div className="absolute -left-6 top-0 animate-bounce">
          <i className="fa-solid fa-heart text-pink-500 text-2xl rotate-[-20deg]"></i>
        </div>
        <div className="absolute -right-6 bottom-0 animate-bounce delay-150">
          <i className="fa-solid fa-heart text-purple-500 text-xl rotate-[15deg]"></i>
        </div>

        <div className="w-32 h-32 petal-gradient rounded-[2.5rem] flex items-center justify-center rotate-12 transition-transform hover:rotate-0 duration-500 border-2 border-white/20 shadow-[0_0_40px_rgba(255,0,128,0.3)]">
          <NormalScissorsIcon className="w-16 h-16 drop-shadow-[0_0_10px_white]" color="white" />
        </div>
        <div className="absolute -top-4 -right-4 animate-pulse">
          <i className="fa-solid fa-sparkles text-pink-400 text-xl"></i>
        </div>
      </div>

      <div className="text-center space-y-8 max-w-xs relative z-10 w-full">
        <div className="space-y-2 overflow-visible">
          {/* Reduced text size to 5xl to prevent cut-off on mobile devices */}
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic leading-tight">
            <span className="shimmer-text">ScissHER</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Verify Identity
          </p>
        </div>

        <div className="glass p-6 rounded-[2rem] border-white/5 space-y-4">
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            ScissHER is an intentional space for women aged <span className="text-white font-bold">20-30</span>. Please confirm your date of birth to proceed.
          </p>
          <div className="flex gap-2">
            <input type="number" placeholder="DD" className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-3 text-center font-black text-white focus:outline-none focus:ring-1 focus:ring-pink-500" />
            <input type="number" placeholder="MM" className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-3 text-center font-black text-white focus:outline-none focus:ring-1 focus:ring-pink-500" />
            <input type="number" placeholder="YYYY" className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-3 text-center font-black text-white focus:outline-none focus:ring-1 focus:ring-pink-500" />
          </div>
        </div>

        <div className="space-y-4 w-full">
          <button 
            onClick={onVerify}
            className="w-full py-5 shimmer-btn rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] text-white shadow-2xl active:scale-95 transition-all"
          >
            I'm 18+ Continue
          </button>
          <div className="flex items-center gap-4 text-slate-700">
            <div className="h-[1px] flex-1 bg-white/5"></div>
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-600">Secure Community Only</span>
            <div className="h-[1px] flex-1 bg-white/5"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 opacity-20 flex gap-8 items-center text-slate-400">
        <i className="fa-solid fa-shield-check text-xl"></i>
        <i className="fa-solid fa-fingerprint text-xl"></i>
        <i className="fa-solid fa-lock text-xl"></i>
      </div>
    </div>
  );
};

export default AgeVerification;
