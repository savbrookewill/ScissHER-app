
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
      // Launch-ready check: Ensure API key is present
      if (!process.env.API_KEY) {
        throw new Error("Missing Scene Intelligence Key");
      }
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Suggest a short, 1-sentence catchy and intentional conversation starter for a lesbian live stream focusing on community and nightlife in a metropolitan city.",
        config: {
          systemInstruction: "You are ScissHER's AI scene moderator. Your suggestions are modern, sleek, and focused on intentional community building."
        }
      });
      
      const text = response.text || "Ask the room: What intentional moment defined your day?";
      setStreamTitle(text.replace(/"/g, ''));
    } catch (err) {
      console.error(err);
      // Fallback for launch stability
      setStreamTitle("Let's talk about the intentional energy in the city tonight.");
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
      // Kick off an AI suggestion to get them started
      handleAiSuggest();
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
        <video ref={videoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-110 transition-all" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        
        <div className="relative z-10 p-8 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <div className="bg-emerald-600 px-5 py-2 rounded-full flex items-center gap-2.5 border border-white/20 shadow-[0_0_20px_rgba(16,185,129,0.4)] animate-pulse w-fit">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Live Locally</span>
              </div>
              <h2 className="text-white text-2xl font-black italic tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-tight max-w-[250px]">
                {streamTitle || "Curating Your Energy..."}
              </h2>
            </div>
            <button onClick={endBroadcast} className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.5rem] flex items-center justify-center text-white active:scale-90 transition-all">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-center">
               <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-5 flex items-center justify-between shadow-2xl">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                      <i className="fa-solid fa-eye text-sm"></i>
                    </div>
                    <span className="text-[11px] font-black text-white tracking-widest uppercase">428 Tuning In</span>
                 </div>
                 <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => <div key={i} className="w-7 h-7 rounded-full border-2 border-slate-950 bg-slate-800 shadow-lg"></div>)}
                 </div>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="py-5 bg-white text-black rounded-[1.75rem] font-black text-[10px] uppercase tracking-[0.3em] active:scale-95 transition-all shadow-2xl">
                 Invite Sparks
              </button>
              <button 
                onClick={handleAiSuggest}
                disabled={isAiLoading}
                className="py-5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 rounded-[1.75rem] font-black text-[10px] uppercase tracking-[0.3em] active:scale-95 transition-all shadow-xl backdrop-blur-xl disabled:opacity-50"
              >
                 {isAiLoading ? <i className="fa-solid fa-sparkle animate-spin"></i> : "Vibe Reset AI"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeStream) {
    return (
      <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col animate-in slide-in-from-bottom duration-700 overflow-hidden">
        <img src={activeStream.img} alt={activeStream.host} className="absolute inset-0 w-full h-full object-cover blur-[4px] scale-110 opacity-50 transition-all duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60"></div>
        
        <div className="absolute inset-0 pointer-events-none z-30">
          {hearts.map(h => (
            <div key={h.id} className="absolute bottom-32 transition-all duration-[2.5s] animate-out slide-out-to-top-[600px] fade-out" style={{ left: `${h.left}%` }}>
              <RoseIcon className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_15px_#10b981]" />
            </div>
          ))}
        </div>

        <div className="relative z-10 p-8 flex flex-col h-full justify-between">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 rounded-[1.5rem] border-2 border-emerald-500/50 overflow-hidden shadow-2xl">
                 <img src={`https://i.pravatar.cc/150?u=${activeStream.host}`} className="w-full h-full object-cover" />
               </div>
               <div className="space-y-0.5">
                 <h4 className="font-black text-white text-xl tracking-tighter leading-tight italic">{activeStream.host}</h4>
                 <div className="flex items-center gap-2.5">
                    <span className="text-emerald-500 text-[8px] font-black uppercase tracking-[0.4em] animate-pulse">LIVE NOW</span>
                    <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest">{activeStream.viewers} Watching</span>
                 </div>
               </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowReportStream(true)} className="w-12 h-12 glass border border-red-500/10 rounded-2xl flex items-center justify-center text-red-500/60 hover:text-red-500 transition-colors">
                <i className="fa-solid fa-flag text-xs"></i>
              </button>
              <button onClick={() => setActiveStream(null)} className="w-12 h-12 glass border border-white/5 rounded-2xl flex items-center justify-center text-white/60 hover:text-white transition-colors">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
          </div>

          <div className="space-y-8 pb-10">
            <div className="space-y-5 max-h-[35vh] overflow-y-auto no-scrollbar mask-gradient-b px-2">
              {[
                { u: 'Elena', m: 'The energy in the West Village is unmatched!' },
                { u: 'Sasha', m: 'Zara, your aesthetic today is everything. ✨' },
                { u: 'Jordan', m: 'Anyone going to the speed dating event tonight?' },
                { u: 'Maya', m: 'Sending intentional vibes from Brooklyn! 🌈' }
              ].map((msg, i) => (
                <div key={i} className="flex gap-4 items-start animate-in slide-in-from-left duration-700" style={{ animationDelay: `${i * 120}ms` }}>
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/5 shrink-0 flex items-center justify-center text-[8px] font-black text-emerald-400">
                    {msg.u[0]}
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">{msg.u}</p>
                    <p className="text-sm text-white/90 font-medium leading-relaxed drop-shadow-md">
                      {msg.m}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex-1 glass border border-white/10 rounded-[2.5rem] px-8 py-5 flex items-center gap-4 shadow-2xl">
                 <input type="text" placeholder="Send intentional thought..." className="bg-transparent border-none text-sm text-white focus:outline-none w-full placeholder:text-slate-600 font-medium" />
                 <button className="text-emerald-400 active:scale-125 transition-transform"><i className="fa-solid fa-paper-plane text-lg"></i></button>
              </div>
              <button onClick={spawnHeart} className="w-16 h-16 petal-gradient rounded-full flex items-center justify-center text-white shadow-2xl active:scale-125 transition-transform border border-white/30">
                <RoseIcon className="w-8 h-8" color="white" />
              </button>
            </div>
          </div>
        </div>

        {showReportStream && (
          <div className="fixed inset-0 z-[250] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-8 animate-in zoom-in duration-500">
            <div className="w-full max-w-sm glass rounded-[4rem] p-10 space-y-8 border-red-500/20 border-2 text-center shadow-2xl">
               <div className="w-20 h-20 bg-red-500/10 rounded-[2rem] flex items-center justify-center text-red-500 mx-auto border border-red-500/20">
                  <i className="fa-solid fa-shield-exclamation text-3xl"></i>
               </div>
               <div className="space-y-2">
                 <h3 className="text-2xl font-black text-white italic tracking-tighter">Content Flag</h3>
                 <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Maintain Our Safe Scene</p>
               </div>
               <div className="grid grid-cols-1 gap-3">
                 {['Harassment', 'Inappropriate', 'Fake Account', 'Spam'].map(cat => (
                   <button key={cat} onClick={handleReport} className="py-5 px-8 bg-slate-900 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all active:scale-95">
                     {cat}
                   </button>
                 ))}
               </div>
               <button onClick={() => setShowReportStream(false)} className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-white transition-colors pt-4">Dismiss</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-40 animate-in fade-in slide-in-from-bottom-4 duration-700 px-2">
      <div className="flex items-center justify-between px-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-black tracking-tighter shimmer-text italic leading-none">Local Live</h2>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] opacity-60">Real-time Scene Intelligence</p>
        </div>
        <button onClick={startBroadcast} className="w-16 h-16 shimmer-btn rounded-[2rem] flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all border border-white/20 group">
          <i className="fa-solid fa-tower-broadcast text-2xl group-hover:animate-pulse"></i>
        </button>
      </div>

      <div className="space-y-8">
        <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] px-4 flex items-center gap-4">
          <div className="flex gap-1.5 items-center bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
            <span className="text-emerald-500 text-[8px] font-black">Active Scene</span>
          </div>
          Nearby Happenings
        </h3>
        
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar px-3">
          {streams.map(stream => (
            <div key={stream.id} onClick={() => setActiveStream(stream)} className="min-w-[300px] aspect-[9/16.5] rounded-[4.5rem] bg-slate-900 overflow-hidden relative snap-center border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] group cursor-pointer transition-all duration-500 hover:scale-[1.02]">
              <img src={stream.img} alt={stream.host} className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110 opacity-70 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute top-10 left-10 flex flex-col gap-3">
                <div className="flex gap-2">
                  <span className="bg-emerald-600 text-[9px] font-black px-4 py-1.5 rounded-full text-white uppercase tracking-widest shadow-xl border border-white/10">LIVE</span>
                  <span className="bg-slate-950/60 backdrop-blur-xl text-[9px] font-black px-4 py-1.5 rounded-full text-white flex items-center gap-2 border border-white/10">
                    <i className="fa-solid fa-eye text-[9px]"></i> {stream.viewers}
                  </span>
                </div>
              </div>
              
              <div className="absolute bottom-12 left-10 right-10">
                <div className="flex items-center gap-5 mb-5">
                  <div className="w-14 h-14 rounded-[1.75rem] border-2 border-emerald-500 overflow-hidden shadow-2xl">
                    <img src={`https://i.pravatar.cc/150?u=${stream.host}`} alt={stream.host} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-xl italic tracking-tighter leading-none">{stream.host}</h4>
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1 opacity-80">Verified Intent</p>
                  </div>
                </div>
                <p className="text-base font-semibold text-slate-100 leading-relaxed line-clamp-2 italic drop-shadow-xl pr-4">
                   "{stream.title}"
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-slate-950/20 backdrop-blur-[4px]">
                 <div className="w-20 h-20 rounded-full petal-gradient flex items-center justify-center text-white text-2xl shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                    <i className="fa-solid fa-play ml-1"></i>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-950/40 p-12 rounded-[4.5rem] border border-white/5 shadow-inner relative overflow-hidden group mx-1">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full group-hover:bg-emerald-500/10 transition-all duration-1000"></div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-5">
             <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-xl group-hover:rotate-12 transition-transform duration-700">
                <i className="fa-solid fa-video text-2xl"></i>
             </div>
             <div className="space-y-1">
                <h3 className="font-black text-3xl tracking-tighter text-white italic">Host the Scene</h3>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global visibility, local vibe</p>
             </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium leading-relaxed px-2">
            Go live to interact with <span className="text-white font-black italic">everyone local</span> in real-time. Boost your visibility and attract intentional sparks instantly.
          </p>
          <div className="pt-4">
            <button onClick={startBroadcast} className="w-full py-6 shimmer-btn text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all border border-white/20">
              Launch Local Sesh
            </button>
          </div>
        </div>
      </div>

      {showSafetyAgreement && (
        <div className="fixed inset-0 z-[300] bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-8 animate-in slide-in-from-bottom duration-700">
           <div className="w-full max-w-sm glass rounded-[4.5rem] border-white/10 p-12 space-y-10 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center text-emerald-500 mx-auto border border-emerald-500/20 mb-6 shadow-xl">
                  <i className="fa-solid fa-hand-holding-heart text-3xl"></i>
                </div>
                <h3 className="text-3xl font-black text-white italic tracking-tighter">Safe Scene Terms</h3>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500 opacity-80 leading-relaxed">Identity Verified Interaction</p>
              </div>

              <div className="space-y-5">
                 <div className="p-6 bg-slate-900/60 rounded-[2.5rem] border border-white/5 space-y-2">
                   <h4 className="text-[10px] font-black text-white uppercase tracking-widest">ZERO TOLERANCE</h4>
                   <p className="text-[9px] text-slate-500 leading-relaxed font-medium">
                     Any harassment, inappropriate content, or lack of intention results in an immediate and permanent hardware ban.
                   </p>
                 </div>
                 <div className="p-6 bg-slate-900/60 rounded-[2.5rem] border border-white/5 space-y-2">
                   <h4 className="text-[10px] font-black text-white uppercase tracking-widest">REAL-TIME REPORTING</h4>
                   <p className="text-[9px] text-slate-500 leading-relaxed font-medium">
                     Our AI monitors for liveness and safety. Participants can flag content instantly for 24/7 human review.
                   </p>
                 </div>
              </div>

              <div className="space-y-4 pt-4">
                <button onClick={confirmSafetyAndStart} className="w-full py-6 shimmer-btn text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl border border-white/20 active:scale-95 transition-all">
                   I Agree & Go Live
                </button>
                <button onClick={() => setShowSafetyAgreement(false)} className="w-full text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-white transition-colors py-2">
                   Decline Sesh
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default LiveView;
