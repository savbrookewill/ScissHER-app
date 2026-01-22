
import React, { useState } from 'react';
import { User } from '../types';
import { RoseIcon } from './Header';

const ProfileView: React.FC<{ user: User | null }> = ({ user }) => {
  if (!user) return null;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'fa-brands fa-instagram';
      case 'TikTok': return 'fa-brands fa-tiktok';
      case 'Twitter': return 'fa-brands fa-twitter';
      case 'LinkedIn': return 'fa-brands fa-linkedin';
      default: return 'fa-solid fa-link';
    }
  };

  const handleDeleteAccount = () => {
    if (confirm("Account Deletion: Are you sure you want to delete your account? This will permanently remove all matches, photos, and sesh history. This action cannot be undone.")) {
      // In a real app, this would call a deletion endpoint
      alert("Request Submitted: Your account deletion request is being processed. You will be logged out now.");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-10 pb-40 animate-in slide-in-from-bottom-6 duration-700 px-2">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-pink-500/20 blur-3xl rounded-full"></div>
          <div className="w-44 h-44 rounded-[3.5rem] overflow-hidden border-4 border-slate-900 shadow-2xl relative z-10 p-1 bg-gradient-to-tr from-pink-500 to-purple-500">
            <img src={user.mainPhoto} className="w-full h-full object-cover rounded-[3rem]" alt="Me" />
          </div>
          <button className="absolute -bottom-2 -right-2 w-12 h-12 petal-gradient rounded-2xl flex items-center justify-center text-white border-4 border-slate-950 z-20 shadow-xl hover:scale-110 transition-transform">
            <i className="fa-solid fa-camera"></i>
          </button>
        </div>
        
        <div className="mt-8 text-center space-y-1">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-4xl font-black text-white tracking-tighter">{user.name}, {user.age}</h2>
            <i className="fa-solid fa-circle-check text-blue-500 text-lg"></i>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">{user.location}</p>
        </div>
      </div>

      {/* Stats Summary - Private to user */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Petals', val: '1.2k', icon: 'rose' },
          { label: 'Sesh Hist', val: '18', icon: 'fa-scissors' },
          { label: 'Blooms', val: '42', icon: 'fa-sparkles' },
        ].map((s, i) => (
          <div key={i} className="glass p-5 rounded-[2rem] flex flex-col items-center gap-2 border border-white/5 shadow-lg">
            {s.icon === 'rose' ? (
              <RoseIcon className="w-6 h-6 text-pink-500" />
            ) : (
              <i className={`fa-solid ${s.icon} text-pink-500 text-lg`}></i>
            )}
            <div className="text-center">
              <p className="text-xl font-black text-white leading-none">{s.val}</p>
              <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Grid */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-2">Privacy & Experience</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="glass p-6 rounded-[2.5rem] flex flex-col items-center gap-3 border-white/5 group active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-pink-500 group-hover:bg-pink-500/10 transition-all">
              <i className="fa-solid fa-shield-heart"></i>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 text-center">Privacy Center</span>
          </button>
          <button className="glass p-6 rounded-[2.5rem] flex flex-col items-center gap-3 border-white/5 group active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-purple-500 group-hover:bg-purple-500/10 transition-all">
              <i className="fa-solid fa-bell"></i>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 text-center">Notifications</span>
          </button>
          <button className="glass p-6 rounded-[2.5rem] flex flex-col items-center gap-3 border-white/5 group active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-yellow-500 group-hover:bg-yellow-500/10 transition-all">
              <i className="fa-solid fa-crown"></i>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 text-center">Membership</span>
          </button>
          <button className="glass p-6 rounded-[2.5rem] flex flex-col items-center gap-3 border-white/5 group active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-red-500 group-hover:bg-red-500/10 transition-all">
              <i className="fa-solid fa-user-xmark"></i>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 text-center">Blocked List</span>
          </button>
        </div>
      </div>

      {/* Linked Socials */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-2">Connected Presence</h3>
        <div className="flex flex-wrap gap-3 px-1">
          {user.socialLinks?.map((link, idx) => (
            <div key={idx} className="glass px-5 py-4 rounded-2xl flex items-center gap-4 border border-white/5 shadow-md">
              <i className={`${getPlatformIcon(link.platform)} text-pink-400 text-lg`}></i>
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{link.platform}</span>
                <span className="text-[10px] font-black text-slate-200 tracking-wider">{link.username}</span>
              </div>
            </div>
          ))}
          <button className="glass p-4 rounded-2xl flex items-center justify-center text-slate-500 border-dashed border-white/10 hover:border-pink-500/30 hover:text-pink-400 transition-all">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      {/* Legal & App Info (Mandatory for App Store Compliance) */}
      <div className="pt-10 pb-20 space-y-10 border-t border-white/5">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-8">
              <button className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</button>
              <button className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Terms of Service</button>
            </div>
            <button className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] opacity-50">Apple Standard EULA Applied</button>
          </div>
          
          <div className="space-y-3 w-full text-center">
             <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest italic">ScissHER Build 1.0.0 (Gold)</p>
             <button 
              onClick={handleDeleteAccount}
              className="text-[10px] font-black text-red-500/80 uppercase tracking-widest hover:text-red-400 transition-colors border-b border-red-500/20 pb-1"
             >
              Request Account & Data Deletion
             </button>
          </div>

          <button className="w-full max-w-xs py-5 bg-slate-900 border border-white/5 text-slate-400 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-lg active:scale-95 transition-all">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
