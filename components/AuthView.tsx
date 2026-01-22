
import React, { useState } from 'react';
import { NormalScissorsIcon } from './Header';

interface AuthViewProps {
  onLogin: () => void;
  onCreateAccount: () => void;
}

type AuthMode = 'choice' | 'login' | 'signup';

const AuthView: React.FC<AuthViewProps> = ({ onLogin, onCreateAccount }) => {
  const [mode, setMode] = useState<AuthMode>('choice');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleAction = () => {
    // App Store Requirement: Users must explicitly agree to EULA before account creation or login
    if (!acceptedTerms && (mode === 'login' || mode === 'signup')) {
      alert("Required: You must agree to the ScissHER EULA and Privacy Policy to access this intentional community.");
      return;
    }
    mode === 'login' ? onLogin() : onCreateAccount();
  };

  const renderSocialButtons = () => (
    <div className="space-y-3">
      <div className="flex items-center gap-4 py-2">
        <div className="h-[1px] flex-1 bg-white/5"></div>
        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">or continue with</span>
        <div className="h-[1px] flex-1 bg-white/5"></div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <button onClick={handleAction} className="w-full py-3.5 glass rounded-[1.5rem] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest text-white border border-white/5 hover:border-white/20 transition-all"><i className="fa-brands fa-apple text-lg"></i>Secure Apple Sign-In</button>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={handleAction} className="w-full py-3.5 glass rounded-[1.5rem] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest text-white border border-white/5 transition-all"><i className="fa-brands fa-google text-red-400"></i>Google</button>
          <button onClick={handleAction} className="w-full py-3.5 glass rounded-[1.5rem] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest text-white border border-white/5 transition-all"><i className="fa-brands fa-facebook text-blue-500"></i>Facebook</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#020617] z-[100] flex flex-col items-center justify-between py-12 px-8 overflow-y-auto no-scrollbar">
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_rgba(255,0,128,0.12)_0%,_transparent_60%)] pointer-events-none"></div>
      
      <div className="relative flex flex-col items-center gap-6 mt-6 w-full max-w-xs">
        <div className="w-24 h-24 petal-gradient rounded-[2.5rem] flex items-center justify-center rotate-12 transition-transform border-2 border-white/20 shadow-[0_0_40px_rgba(255,0,128,0.3)]">
          <NormalScissorsIcon className="w-12 h-12 drop-shadow-[0_0_10px_white]" color="white" />
        </div>
        <div className="text-center space-y-2 w-full px-2 overflow-visible">
          <h1 className="text-4xl xs:text-5xl font-black tracking-tighter text-white uppercase italic leading-[1.1] py-1 px-4 overflow-visible"><span className="shimmer-text">ScissHER</span></h1>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Intentional Lesbian Connection</p>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-3 relative z-10 my-8">
        {mode === 'choice' && (
          <div className="space-y-4 animate-in fade-in zoom-in duration-300">
            <button onClick={() => setMode('login')} className="w-full py-5 shimmer-btn rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] text-white shadow-2xl transition-all">Member Login</button>
            <button onClick={() => setMode('signup')} className="w-full py-5 glass border border-white/10 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] text-white transition-all">Join The Garden</button>
          </div>
        )}

        {(mode === 'login' || mode === 'signup') && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="space-y-2">
              <input type="text" placeholder="Identity / Email" className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/30" />
              <input type="password" placeholder="Passcode" className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/30" />
            </div>

            <div className="flex items-start gap-3 px-2 py-3 bg-white/5 rounded-2xl border border-white/5">
              <input type="checkbox" id="terms" checked={acceptedTerms} onChange={() => setAcceptedTerms(!acceptedTerms)} className="mt-1 w-5 h-5 rounded-md border-white/10 bg-slate-900 accent-pink-500 shrink-0" />
              <label htmlFor="terms" className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                I agree to the <span className="text-white border-b border-white/20">Standard EULA</span>, Community Guidelines & <span className="text-white border-b border-white/20">Privacy Policy</span>.
              </label>
            </div>

            <button onClick={handleAction} className="w-full py-4 shimmer-btn rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] text-white shadow-2xl transition-all">{mode === 'login' ? 'Sign In' : 'Begin Verification'}</button>
            {renderSocialButtons()}
            <button onClick={() => setMode('choice')} className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Cancel</button>
          </div>
        )}
      </div>

      <div className="w-full max-w-xs text-center space-y-4 pb-4">
        <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-relaxed italic">Secure Community • End-to-End Encrypted Vaults</p>
      </div>
    </div>
  );
};

export default AuthView;
