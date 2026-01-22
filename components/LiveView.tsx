
import React from 'react';

const LiveView: React.FC = () => {
  const streams = [
    { id: 1, host: 'Zara', viewers: '1.2k', location: 'Bushwick', title: 'Late night chill & chat - Join local!', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60' },
    { id: 2, host: 'Luna', viewers: '850', location: 'Upper West Side', title: 'Q&A about local queer nightlife', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60' },
    { id: 3, host: 'Sky', viewers: '2.4k', location: 'West Village', title: 'Getting ready for the party tonight!', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col">
          <h2 className="text-3xl font-black tracking-tighter shimmer-text leading-none">Local Live</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">BROADCASTING TO YOUR CITY</p>
        </div>
        <button className="w-14 h-14 shimmer-btn rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-pink-500/20 active:scale-90 transition-all border border-white/10">
          <i className="fa-solid fa-tower-broadcast text-xl"></i>
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 flex items-center gap-3">
          <div className="flex gap-1 items-center bg-red-500/10 px-2 py-1 rounded-full border border-red-500/20">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-red-500">Active Locally</span>
          </div>
          Nearby Happenings
        </h3>
        
        <div className="flex gap-5 overflow-x-auto pb-6 snap-x no-scrollbar px-2">
          {streams.map(stream => (
            <div key={stream.id} className="min-w-[280px] aspect-[9/16] rounded-[3rem] bg-slate-900 overflow-hidden relative snap-center border border-white/5 shadow-2xl group">
              <img src={stream.img} alt={stream.host} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="bg-red-600 text-[10px] font-black px-3 py-1 rounded-full text-white uppercase tracking-wider shadow-lg">LIVE</span>
                  <span className="bg-black/60 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full text-white flex items-center gap-1.5 border border-white/10">
                    <i className="fa-solid fa-eye text-[10px]"></i> {stream.viewers}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-pink-600/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-pink-400 border border-pink-500/20">
                  <i className="fa-solid fa-location-dot"></i>
                  {stream.location}
                </div>
              </div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl border-2 border-pink-500 overflow-hidden shadow-xl">
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

              {/* Interaction Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                 <button className="px-8 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
                    Tune In
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Broadcast CTA */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2.5rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/10 blur-[60px] rounded-full group-hover:bg-pink-500/20 transition-all duration-700"></div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 border border-pink-500/20">
                <i className="fa-solid fa-video text-xl"></i>
             </div>
             <h3 className="font-black text-2xl tracking-tight">Host for your City</h3>
          </div>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Go live and interact with <span className="text-white font-black italic">everyone local</span> in real-time. Boost your visibility across the entire community and make intentional connections beyond your match list!
          </p>
          <div className="pt-2">
            <button className="w-full py-5 shimmer-btn text-white rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3">
              <i className="fa-solid fa-tower-broadcast"></i>
              Start Your Local Sesh
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 pt-2 opacity-40 grayscale group-hover:grayscale-0 transition-all">
             <i className="fa-solid fa-microphone text-xs"></i>
             <i className="fa-solid fa-camera text-xs"></i>
             <i className="fa-solid fa-shield-halved text-xs"></i>
             <span className="text-[8px] font-black uppercase tracking-widest">Secure Broadcast Verified</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-10">
        <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em] leading-relaxed">
          Broadcasting adheres to <span className="text-slate-500">ScissHER community standards</span><br/>
          and local safety guidelines.
        </p>
      </div>
    </div>
  );
};

export default LiveView;
