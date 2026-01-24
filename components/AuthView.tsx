
import React, { useState } from 'react';
import { NormalScissorsIcon } from './Header';

interface AuthViewProps {
  onLogin: () => void;
  onCreateAccount: () => void;
}

type AuthMode = 'choice' | 'login' | 'signup';

const AuthView: React.FC<AuthViewProps> = ({ onLogin, onCreateAccount }) => {
  const [mode, setMode] = useState<AuthMode>('choice');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const renderSocialButtons = () => (
    <div className="space-y-3">
      <div className="flex items-center gap-4 py-2">
        <div className="h-[1px] flex-1 bg-white/5"></div>
        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">or continue with</span>
        <div className="h-[1px] flex-1 bg-white/5"></div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {/* Apple Sign-In is REQUIRED if other social logins are used */}
        <button onClick={onLogin} className="w-full py-4 bg-white rounded-[1.5rem] flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest text-black shadow-xl active:scale-95 transition-all">
          <i className="fa-brands fa-apple text-xl"></i>
          Sign in with Apple
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={onLogin} className="w-full py-3.5 glass rounded-[1.5rem] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest text-white border border-white/5 transition-all"><i className="fa-brands fa-google text-red-400"></i>Google</button>
          <button onClick={onLogin} className="w-full py-3.5 glass rounded-[1.5rem] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest text-white border border-white/5 transition-all"><i className="fa-brands fa-facebook text-blue-500"></i>Facebook</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#020617] z-[100] flex flex-col items-center justify-between py-12 px-8 overflow-y-auto no-scrollbar">
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_rgba(251,113,133,0.12)_0%,_transparent_60%)] pointer-events-none"></div>
      
      <div className="relative flex flex-col items-center gap-6 mt-6 w-full max-w-xs">
        <div className="w-24 h-24 petal-gradient rounded-[2.5rem] flex items-center justify-center rotate-12 transition-transform border-2 border-white/20 shadow-[0_0_40px_rgba(251,113,133,0.3)]">
          <NormalScissorsIcon className="w-12 h-12 drop-shadow-[0_0_10px_white]" color="white" />
        </div>
        <div className="text-center space-y-2 w-full px-2 overflow-visible">
          <h1 className="text-4xl xs:text-5xl font-black tracking-tighter text-white italic leading-[1.1] py-1 px-4 overflow-visible"><span className="shimmer-text">ScissHER</span></h1>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Dating with Intention</p>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-3 relative z-10 my-8">
        {mode === 'choice' && (
          <div className="space-y-4 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setMode('login')} 
              className="w-full py-6 glass border border-white/10 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] text-white transition-all shadow-xl flex flex-col items-center gap-1"
            >
              <span className="text-rose-500 text-[10px]">Welcome Back</span>
              Member Login
            </button>
            <button 
              onClick={() => setMode('signup')} 
              className="w-full py-6 shimmer-btn rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] text-white shadow-2xl transition-all flex flex-col items-center gap-1"
            >
              <span className="text-white/60 text-[10px]">New Here?</span>
              Create Account
            </button>
          </div>
        )}

        {(mode === 'login' || mode === 'signup') && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="space-y-3">
              <input type="text" placeholder="Phone Number / Email" className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30 shadow-inner" />
              <div className="space-y-2">
                <input type="password" placeholder="Password" className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30 shadow-inner" />
                <div className="flex justify-end px-2">
                  <button className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-rose-500 transition-colors">Forgot Password?</button>
                </div>
              </div>
            </div>

            {mode === 'signup' && (
              <div className="flex items-start gap-3 px-2 py-2">
                <button 
                  onClick={() => setAgreedToTerms(!agreedToTerms)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${agreedToTerms ? 'bg-rose-600 border-rose-500' : 'bg-slate-900 border-white/10'}`}
                >
                  {agreedToTerms && <i className="fa-solid fa-check text-[10px] text-white"></i>}
                </button>
                <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                  I agree to the <span className="text-white underline">Terms of Use (EULA)</span> and <span className="text-white underline">Privacy Policy</span>. I understand ScissHER has zero tolerance for harassment.
                </p>
              </div>
            )}

            <button 
              onClick={mode === 'login' ? onLogin : onCreateAccount} 
              disabled={mode === 'signup' && !agreedToTerms}
              className={`w-full py-4 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] text-white shadow-2xl transition-all ${mode === 'signup' && !agreedToTerms ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50' : 'shimmer-btn'}`}
            >
              {mode === 'login' ? 'Sign In' : 'Continue'}
            </button>
            
            {renderSocialButtons()}
            <button onClick={() => setMode('choice')} className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Back to Options</button>
          </div>
        )}
      </div>

      <div className="w-full max-w-xs text-center space-y-4 pb-4">
        <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-relaxed italic">Apple Safety Standards Applied • Encrypted Vaults</p>
      </div>
    </div>
  );
};

export default AuthView;
