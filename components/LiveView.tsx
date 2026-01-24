
import React, { useState, useRef, useEffect } from 'react';
import { RoseIcon } from './Header';
import { GoogleGenAI } from "@google/genai";

interface Stream {
  id: number;
  hostId: string;
  host: string;
  viewers: string;
  location: string;
  title: string;
  img: string;
}

const LiveView: React.FC = () => {
  const [activeStream, setActiveStream] = useState<Stream | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [showSafetyAgreement, setShowSafetyAgreement] = useState(false);
  const [streamTitle, setStreamTitle] = useState('');
  const [hearts, setHearts] = useState<{ id: number; left: number }[]>([]);
  const [showReportStream, setShowReportStream] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const streams: Stream[] = [
    { id: 1, hostId: 'u101', host: 'Zara', viewers: '1.2k', location: 'Bushwick', title: 'Late night chill & chat - Join local!', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60' },
    { id: 2, hostId: 'u102', host: 'Luna', viewers: '850', location: 'Upper West Side', title: 'Q&A about local queer nightlife', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60' },
    { id: 3, hostId: 'u103', host: 'Sky', viewers: '2.4k', location: 'West Village', title: 'Getting ready for the party tonight!', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60' },
  ];

  const handleAiSuggest = async () => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Suggest a safe, intentional, and inclusive conversation starter for a lesbian live stream in NYC focusing on community and nightlife.",
        config: {
          systemInstruction: "You are a safety-first moderator and community builder for a lesbian dating app. Ensure suggestions are respectful and avoid any prohibited content."
        }
      });
      alert(`Gemini Suggests: "${response.text}"`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const startBroadcast = () => {
    setShowSafetyAgreement(true);
  };

  const confirmSafetyAndStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      setShowSafetyAgreement(false);
      setIsBroadcasting(true);
    } catch (err) {
      alert("Camera and Mic access are required to host a Sesh.");
    }
  };

  const endBroadcast = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    setMediaStream(null);
    setIsBroadcasting(false);
    setStreamTitle('');
  };

  const handleReport = () => {
    alert(`Report submitted. Our moderation team will review this stream and host (${activeStream?.host}) within 24 hours. Content has been hidden for you.`);
    setActiveStream(null);
    setShowReportStream(false);
  };

  const spawnHeart = () => {
    const id = Date.now();
    setHearts(prev => [...prev, { id, left: Math.random() * 80 + 10 }]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, 2000);
  };

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream, isBroadcasting]);

  if (isBroadcasting) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col animate-in fade-in duration-500">
        <video ref={videoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        
        <div className="relative z-10 p-8 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="bg-emerald-600 px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/20 shadow-xl animate-pulse w-fit">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Live Locally</span>
              </div>
              <p className="text-white text-xl font-black italic tracking-tighter drop-shadow-lg">
                {streamTitle || "Unnamed Sesh..."}
              </p>
            </div>
            <button onClick={endBroadcast} className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-center">
               <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 flex items-center justify-between shadow-2xl">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                      <i className="fa-solid fa-eye text-xs"></i>
                    </div>
                    <span className="text-xs font-black text-white">428 Tuning In</span>
                 </div>
                 <div className="flex -space-x-2">
                   {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border border-slate-950 bg-slate-800"></div>)}
                 </div>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-xl">
                 Invite Local Spark
              </button>
              <button 
                onClick={handleAiSuggest}
                disabled={isAiLoading}
                className="py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50"
              >
                 {isAiLoading ? <i className="fa-solid fa-spinner animate-spin"></i> : "Gemini AI Suggest"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeStream) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col animate-in slide-in-from-bottom duration-500 overflow-hidden">
        <img src={activeStream.img} alt={activeStream.host} className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-110 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60"></div>
        
        {/* Floating Hearts Container */}
        <div className="absolute inset-0 pointer-events-none z-30">
          {hearts.map(h => (
            <div key={h.id} className="absolute bottom-20 transition-all duration-2000 animate-out slide-out-to-top-[500px] fade-out" style={{ left: `${h.left}%` }}>
              <RoseIcon className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_#10b981]" />
            </div>
          ))}
        </div>

        <div className="relative z-10 p-8 flex flex-col h-full justify-between">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl border-2 border-emerald-500 overflow-hidden shadow-2xl">
                 <img src={`https://i.pravatar.cc/150?u=${activeStream.host}`} className="w-full h-full object-cover" />
               </div>
               <div>
                 <h4 className="font-black text-white text-lg leading-tight">{activeStream.host}</h4>
                 <div className="flex items-center gap-2">
                    <span className="text-emerald-500 text-[8px] font-black uppercase tracking-widest animate-pulse">LIVE</span>
                    <span className="text-slate-400 text-[8px] font-bold uppercase tracking-widest">{activeStream.viewers} Watching</span>
                 </div>
               </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowReportStream(true)} className="w-10 h-10 bg-red-500/20 border border-red-500/20 rounded-xl flex items-center justify-center text-red-500">
                <i className="fa-solid fa-flag text-xs"></i>
              </button>
              <button onClick={() => setActiveStream(null)} className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4 max-h-[40vh] overflow-y-auto no-scrollbar mask-gradient-b">
              {['Hey Zara! Local vibe is amazing tonight.', 'Bushwick represent! 🌈', 'What playlist is this?', 'Stunning energy! ✨'].map((msg, i) => (
                <div key={i} className="flex gap-3 items-start animate-in slide-in-from-left duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="w-6 h-6 rounded-lg bg-slate-800 shrink-0"></div>
                  <p className="text-[11px] text-white/90 font-medium leading-tight">
                    <span className="font-black text-emerald-500 mr-2 uppercase tracking-tighter">Member</span>
                    {msg}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 items-center">
              <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] px-6 py-4 flex items-center gap-3">
                 <input type="text" placeholder="Say something intentional..." className="bg-transparent border-none text-[11px] text-white focus:outline-none w-full placeholder:text-slate-500" />
                 <button className="text-emerald-500"><i className="fa-solid fa-paper-plane"></i></button>
              </div>
              <button onClick={spawnHeart} className="w-14 h-14 petal-gradient rounded-full flex items-center justify-center text-white shadow-2xl active:scale-150 transition-transform">
                <RoseIcon className="w-7 h-7" color="white" />
              </button>
            </div>
          </div>
        </div>

        {showReportStream && (
          <div className="fixed inset-0 z-[250] bg-slate-950/95 flex items-center justify-center p-6 animate-in zoom-in duration-300">
            <div className="w-full max-w-sm glass rounded-[3rem] p-8 space-y-6 border-red-500/20 border text-center">
               <h3 className="text-xl font-black text-white">Report Content</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Select a violation category</p>
               <div className="grid grid-cols-1 gap-2">
                 {['Harassment', 'Nudity/Inappropriate', 'Violence', 'Fake/Scam'].map(cat => (
                   <button key={cat} onClick={handleReport} className="py-4 px-6 bg-slate-900 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:border-red-500/50 hover:text-white transition-all">
                     {cat}
                   </button>
                 ))}
               </div>
               <button onClick={() => setShowReportStream(false)} className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col">
          <h2 className="text-3xl font-black tracking-tighter shimmer-text leading-none">Local Live</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">BROADCASTING TO YOUR CITY</p>
        </div>
        <button onClick={startBroadcast} className="w-14 h-14 shimmer-btn rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 active:scale-90 transition-all border border-white/10">
          <i className="fa-solid fa-tower-broadcast text-xl"></i>
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 flex items-center gap-3">
          <div className="flex gap-1 items-center bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-emerald-500">Active Locally</span>
          </div>
          Nearby Happenings
        </h3>
        
        <div className="flex gap-5 overflow-x-auto pb-6 snap-x no-scrollbar px-2">
          {streams.map(stream => (
            <div key={stream.id} onClick={() => setActiveStream(stream)} className="min-w-[280px] aspect-[9/16] rounded-[3rem] bg-slate-900 overflow-hidden relative snap-center border border-white/5 shadow-2xl group cursor-pointer">
              <img src={stream.img} alt={stream.host} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="bg-emerald-600 text-[10px] font-black px-3 py-1 rounded-full text-white uppercase tracking-wider shadow-lg">LIVE</span>
                  <span className="bg-black/60 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full text-white flex items-center gap-1.5 border border-white/10">
                    <i className="fa-solid fa-eye text-[10px]"></i> {stream.viewers}
                  </span>
                </div>
              </div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl border-2 border-emerald-500 overflow-hidden shadow-xl">
                    <img src={`https://i.pravatar.cc/150?u=${stream.host}`} alt={stream.host} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-white tracking-tight">{stream.host}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Verified Host</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-100 leading-relaxed line-clamp-2 italic drop-shadow-md">
                   "{stream.title}"
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                 <button className="px-8 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
                    Tune In
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2.5rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 blur-[60px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700"></div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                <i className="fa-solid fa-video text-xl"></i>
             </div>
             <h3 className="font-black text-2xl tracking-tight">Host for your City</h3>
          </div>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Go live and interact with <span className="text-white font-black italic">everyone local</span> in real-time. Boost your visibility and make intentional connections beyond matches!
          </p>
          <div className="pt-2">
            <button onClick={startBroadcast} className="w-full py-5 shimmer-btn text-white rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3">
              <i className="fa-solid fa-tower-broadcast"></i>
              Start Your Local Sesh
            </button>
          </div>
        </div>
      </div>

      {showSafetyAgreement && (
        <div className="fixed inset-0 z-[300] bg-slate-950/98 flex items-center justify-center p-6 animate-in slide-in-from-bottom duration-500">
           <div className="w-full max-w-sm glass rounded-[3.5rem] border-white/10 p-10 space-y-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mx-auto border border-emerald-500/20 mb-4">
                  <i className="fa-solid fa-shield-halved text-2xl"></i>
                </div>
                <h3 className="text-2xl font-black text-white italic tracking-tighter">Live Broadcast Agreement</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Apple & Google Safety Compliance</p>
              </div>

              <div className="space-y-4">
                 <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                   <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">PROHIBITED CONTENT</h4>
                   <p className="text-[9px] text-slate-400 leading-relaxed">
                     Harassment, nudity, violence, or hate speech are strictly prohibited. ScissHER maintains a zero-tolerance policy for objectionable content.
                   </p>
                 </div>
                 <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                   <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">USER REPORTING</h4>
                   <p className="text-[9px] text-slate-400 leading-relaxed">
                     Users can report and block you instantly. Verified violations result in a permanent hardware ban.
                   </p>
                 </div>
              </div>

              <div className="space-y-3">
                <button onClick={confirmSafetyAndStart} className="w-full py-5 shimmer-btn text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl">
                   Accept & Go Live
                </button>
                <button onClick={() => setShowSafetyAgreement(false)} className="w-full text-[10px] font-black uppercase tracking-widest text-slate-600">
                   Cancel
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default LiveView;
