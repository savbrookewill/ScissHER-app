
import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import UserProfileModal from './UserProfileModal';
import SeshRequestModal from './SeshRequestModal';
import { User } from '../types';
import { FullConnectionIcon } from './Header';

interface SparksViewProps {
  likedUsers: string[];
  onUpgrade: () => void;
}

const SparksView: React.FC<SparksViewProps> = ({ likedUsers, onUpgrade }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [seshRequestUser, setSeshRequestUser] = useState<User | null>(null);

  const handleSeshSubmit = (day: string, slot: string, note: string) => {
    setSeshRequestUser(null);
    alert(`Sesh request fired! ⚡️ Check your Sesh Center for the vibe check.`);
  };

  return (
    <div className="space-y-6 pb-20 px-1">
      <div className="flex items-center justify-between px-3">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter shimmer-text leading-none">Electric Scene</h2>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2 opacity-60">{likedUsers.length} Sparks Fired</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {MOCK_USERS.map((user) => (
          <div key={user.id} className="relative aspect-[3/4.4] rounded-[3rem] overflow-hidden group shadow-2xl border border-white/5 bg-slate-900">
            <img 
              src={user.mainPhoto} 
              alt={user.name} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-transparent"></div>
            
            <div className="absolute top-5 left-5 flex gap-1">
               <div className="w-9 h-9 petal-gradient rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                 <i className="fa-solid fa-bolt-lightning text-white text-xs"></i>
               </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-4">
              <div className="space-y-0.5">
                <h4 className="font-black text-2xl tracking-tighter text-white leading-none">{user.name}, {user.age}</h4>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] italic opacity-80">{user.distance}</p>
              </div>
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setSeshRequestUser(user)}
                  className="w-full py-3 shimmer-btn rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] text-white shadow-xl flex items-center justify-center gap-2 border border-white/10 active:scale-95 transition-all"
                >
                  <i className="fa-solid fa-bolt text-[10px]"></i>
                  Sesh Request
                </button>
                <button 
                  onClick={() => setSelectedUser(user)}
                  className="w-full py-2.5 glass rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border-white/10 text-slate-400 hover:text-white"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* PREMIUM UPGRADE CARD */}
      <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/10 p-10 rounded-[4rem] text-center space-y-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden group border-t-emerald-500/20">
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-all duration-1000"></div>
        
        <div className="mx-auto flex items-center justify-center relative z-10 transition-transform duration-700 group-hover:scale-110">
           <FullConnectionIcon className="w-20 h-20" color="#10b981" />
        </div>

        <div className="relative z-10 space-y-3 px-2">
          <h3 className="font-black text-3xl tracking-tighter shimmer-text">Full Connection</h3>
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed px-4 opacity-80">
            Stop guessing who's vibing with your energy. Reveal the Sparks instantly and interact with absolute intention.
          </p>
        </div>

        <button 
          onClick={onUpgrade} 
          className="w-full py-5 shimmer-btn rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] text-white shadow-2xl shadow-emerald-600/20 active:scale-95 transition-all relative z-10 border border-white/20"
        >
          Ascend to Premium
        </button>
      </div>

      {selectedUser && (
        <UserProfileModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
          onSendPetal={() => alert("Spark refreshed! ⚡️")}
        />
      )}

      {seshRequestUser && (
        <SeshRequestModal 
          user={seshRequestUser} 
          onClose={() => setSeshRequestUser(null)} 
          onSubmit={handleSeshSubmit} 
        />
      )}
    </div>
  );
};

export default SparksView;
