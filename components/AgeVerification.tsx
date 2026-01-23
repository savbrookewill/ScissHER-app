
import React, { useState } from 'react';
import { NormalScissorsIcon } from './Header';

const AgeVerification: React.FC<{ onVerify: () => void }> = ({ onVerify }) => {
  const [dob, setDob] = useState({ dd: '', mm: '', yyyy: '' });
  const [error, setError] = useState('');

  const handleContinue = () => {
    const year = parseInt(dob.yyyy);
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;

    if (!dob.dd || !dob.mm || !dob.yyyy) {
      setError('Please enter your full date of birth.');
      return;
    }

    if (age < 18) {
      setError('You must be at least 18 years old to use ScissHER.');
      return;
    }

    onVerify();
  };

  return (
    <div className="fixed inset-0 bg-[#020617] z-[100] flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(255,0,128,0.1)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="relative mb-8">
        <div className="w-24 h-24 petal-gradient rounded-[2rem] flex items-center justify-center rotate-12 transition-transform border-2 border-white/20 shadow-[0_0_40px_rgba(255,0,128,0.3)]">
          <NormalScissorsIcon className="w-12 h-12 drop-shadow-[0_0_10px_white]" color="white" />
        </div>
      </div>

      <div className="text-center space-y-6 max-w-xs relative z-10 w-full">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-white italic leading-tight">
            <span className="shimmer-text">Safety Check</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Apple Safety Standards Applied
          </p>
        </div>

        <div className="glass p-6 rounded-[2rem] border-white/5 space-y-4">
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            ScissHER requires all users to be <span className="text-white font-bold">18+</span>. Identity verification follows this step.
          </p>
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="DD" 
              value={dob.dd}
              onChange={(e) => setDob({...dob, dd: e.target.value})}
              className="w-full bg-slate-900 border border-white/5 rounded-xl px-2 py-3 text-center font-black text-white focus:outline-none focus:ring-1 focus:ring-pink-500" 
            />
            <input 
              type="number" 
              placeholder="MM" 
              value={dob.mm}
              onChange={(e) => setDob({...dob, mm: e.target.value})}
              className="w-full bg-slate-900 border border-white/5 rounded-xl px-2 py-3 text-center font-black text-white focus:outline-none focus:ring-1 focus:ring-pink-500" 
            />
            <input 
              type="number" 
              placeholder="YYYY" 
              value={dob.yyyy}
              onChange={(e) => setDob({...dob, yyyy: e.target.value})}
              className="w-full bg-slate-900 border border-white/5 rounded-xl px-2 py-3 text-center font-black text-white focus:outline-none focus:ring-1 focus:ring-pink-500" 
            />
          </div>
          {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest animate-pulse">{error}</p>}
        </div>

        <div className="space-y-4 w-full">
          <button 
            onClick={handleContinue}
            className="w-full py-5 shimmer-btn rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] text-white shadow-2xl active:scale-95 transition-all"
          >
            Confirm Age & Continue
          </button>
          
          <p className="text-[8px] text-slate-600 uppercase tracking-widest leading-relaxed">
            By continuing, you agree to our <span className="underline">Safety Guidelines</span>. False age representation results in permanent hardware bans.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
