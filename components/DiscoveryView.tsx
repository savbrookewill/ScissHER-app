
import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import UserProfileModal from './UserProfileModal';

const DiscoveryView: React.FC<{ onLike: (id: string) => void }> = ({ onLike }) => {
  const [idx, setIdx] = useState(0);
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  
  const user = MOCK_USERS[idx % MOCK_USERS.length];

  const handleAction = (type: 'like' | 'dislike') => {
    setSwipeDir(type === 'like' ? 'right' : 'left');
    
    setTimeout(() => {
      if (type === 'like') onLike(user.id);
      setIdx(idx + 1);
      setSwipeDir(null);
    }, 450);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex justify-between items-end px-4">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter shimmer-text leading-none italic">Discovery</h2>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2 opacity-70">Curating Your Vibe</p>
        </div>
        
        <button className="w-12 h-12 rounded-[1.25rem] glass flex items-center justify-center text-slate-400 border border-white/5 shadow-xl active:scale-90 transition-all hover:border-rose-500/20 group">
          <i className="fa-solid fa-leaf text-base group-hover:rotate-45 transition-transform"></i>
        </button>
      </div>

      <div className="relative aspect-[3/4.8] w-full perspective-1000 px-1">
        <div 
          className={`relative w-full h-full rounded-[4.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] border border-white/10 bg-slate-900 group transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu ${
            swipeDir === 'left' ? '-translate-x-[150%] -rotate-12 opacity-0' : 
            swipeDir === 'right' ? 'translate-x-[150%] rotate-12 opacity-0' : 
            'translate-x-0 rotate-0 opacity-100'
          }`}
        >
          <img 
            src={user.mainPhoto} 
            alt={user.name} 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            onClick={() => setShowProfile(true)}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent opacity-95 pointer-events-none"></div>
          
          {/* Elite Verified Badge */}
          <div className="absolute top-12 right-12 z-10">
            <div className="bg-rose-500/10 backdrop-blur-3xl border border-rose-500/30 px-6 py-3 rounded-[2.5rem] flex items-center gap-3 shadow-[0_15px_30px_rgba(251,113,133,0.3)] animate-in slide-in-from-right-10 duration-1000">
               <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse shadow-[0_0_10px_#fb7185]"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.25em] text-rose-100 italic">Authentic</span>
            </div>
          </div>

          <div className="absolute bottom-40 left-12 right-12 space-y-6 pointer-events-none">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h3 className="text-5xl font-black text-white tracking-tighter drop-shadow-2xl leading-none italic">
                  {user.name}
                  <span className="text-white/30 text-3xl font-light ml-3">/ {user.age}</span>
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2.5 bg-rose-500/15 border border-rose-500/30 rounded-full text-rose-300 backdrop-blur-3xl shadow-lg">
                  {user.relationshipStyle}
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-slate-300 backdrop-blur-3xl shadow-lg">
                   {user.location}
                </span>
              </div>
              
              <p className="text-slate-200 font-medium italic text-lg line-clamp-2 leading-relaxed pr-10 drop-shadow-xl opacity-90">
                "{user.bio}"
              </p>
            </div>
          </div>

          {/* Luxury Floating Actions */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-8 px-10">
            <button 
              onClick={() => handleAction('dislike')}
              className="w-16 h-16 glass rounded-[2rem] flex items-center justify-center text-white border border-white/10 hover:border-red-500/40 hover:text-red-400 transition-all active:scale-90 shadow-2xl group"
            >
              <i className="fa-solid fa-scissors text-2xl group-hover:rotate-45 transition-transform"></i>
            </button>
            
            <button 
              onClick={() => setShowProfile(true)}
              className="w-20 h-20 glass rounded-[2.5rem] flex items-center justify-center text-white border border-white/20 hover:border-rose-500/40 transition-all active:scale-90 shadow-[0_25px_50px_rgba(0,0,0,0.6)] group overflow-hidden"
            >
              <div className="absolute inset-0 bg-rose-500/5 group-hover:bg-rose-500/10 transition-colors"></div>
              <i className="fa-solid fa-eye text-3xl relative z-10 group-hover:scale-110 transition-transform"></i>
            </button>

            <button 
              onClick={() => handleAction('like')}
              className="w-16 h-16 petal-gradient rounded-[2rem] flex items-center justify-center text-white shadow-[0_25px_50px_rgba(251,113,133,0.4)] active:scale-90 transition-all border border-white/30 group"
            >
              <i className="fa-solid fa-bolt-lightning text-2xl group-hover:scale-125 transition-transform drop-shadow-[0_0_12px_white]"></i>
            </button>
          </div>
        </div>

        {/* Stack Depth Effect */}
        <div className="absolute inset-x-6 inset-y-0 -z-10 translate-y-10 scale-[0.95] opacity-30 rounded-[4.5rem] bg-slate-800/80 border border-white/5"></div>
        <div className="absolute inset-x-12 inset-y-0 -z-20 translate-y-20 scale-[0.9] opacity-10 rounded-[4.5rem] bg-slate-800/50"></div>
      </div>

      {showProfile && (
        <UserProfileModal 
          user={user}
          onClose={() => setShowProfile(false)}
          onSendPetal={() => handleAction('like')}
        />
      )}
    </div>
  );
};

export default DiscoveryView;
