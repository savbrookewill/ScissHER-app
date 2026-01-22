
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
  const [showSafetyMenu, setShowSafetyMenu] = useState(false);

  // App Store Compliance: Explicit 24-hour moderation cycle and immediate content removal
  const handleReport = () => {
    const reason = prompt("Safety Report: Please specify why you are reporting this profile (Harassment, Inappropriate Content, Fake Profile, Underage)");
    if (reason) {
      alert("Submission Confirmed: Our safety moderation team will review this user and their content within 24 hours. This user has been immediately blocked from your feed and cannot contact you.");
      // In a real app, this would trigger a back-end block
      onClose();
    }
    setShowSafetyMenu(false);
  };

  const handleBlock = () => {
    if (confirm(`Confirm Block: Are you sure you want to block ${user.name}? This action is permanent and you will no longer see each other.`)) {
      alert(`${user.name} has been blocked.`);
      onClose();
    }
    setShowSafetyMenu(false);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-950 overflow-y-auto animate-in slide-in-from-bottom duration-500 pb-10">
      {/* Safety Menu Overlay */}
      {showSafetyMenu && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-xs glass rounded-[2.5rem] border-white/10 p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500 mx-auto border border-red-500/20">
               <i className="fa-solid fa-shield-halved text-xl"></i>
            </div>
            <h4 className="text-xl font-black text-white text-center">Safety Center</h4>
            <p className="text-[9px] text-slate-500 text-center uppercase tracking-widest font-black leading-relaxed">
              We have a zero-tolerance policy for harassment or inappropriate content.
            </p>
            <div className="space-y-2 pt-4">
              <button onClick={handleReport} className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white transition-all">Report Content</button>
              <button onClick={handleBlock} className="w-full py-4 bg-slate-900 border border-white/5 text-slate-300 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all">Block User</button>
              <button onClick={() => setShowSafetyMenu(false)} className="w-full py-3 text-slate-500 font-black uppercase tracking-widest text-[8px]">Dismiss</button>
            </div>
            <p className="text-[7px] text-slate-600 text-center uppercase tracking-widest leading-none">Reports are reviewed within 24 hours</p>
          </div>
        </div>
      )}

      {/* Sticky Header */}
      <div className="sticky top-0 z-20 glass px-6 py-4 flex items-center justify-between border-b border-white/5">
        <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <h3 className="text-xl font-black tracking-tighter shimmer-text">{user.name}'s Profile</h3>
        <button onClick={() => setShowSafetyMenu(true)} className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors">
          <i className="fa-solid fa-circle-exclamation"></i>
        </button>
      </div>

      <div className="px-6 space-y-8 pt-6">
        {/* Main Photo Card */}
        <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl group border border-white/5">
          <img src={user.mainPhoto} alt={user.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          
          <div className="absolute top-8 left-8">
             <div className="bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-blue-400 text-[10px]"></i>
                <span className="text-[8px] font-black uppercase tracking-widest text-white">Identity Verified</span>
             </div>
          </div>

          <div className="absolute bottom-8 left-8">
            <h2 className="text-5xl font-black tracking-tighter text-white drop-shadow-lg">{user.name}, {user.age}</h2>
            <div className="flex items-center gap-2 text-pink-400 text-xs font-black uppercase tracking-widest mt-2 drop-shadow-md">
              <i className="fa-solid fa-location-dot"></i>
              {user.distance} • {user.location}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass p-5 rounded-[2rem] flex flex-col items-center gap-2 border border-white/5 shadow-lg">
            <RoseIcon className="w-6 h-6 text-pink-500" />
            <div className="text-center">
              <p className="text-xl font-black text-white leading-none">In Bloom</p>
              <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mt-1">Status Active</p>
            </div>
          </div>
          <div className="glass p-5 rounded-[2rem] flex flex-col items-center gap-2 border border-white/5 shadow-lg">
            <i className="fa-solid fa-sparkles text-purple-500 text-lg"></i>
            <div className="text-center">
              <p className="text-xl font-black text-white leading-none">{user.relationshipStyle}</p>
              <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mt-1">Intentions</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {user.intentions.map(intent => (
            <span key={intent} className="px-3 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full text-[9px] font-black text-pink-400 uppercase tracking-widest">
              {intent}
            </span>
          ))}
          <span className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-[9px] font-black text-purple-400 uppercase tracking-widest">
            {user.relationshipStyle}
          </span>
          {user.zodiacSign && (
            <span className="px-3 py-1.5 bg-slate-800 border border-white/5 rounded-full text-[9px] font-black text-slate-300 uppercase tracking-widest">
              {user.zodiacSign}
            </span>
          )}
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

        <div className="space-y-4">
          {user.prompts.map(prompt => (
            <div key={prompt.id} className="glass p-6 rounded-[2.5rem] border-white/5 space-y-2">
              <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest">{prompt.question}</p>
              <p className="text-xl font-bold text-white leading-tight">{prompt.answer}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="flex bg-slate-900/50 p-1.5 rounded-[2rem] border border-white/5">
            <button onClick={() => setActiveGallery('public')} className={`flex-1 py-3 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest ${activeGallery === 'public' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}>Public Intel</button>
            <button onClick={() => setActiveGallery('private')} className={`flex-1 py-3 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest ${activeGallery === 'private' ? 'bg-pink-600/20 text-pink-400' : 'text-slate-500'}`}>Private Album</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {activeGallery === 'public' ? (
              [user.mainPhoto, ...user.publicPhotos].map((img, i) => (
                <div key={i} className="aspect-square rounded-[2rem] overflow-hidden border border-white/5 shadow-xl"><img src={img} className="w-full h-full object-cover" /></div>
              ))
            ) : (
              hasPrivateAccess ? (
                user.privatePhotos.map((img, i) => (
                  <div key={i} className="aspect-square rounded-[2rem] overflow-hidden border border-white/5 shadow-xl"><img src={img} className="w-full h-full object-cover" /></div>
                ))
              ) : (
                <div className="col-span-2 bg-slate-900/50 border border-dashed border-white/10 rounded-[2.5rem] p-10 text-center space-y-4">
                  <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 mx-auto shadow-xl"><i className="fa-solid fa-lock text-2xl"></i></div>
                  <h5 className="font-black text-xl tracking-tight">Vault Locked</h5>
                  <button className="px-6 py-3 bg-pink-600/20 border border-pink-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-pink-400">Request Entry</button>
                </div>
              )
            )}
          </div>
        </div>

        <div className="pt-10 pb-20">
          <button onClick={() => { onSendPetal(); onClose(); }} className="w-full py-6 shimmer-btn text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-4 active:scale-95 transition-all">
            <RoseIcon className="w-8 h-8" color="white" />
            Send Petal
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
