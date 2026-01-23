
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';

interface SpeedDatingViewProps {
  user: User | null;
  onUpdateTickets: (count: number) => void;
}

const SESSION_DURATION = 180; // 3 minutes
const REVEAL_START_TIME = 30; // Unblur starts at 30s left

const SpeedDatingView: React.FC<SpeedDatingViewProps> = ({ user, onUpdateTickets }) => {
  const [isActive, setIsActive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [timer, setTimer] = useState(SESSION_DURATION);
  const [blurAmount, setBlurAmount] = useState(40);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    let interval: any;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          const next = prev - 1;
          
          // Blur logic: stay at 40 until the final 30 seconds, then scale to 0
          if (next > REVEAL_START_TIME) {
            setBlurAmount(40);
          } else {
            const progress = next / REVEAL_START_TIME;
            setBlurAmount(40 * progress);
          }
          
          return next;
        });
      }, 1000);
    } else if (timer === 0 && isActive) {
      // Session Ended - Video stays unblurred for the decision
      setBlurAmount(0);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const startSearching = async () => {
    if (!user) return;
    
    if (!user.isPremium && user.speedDatingTickets <= 0) {
      alert("You're out of tickets! Purchase more or upgrade to Premium for unlimited seshes.");
      return;
    }

    try {
      const userMedia = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(userMedia);
      setIsSearching(true);

      // Simulate finding a match after 3 seconds
      setTimeout(() => {
        setIsSearching(false);
        setIsActive(true);
        if (!user.isPremium) {
          onUpdateTickets(user.speedDatingTickets - 1);
        }
      }, 3000);
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Camera and Microphone access are required for Blind Sesh.");
    }
  };

  useEffect(() => {
    if (videoRef.current && stream && (isActive || isSearching)) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, isActive, isSearching]);

  const handleDecision = (type: 'cut' | 'spark') => {
    if (type === 'spark') {
      alert("Intentional Connection! Checking her decision... It's a Spark! ✨");
    } else {
      alert("Cut recorded. Moving to the next event with intention. ✂️");
    }
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsActive(false);
    setTimer(SESSION_DURATION);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isSearching) {
    return (
      <div className="flex flex-col items-center justify-center h-[75vh] space-y-12 animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <div className="w-48 h-48 rounded-full border-4 border-pink-500/20 border-t-pink-500 animate-spin-slow"></div>
          <div className="absolute inset-4 rounded-full overflow-hidden grayscale opacity-30">
             <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
             <i className="fa-solid fa-radar text-4xl text-pink-500 animate-pulse"></i>
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black tracking-tighter shimmer-text italic uppercase">Searching City...</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Finding your intentional match</p>
        </div>
      </div>
    );
  }

  if (!isActive && timer === SESSION_DURATION) {
    return (
      <div className="flex flex-col items-center justify-center h-[75vh] text-center px-6 space-y-8 animate-in zoom-in duration-500">
        <div className="relative group">
          <div className="absolute -inset-4 bg-pink-500/20 blur-2xl rounded-full animate-pulse group-hover:bg-pink-500/40 transition-all"></div>
          <div className="w-40 h-40 rounded-[3rem] petal-gradient flex items-center justify-center border-4 border-white/20 shadow-2xl relative z-10 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <i className="fa-solid fa-video text-6xl text-white drop-shadow-xl"></i>
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-4xl font-black tracking-tighter shimmer-text italic">Blind Sesh Live</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto font-medium">
            A 3-minute video date. Start blurred to connect with energy first. Unveil the spark in the final moments.
          </p>
        </div>

        <div className="w-full max-w-xs space-y-4">
          <button 
            onClick={startSearching}
            className="w-full py-6 shimmer-btn text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-bolt"></i>
            Enter Sesh
          </button>

          <div className="glass p-5 rounded-[2rem] border-white/10 text-center">
            {user?.isPremium ? (
              <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest flex items-center justify-center gap-2">
                <i className="fa-solid fa-crown"></i> Unlimited Premium Access
              </p>
            ) : (
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Balance: {user?.speedDatingTickets} Tickets</span>
                <button className="text-[10px] font-black text-pink-500 uppercase tracking-widest hover:underline">Top Up</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[78vh] space-y-4 animate-in fade-in duration-500">
      {/* Video Container */}
      <div className="relative aspect-[9/16] w-full rounded-[4rem] overflow-hidden border-2 border-white/5 bg-slate-900 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
        
        {/* The Remote Participant (Mocking with self-view but blurred) */}
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          className="w-full h-full object-cover transition-[filter] duration-1000 ease-linear"
          style={{ filter: `blur(${blurAmount}px) brightness(${1 + (1 - timer/SESSION_DURATION) * 0.2})` }}
        />

        {/* Self View (Smaller, PIP) */}
        <div className="absolute top-8 right-8 w-24 h-36 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl glass z-20">
          <video 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60"
            onLoadedMetadata={(e) => {
               (e.target as HTMLVideoElement).srcObject = stream;
            }}
          />
          <div className="absolute inset-0 bg-pink-500/10 pointer-events-none"></div>
        </div>

        {/* HUD Layer */}
        <div className="absolute inset-0 p-10 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-pink-500 uppercase tracking-[0.3em] drop-shadow-md">Intentional Window</p>
              <h3 className="text-4xl font-black text-white tracking-tighter drop-shadow-2xl">
                {formatTime(timer)}
              </h3>
            </div>
            
            <div className="bg-red-600/80 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/20 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Live Sesh</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Reveal Bar */}
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-md border border-white/5">
               <div 
                className="h-full petal-gradient transition-all duration-1000 ease-linear shadow-[0_0_15px_rgba(255,0,128,0.5)]"
                style={{ width: `${(1 - timer / SESSION_DURATION) * 100}%` }}
               ></div>
            </div>
            
            <div className="text-center">
               <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em] mb-4">
                 {timer > REVEAL_START_TIME ? "Vibe Check in Progress..." : "The Unveiling Begins"}
               </p>
            </div>
          </div>
        </div>

        {/* Post-Sesh Decision Modal Overlay */}
        {timer === 0 && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md flex flex-col items-center justify-center p-8 z-50 animate-in zoom-in duration-500">
            <div className="text-center space-y-2 mb-12">
              <h2 className="text-4xl font-black tracking-tighter text-white italic">Unveiled.</h2>
              <p className="text-[11px] font-black text-pink-500 uppercase tracking-[0.4em]">Decide with Intention</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 w-full">
               <button 
                onClick={() => handleDecision('spark')}
                className="w-full py-6 shimmer-btn text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] shadow-2xl border border-white/20 flex items-center justify-center gap-4 group"
               >
                 <i className="fa-solid fa-bolt-lightning text-xl group-active:scale-150 transition-transform"></i>
                 Spark Match
               </button>
               
               <button 
                onClick={() => handleDecision('cut')}
                className="w-full py-5 bg-slate-900/50 border border-white/5 rounded-[2.5rem] font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-white transition-all"
               >
                 <i className="fa-solid fa-scissors mr-2"></i> Cut Connection
               </button>
            </div>
          </div>
        )}
      </div>

      {/* Mic controls (visual only for mock) */}
      <div className="flex justify-center gap-6 pb-4">
        <button className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-white border border-white/10 shadow-xl active:scale-90 transition-all">
          <i className="fa-solid fa-microphone"></i>
        </button>
        <button onClick={() => handleDecision('cut')} className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-red-500 border border-white/10 shadow-xl active:scale-90 transition-all">
          <i className="fa-solid fa-phone-slash"></i>
        </button>
      </div>
    </div>
  );
};

export default SpeedDatingView;
