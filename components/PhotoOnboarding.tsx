
import React, { useState, useRef } from 'react';

interface PhotoItem {
  id: string;
  url: string;
  isPrivate: boolean;
}

interface PhotoOnboardingProps {
  onComplete: (publicPhotos: string[], privatePhotos: string[]) => void;
}

const PhotoOnboarding: React.FC<PhotoOnboardingProps> = ({ onComplete }) => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isInstaConnected, setIsInstaConnected] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const longPressTimer = useRef<any>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    
    setUploading(true);
    setTimeout(() => {
      const newPhotos: PhotoItem[] = filesArray.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file as Blob),
        isPrivate: false
      }));
      setPhotos(prev => [...prev, ...newPhotos]);
      setUploading(false);
    }, 800);
  };

  const handleInstagramConnect = () => {
    if (isInstaConnected) {
      setIsInstaConnected(false);
      return;
    }
    
    setUploading(true);
    // Simulate Instagram OAuth
    setTimeout(() => {
      setIsInstaConnected(true);
      const instaPhotos: PhotoItem[] = [
        { id: 'insta1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', isPrivate: false },
        { id: 'insta2', url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400', isPrivate: false }
      ];
      setPhotos(prev => [...prev, ...instaPhotos]);
      setUploading(false);
    }, 1200);
  };

  const togglePrivate = (id: string) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, isPrivate: !p.isPrivate } : p));
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const handleDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (idx: number) => {
    if (draggedIdx === null || draggedIdx === idx) return;
    const newPhotos = [...photos];
    const item = newPhotos.splice(draggedIdx, 1)[0];
    newPhotos.splice(idx, 0, item);
    setPhotos(newPhotos);
    setDraggedIdx(idx);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  const isReady = photos.length >= 5;

  const handleSubmit = () => {
    if (!isReady) return;
    const publicUrls = photos.filter(p => !p.isPrivate).map(p => p.url);
    const privateUrls = photos.filter(p => p.isPrivate).map(p => p.url);
    onComplete(publicUrls, privateUrls);
  };

  return (
    <div className="fixed inset-0 bg-[#020617] z-[100] flex flex-col items-center justify-start py-12 px-6 overflow-y-auto no-scrollbar">
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(255,0,128,0.08)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="text-center space-y-3 max-w-xs relative z-10 w-full mb-10">
        <h1 className="text-4xl font-black tracking-tighter text-white italic leading-tight">
          <span className="shimmer-text">Curate Your Story</span>
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
          Upload 5+ intentional photos
        </p>
      </div>

      <div className="w-full max-w-xs space-y-6 relative z-10">
        {/* Instagram Integration Card */}
        <div className={`p-6 rounded-[2.5rem] border transition-all duration-500 ${isInstaConnected ? 'bg-gradient-to-br from-pink-600/10 to-purple-600/10 border-pink-500/30 shadow-[0_0_30px_rgba(255,0,128,0.1)]' : 'bg-slate-900/50 border-white/5 shadow-xl'}`}>
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${isInstaConnected ? 'petal-gradient' : 'bg-slate-800'}`}>
                    <i className="fa-brands fa-instagram text-xl"></i>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Instagram</span>
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Optional Sync</span>
                 </div>
              </div>
              <button 
                onClick={handleInstagramConnect}
                className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${isInstaConnected ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                {isInstaConnected ? 'Connected' : 'Connect'}
              </button>
           </div>
           {!isInstaConnected && (
             <p className="text-[9px] text-slate-500 leading-relaxed font-medium">
               Link your Instagram to instantly import your best moments and verify your social presence.
             </p>
           )}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-3 gap-3">
          {photos.map((photo, idx) => (
            <div 
              key={photo.id} 
              draggable 
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => { e.preventDefault(); handleDragOver(idx); }}
              onDragEnd={handleDragEnd}
              className={`relative aspect-square rounded-2xl overflow-hidden border transition-all duration-300 shadow-xl group ${
                draggedIdx === idx ? 'opacity-40 scale-90 border-pink-500' : 'border-white/10'
              }`}
            >
              <img src={photo.url} className="w-full h-full object-cover pointer-events-none" alt="Upload" />
              
              <button 
                onClick={() => removePhoto(photo.id)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-lg bg-red-500/80 backdrop-blur-md flex items-center justify-center text-white text-[8px] opacity-0 group-hover:opacity-100 transition-all"
              >
                <i className="fa-solid fa-x"></i>
              </button>

              <button 
                onClick={() => togglePrivate(photo.id)}
                className={`absolute bottom-1.5 left-1.5 right-1.5 py-1 rounded-lg flex items-center justify-center gap-1.5 text-[6px] font-black uppercase tracking-[0.15em] transition-all ${
                  photo.isPrivate 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-black/40 backdrop-blur-md text-white border border-white/10'
                }`}
              >
                <i className={`fa-solid ${photo.isPrivate ? 'fa-lock' : 'fa-lock-open'}`}></i>
                {photo.isPrivate ? 'Vault' : 'Public'}
              </button>
            </div>
          ))}

          {/* Upload Button */}
          <label className="aspect-square bg-slate-900/40 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-pink-500/50 transition-all group shadow-inner relative overflow-hidden">
            <input type="file" multiple onChange={handleFileSelect} className="hidden" accept="image/*" />
            <i className="fa-solid fa-plus text-slate-500 text-xl group-hover:text-pink-500 group-hover:scale-110 transition-transform"></i>
          </label>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center justify-between px-2">
           <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i < photos.length ? 'w-6 bg-pink-500' : 'w-3 bg-slate-800'}`}></div>
              ))}
           </div>
           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              {photos.length}/5 Minimum
           </span>
        </div>

        {/* Submit Button */}
        <div className="pt-8 space-y-4">
          <button 
            onClick={handleSubmit}
            disabled={!isReady || uploading}
            className={`w-full py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] text-white shadow-2xl transition-all ${
              isReady && !uploading
              ? 'shimmer-btn active:scale-95 shadow-pink-500/30' 
              : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-white/5 opacity-50'
            }`}
          >
            {uploading ? "Encrypting Assets..." : isReady ? "Launch Profile ✨" : "Add More Photos"}
          </button>
          
          <p className="text-[8px] font-black text-slate-600 text-center uppercase tracking-[0.3em] px-4 leading-relaxed italic">
            All media is end-to-end encrypted in your <span className="text-white">secure vault</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoOnboarding;
