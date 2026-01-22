
import React, { useState } from 'react';
import { User } from '../types';

interface VaultViewProps {
  user: User | null;
  onGrantAccess: (id: string) => void;
}

const MOCK_MATCHES = [
  { id: 'u2', name: 'Elena', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200', status: 'Intentional Match' },
  { id: 'u3', name: 'Sasha', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200', status: 'Recent Connection' },
  { id: 'u4', name: 'Jordan', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200', status: 'Sesh Scheduled' },
];

const VaultView: React.FC<VaultViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'public' | 'private'>('public');
  const [accessList, setAccessList] = useState<string[]>(['u2']);
  const [isUploading, setIsUploading] = useState(false);

  if (!user) return null;

  const toggleAccess = (id: string) => {
    setAccessList(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleMultiUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        alert(`Successfully uploaded ${e.target.files!.length} intentional moments to your ${activeTab} vault. ✨`);
      }, 1500);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 px-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black tracking-tighter shimmer-text">Media Vault</h2>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Curate your intentional story</p>
      </div>

      <div className="flex bg-slate-900/50 p-1.5 rounded-[2.5rem] border border-white/5 mx-1 shadow-inner relative">
        <button 
          onClick={() => setActiveTab('public')}
          className={`flex-1 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all ${
            activeTab === 'public' ? 'bg-slate-800 text-white shadow-xl' : 'text-slate-500'
          }`}
        >
          Public Gallery
        </button>
        <button 
          onClick={() => setActiveTab('private')}
          className={`flex-1 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            activeTab === 'private' ? 'bg-pink-600/20 text-pink-400' : 'text-slate-500'
          }`}
        >
          <i className="fa-solid fa-lock text-[10px]"></i>
          Private Vault
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="aspect-square bg-slate-900/40 border-2 border-dashed border-white/10 rounded-[3rem] flex flex-col items-center justify-center cursor-pointer hover:border-pink-500/50 transition-all group shadow-xl relative overflow-hidden">
          <input type="file" multiple onChange={handleMultiUpload} className="hidden" />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <i className="fa-solid fa-spinner-third animate-spin text-pink-500 text-2xl"></i>
              <span className="text-[8px] font-black text-pink-500 uppercase tracking-widest">Encrypting...</span>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <i className="fa-solid fa-cloud-arrow-up text-slate-500 text-xl group-hover:text-pink-500"></i>
              </div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] text-center px-4">Upload Multiple</span>
            </>
          )}
        </label>

        {(activeTab === 'public' ? user.publicPhotos : user.privatePhotos).map((img, i) => (
          <div key={i} className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group">
            <img src={img} alt="Vault item" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button className="w-9 h-9 bg-black/60 backdrop-blur-md rounded-xl text-white text-[10px] flex items-center justify-center border border-white/10 hover:bg-pink-500">
                <i className="fa-solid fa-expand"></i>
              </button>
              <button className="w-9 h-9 bg-black/60 backdrop-blur-md rounded-xl text-white text-[10px] flex items-center justify-center border border-white/10 hover:bg-red-500">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeTab === 'private' && (
        <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-6 pt-4">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-white/5 rounded-[3.5rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-pink-500/5 blur-[80px] rounded-full"></div>
            
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 border border-pink-500/20 shadow-lg">
                    <i className="fa-solid fa-key-skeleton"></i>
                  </div>
                  Vault Access Control
                </h3>
              </div>
              <span className="bg-slate-950 px-4 py-1.5 rounded-full text-[9px] font-black text-slate-500 border border-white/5 uppercase tracking-widest shadow-inner">
                {accessList.length} GRANTED
              </span>
            </div>

            <div className="space-y-4">
              {MOCK_MATCHES.map((match) => {
                const isGranted = accessList.includes(match.id);
                return (
                  <div key={match.id} className="flex items-center gap-4 bg-slate-950/40 p-5 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all shadow-lg group/item">
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-xl">
                        <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
                      </div>
                      {isGranted && (
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-pink-600 rounded-xl flex items-center justify-center text-white text-[9px] border-2 border-slate-950 shadow-lg animate-in zoom-in">
                          <i className="fa-solid fa-lock-open"></i>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-black text-white tracking-tight">{match.name}</h4>
                      <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${isGranted ? 'text-pink-500' : 'text-slate-500'}`}>
                        {isGranted ? 'Access Live' : match.status}
                      </p>
                    </div>

                    <button 
                      onClick={() => toggleAccess(match.id)}
                      className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${
                        isGranted 
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white' 
                          : 'bg-white text-black hover:bg-pink-500 hover:text-white shadow-xl shadow-white/5'
                      }`}
                    >
                      {isGranted ? 'Revoke' : 'Grant Access'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-pink-500/5 rounded-[2.5rem] border border-pink-500/10 flex gap-4 items-start shadow-inner">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 shrink-0 shadow-lg">
                <i className="fa-solid fa-fingerprint text-sm"></i>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                <span className="text-pink-400 font-black">ENCRYPTION ACTIVE:</span> Your private vault uses end-to-end security. Only the people you manually grant access to can view these assets.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultView;
