
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
    }, 400);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center px-2">
        <div>
          <h2 className="text-3xl font-black tracking-tighter shimmer-text leading-none">Explore</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Interacting With Intention</p>
        </div>
        
        <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-slate-400 border border-white/5 shadow-lg active:scale-90 transition-all">
          <i className="fa-solid fa-filter text-sm"></i>
        </button>
      </div>

      <div className="relative aspect-[3/4.5] w-full perspective-1000">
        <div 
          className={`relative w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/5 bg-slate-900 group transition-all duration-500 ease-out transform-gpu ${
            swipeDir === 'left' ? '-translate-x-[120%] -rotate-12 opacity-0' : 
            swipeDir === 'right' ? 'translate-x-[120%] rotate-12 opacity-0' : 
            'translate-x-0 rotate-0 opacity-100'
          }`}
        >
          <img 
            src={user.mainPhoto} 
            alt={user.name} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            onClick={() => setShowProfile(true)}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-95 pointer-events-none"></div>
          
          <div className="absolute top-8 right-8 z-10">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-2xl animate-in slide-in-from-right-10">
               <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
               <span className="text-[8px] font-black uppercase tracking-widest text-white">Verified Connection</span>
            </div>
          </div>

          <div className="absolute bottom-32 left-8 right-8 space-y-4 pointer-events-none">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg leading-none">
                  {user.name}, {user.age}
                </h3>
                {user.isVerified && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white shadow-lg">
                    <i className="fa-solid fa-check"></i>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1.5 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-300 backdrop-blur-md">
                  {user.relationshipStyle}
                </span>
                <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-slate-300 backdrop-blur-md">
                   {user.location} • {user.distance}
                </span>
              </div>
              <p className="text-slate-300 font-medium italic text-md line-clamp-2 leading-relaxed pr-6 drop-shadow-md">
                "{user.bio}"
              </p>
            </div>
          </div>

          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-6 px-6">
            <button 
              onClick={() => handleAction('dislike')}
              className="w-16 h-16 glass rounded-full flex items-center justify-center text-white border border-white/10 hover:border-red-500/30 hover:text-red-400 transition-all active:scale-90 shadow-2xl"
            >
              <i className="fa-solid fa-scissors text-2xl"></i>
            </button>
            
            <button 
              onClick={() => setShowProfile(true)}
              className="w-20 h-20 glass rounded-full flex items-center justify-center text-white border border-white/10 hover:border-purple-500/30 hover:text-white transition-all active:scale-90 shadow-2xl"
            >
              <i className="fa-solid fa-user text-3xl"></i>
            </button>

            <button 
              onClick={() => handleAction('like')}
              className="w-16 h-16 petal-gradient rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(255,0,128,0.5)] active:scale-90 transition-all border-2 border-white/20"
            >
              <i className="fa-solid fa-bolt-lightning text-2xl"></i>
            </button>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 translate-y-4 scale-95 opacity-40 rounded-[3.5rem] bg-slate-800 border border-white/5"></div>
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
