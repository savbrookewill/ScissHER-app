
import React, { useState } from 'react';

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

  // Fix: Capture files from the event target immediately to prevent null access in async timeout
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    // Capture files into an array before the timeout to avoid closure issues with React's synthetic events
    const filesArray = Array.from(e.target.files);
    
    setUploading(true);
    // Simulating upload/processing
    setTimeout(() => {
      const newPhotos: PhotoItem[] = filesArray.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        // URL.createObjectURL expects a Blob or File. Fixes: Argument of type 'unknown' is not assignable.
        url: URL.createObjectURL(file as Blob),
        isPrivate: false
      }));
      
      setPhotos(prev => [...prev, ...newPhotos]);
      setUploading(false);
    }, 1000);
  };

  const togglePrivate = (id: string) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, isPrivate: !p.isPrivate } : p));
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const isReady = photos.length >= 3;

  const handleSubmit = () => {
    if (!isReady) return;
    const publicUrls = photos.filter(p => !p.isPrivate).map(p => p.url);
    const privateUrls = photos.filter(p => p.isPrivate).map(p => p.url);
    onComplete(publicUrls, privateUrls);
  };

  return (
    <div className="fixed inset-0 bg-[#020617] z-[100] flex flex-col items-center justify-start py-12 px-8 overflow-y-auto no-scrollbar">
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(255,0,128,0.05)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="text-center space-y-4 max-w-xs relative z-10 w-full mb-10">
        <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-tight">
          <span className="shimmer-text">Curate Your Story</span>
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          Upload at least 3 intentional photos to begin
        </p>
        <div className="w-full bg-slate-900/50 rounded-full h-1.5 mt-2 overflow-hidden border border-white/5">
          <div 
            className="h-full petal-gradient transition-all duration-500 ease-out" 
            style={{ width: `${Math.min((photos.length / 3) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-sm relative z-10">
        {photos.map((photo) => (
          <div key={photo.id} className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 group shadow-2xl animate-in zoom-in duration-300">
            <img src={photo.url} className="w-full h-full object-cover" alt="Upload" />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <button 
              onClick={() => removePhoto(photo.id)}
              className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-red-500/80 backdrop-blur-md flex items-center justify-center text-white text-[10px] opacity-0 group-hover:opacity-100 transition-all active:scale-90"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>

            <button 
              onClick={() => togglePrivate(photo.id)}
              className={`absolute bottom-3 left-3 right-3 py-2 rounded-xl flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-widest transition-all ${
                photo.isPrivate 
                ? 'bg-pink-600 text-white' 
                : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
              }`}
            >
              <i className={`fa-solid ${photo.isPrivate ? 'fa-lock' : 'fa-lock-open'}`}></i>
              {photo.isPrivate ? 'Private' : 'Public'}
            </button>
          </div>
        ))}

        {/* Upload Button */}
        <label className="aspect-square bg-slate-900/40 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-pink-500/50 transition-all group shadow-xl relative overflow-hidden">
          <input type="file" multiple onChange={handleFileSelect} className="hidden" accept="image/*" />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <i className="fa-solid fa-spinner-third animate-spin text-pink-500 text-2xl"></i>
              <span className="text-[8px] font-black text-pink-500 uppercase tracking-widest">Processing...</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg">
                <i className="fa-solid fa-plus text-slate-500 text-xl group-hover:text-pink-500"></i>
              </div>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Add Photos</span>
            </>
          )}
        </label>
      </div>

      <div className="w-full max-w-xs mt-12 space-y-4 relative z-10">
        <button 
          onClick={handleSubmit}
          disabled={!isReady}
          className={`w-full py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] text-white shadow-2xl transition-all ${
            isReady 
            ? 'shimmer-btn active:scale-95' 
            : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5'
          }`}
        >
          {isReady ? "Complete Profile ✨" : `Upload ${3 - photos.length} More`}
        </button>
        
        <p className="text-[9px] font-black text-slate-600 text-center uppercase tracking-widest px-4 leading-relaxed">
          Photos marked as <span className="text-pink-500">Private</span> are only visible to matches you grant access to in your Vault.
        </p>
      </div>

      <div className="absolute bottom-6 opacity-10 flex gap-8 items-center text-slate-400 pointer-events-none">
        <i className="fa-solid fa-images text-xl"></i>
        <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
        <i className="fa-solid fa-fingerprint text-xl"></i>
      </div>
    </div>
  );
};

export default PhotoOnboarding;
