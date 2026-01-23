
import React, { useState } from 'react';
import { User } from '../types';

const ProfileView: React.FC<{ user: User | null, onReset: () => void }> = ({ user, onReset }) => {
  const [showSafety, setShowSafety] = useState(false);

  if (!user) return null;

  const handleDeleteAccount = () => {
    const confirmDelete = confirm("This action is permanent. All your matches, messages, and encrypted vault data will be immediately erased. Proceed?");
    if (confirmDelete) {
      alert("Your account and all associated data have been permanently deleted from our servers.");
      onReset();
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
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500">Identity Verified ✨</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-2">Account Control</h3>
        <div className="space-y-3">
          <button onClick={() => setShowSafety(true)} className="w-full glass p-6 rounded-[2.5rem] flex items-center justify-between border-white/5 group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">Safety & Privacy Center</span>
            </div>
            <i className="fa-solid fa-chevron-right text-slate-600 group-hover:translate-x-1 transition-transform"></i>
          </button>
          
          <button className="w-full glass p-6 rounded-[2.5rem] flex items-center justify-between border-white/5 group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <i className="fa-solid fa-key"></i>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">Vault Access Permissions</span>
            </div>
            <i className="fa-solid fa-chevron-right text-slate-600 group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>

      <div className="pt-10 pb-20 space-y-6">
        <button onClick={onReset} className="w-full py-5 bg-slate-900 border border-white/5 text-slate-400 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px]">
          Sign Out
        </button>
        <button onClick={handleDeleteAccount} className="w-full py-5 bg-red-950/20 border border-red-500/10 text-red-500/60 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-red-500 hover:text-white transition-all">
          Delete My Account & Data
        </button>
      </div>

      {showSafety && (
        <div className="fixed inset-0 z-[200] bg-slate-950 overflow-y-auto p-8 animate-in slide-in-from-bottom duration-500">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black text-white tracking-tighter shimmer-text">Safety Center</h3>
              <button onClick={() => setShowSafety(false)} className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                <i className="fa-solid fa-xmark"></i>
              </button>
           </div>
           
           <div className="space-y-8">
             <div className="glass p-8 rounded-[3rem] border-white/10 space-y-4">
               <h4 className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Our Commitment</h4>
               <p className="text-sm font-medium text-slate-300 leading-relaxed">
                 ScissHER is an intentional, secure space for lesbians. We utilize end-to-end encryption for all private media and zero-tolerance policies for harassment.
               </p>
             </div>
             
             <div className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Resources</h4>
               {['Community Guidelines', 'Privacy Policy', 'Terms of Use', 'How to Block/Report'].map(t => (
                 <button key={t} className="w-full py-5 px-8 glass rounded-2xl text-left text-[10px] font-black uppercase tracking-widest text-slate-400 border-white/5 flex justify-between items-center">
                   {t} <i className="fa-solid fa-arrow-up-right-from-square text-[8px]"></i>
                 </button>
               ))}
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
