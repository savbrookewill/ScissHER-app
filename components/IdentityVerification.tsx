
import React, { useState } from 'react';

const IdentityVerification: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState<'intro' | 'scanning' | 'complete'>('intro');

  const startScan = () => {
    setStep('scanning');
    setTimeout(() => {
      setStep('complete');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-[#020617] z-[105] flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="max-w-xs w-full space-y-8 text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-500 mx-auto border border-blue-500/20 shadow-xl">
          <i className="fa-solid fa-shield-halved text-3xl"></i>
        </div>

        {step === 'intro' && (
          <div className="space-y-6 animate-in zoom-in duration-300">
            <h2 className="text-3xl font-black text-white tracking-tighter">Identity Check</h2>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              To maintain a secure space, we use biometric analysis to ensure you're a real human.
            </p>
            <button 
              onClick={startScan}
              className="w-full py-5 bg-white text-black rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all"
            >
              Start Face Scan
            </button>
          </div>
        )}

        {step === 'scanning' && (
          <div className="space-y-8 flex flex-col items-center animate-in fade-in duration-300">
            <div className="w-48 h-48 rounded-full border-4 border-dashed border-blue-500/50 flex items-center justify-center relative">
              <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping opacity-20"></div>
              <i className="fa-solid fa-face-viewfinder text-5xl text-blue-500 animate-pulse"></i>
            </div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] animate-pulse">Analyzing Liveness...</p>
          </div>
        )}

        {step === 'complete' && (
          <div className="space-y-6 animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <i className="fa-solid fa-check text-2xl"></i>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter">Verified</h2>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Your profile will now feature a verified badge. Let's finish your profile.
            </p>
            <button 
              onClick={onComplete}
              className="w-full py-5 shimmer-btn text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all"
            >
              Continue ✨
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdentityVerification;
