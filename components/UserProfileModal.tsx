
import React, { useState } from 'react';
import { User } from '../types';
import { RoseIcon } from './Header';

interface UserProfileModalProps {
  user: User;
  onClose: () => void;
  onSendPetal: () => void;
  hasPrivateAccess?: boolean;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose, onSendPetal, hasPrivateAccess = false }) => {
  const [activeGallery, setActiveGallery] = useState<'public' | 'private'>('public');
  const [showReport, setShowReport] = useState(false);

  const handleReport = () => {
    alert(`Report submitted for ${user.name}. Our safety team will review this within 24 hours. The user has been blocked from your view.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-950 overflow-y-auto animate-in slide-in-from-bottom duration-500 pb-10">
      <div className="sticky top-0 z-20 glass px-6 py-4 flex items-center justify-between border-b border-white/5">
        <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <h3 className="text-xl font-black tracking-tighter shimmer-text">{user.name}'s Profile</h3>
        <button onClick={() => setShowReport(true)} className="w-10 h-10 rounded-xl bg-slate-900/50 flex items-center justify-center text-red-500">
          <i className="fa-solid fa-flag text-xs"></i>
        </button>
      </div>

      <div className="px-6 space-y-8 pt-6">
        <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl group border border-white/5">
          <img src={user.mainPhoto} alt={user.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-8 left-8">
            <h2 className="text-5xl font-black tracking-tighter text-white drop-shadow-lg">{user.name}, {user.age}</h2>
            <div className="flex items-center gap-2 text-pink-400 text-xs font-black uppercase tracking-widest mt-2 drop-shadow-md">
              <i className="fa-solid fa-location-dot"></i>
              {user.distance} • {user.location}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
            <i className="fa-solid fa-quote-left text-pink-500"></i>
            The Vibe
          </h4>
          <p className="text-lg font-medium text-slate-200 leading-relaxed italic">
            "{user.bio}"
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex bg-slate-900/50 p-1.5 rounded-[2rem] border border-white/5">
            <button onClick={() => setActiveGallery('public')} className={`flex-1 py-3 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest ${activeGallery === 'public' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}>Public</button>
            <button onClick={() => setActiveGallery('private')} className={`flex-1 py-3 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest ${activeGallery === 'private' ? 'bg-pink-600/20 text-pink-400' : 'text-slate-500'}`}>Private Access</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {activeGallery === 'public' ? (
              [user.mainPhoto, ...user.publicPhotos].map((img, i) => (
                <div key={i} className="aspect-square rounded-[2rem] overflow-hidden"><img src={img} className="w-full h-full object-cover" /></div>
              ))
            ) : (
              <div className="col-span-2 text-center py-10 opacity-50 bg-slate-900/50 rounded-[2rem] border border-dashed border-white/10 text-[10px] font-black uppercase tracking-widest">
                <i className="fa-solid fa-lock mb-2 block text-2xl"></i>
                Private content locked
              </div>
            )}
          </div>
        </div>

        <div className="pt-10 pb-20 space-y-4">
          <button onClick={() => { onSendPetal(); onClose(); }} className="w-full py-6 shimmer-btn text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-4">
            <RoseIcon className="w-8 h-8" color="white" />
            Send Spark
          </button>
          
          <button onClick={() => setShowReport(true)} className="w-full py-4 text-[9px] font-black uppercase tracking-widest text-slate-600 border border-white/5 rounded-2xl hover:text-red-500 transition-colors">
            Block & Report {user.name}
          </button>
        </div>
      </div>

      {showReport && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-sm glass rounded-[3rem] p-10 space-y-6 text-center border-red-500/20 border">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mx-auto border border-red-500/20">
              <i className="fa-solid fa-flag text-2xl"></i>
            </div>
            <h3 className="text-2xl font-black text-white">Report User</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Select a Reason</p>
            <div className="grid grid-cols-1 gap-2 text-left">
              {['Harassment', 'Fake Profile', 'Underage', 'Inappropriate Content'].map((reason) => (
                <button key={reason} onClick={handleReport} className="w-full p-4 bg-slate-900 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:border-red-500/50 hover:text-white transition-all">
                  {reason}
                </button>
              ))}
            </div>
            <button onClick={() => setShowReport(false)} className="text-[10px] font-black uppercase tracking-widest text-slate-500 pt-2">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileModal;
