
import React, { useState } from 'react';
import { SeshRequest } from '../types';

interface ExtendedSeshRequest extends SeshRequest {
  senderName: string;
  senderPhoto: string;
  distance: string;
}

const CalendarView: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const slots = ['Morning', 'Afternoon', 'Evening', 'Night'];
  
  const [myAvailability, setMyAvailability] = useState<Record<string, string[]>>({
    'Fri': ['Evening', 'Night'],
    'Sat': ['Afternoon', 'Evening']
  });

  const [requests, setRequests] = useState<ExtendedSeshRequest[]>([
    {
      id: 'r1',
      senderId: 'u2',
      senderName: 'Elena',
      senderPhoto: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200',
      receiverId: 'me',
      day: 'Fri',
      slot: 'Night',
      note: 'Coffee at that queer bookstore? ☕️',
      status: 'pending',
      timestamp: Date.now(),
      distance: '3 mi'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'planner' | 'requests'>('planner');

  const toggleSlot = (day: string, slot: string) => {
    setMyAvailability(prev => {
      const currentSlots = prev[day] || [];
      if (currentSlots.includes(slot)) {
        return { ...prev, [day]: currentSlots.filter(s => s !== slot) };
      } else {
        return { ...prev, [day]: [...currentSlots, slot] };
      }
    });
  };

  return (
    <div className="space-y-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700 px-2">
      <div className="flex flex-col gap-1.5 px-3">
        <h2 className="text-4xl font-black tracking-tighter shimmer-text leading-none">Sesh Center</h2>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1 opacity-60 italic">Define your window</p>
      </div>

      <div className="flex bg-slate-900/40 p-1.5 rounded-[2.5rem] border border-white/5 mx-1 shadow-inner relative z-10 backdrop-blur-xl">
        <button 
          onClick={() => setActiveTab('planner')}
          className={`flex-1 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-500 flex items-center justify-center gap-2.5 ${
            activeTab === 'planner' ? 'bg-slate-800 text-white shadow-2xl scale-100' : 'text-slate-500 scale-95 opacity-50 hover:opacity-100'
          }`}
        >
          <i className="fa-solid fa-calendar-week"></i>
          Planner
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-500 flex items-center justify-center gap-2.5 relative ${
            activeTab === 'requests' ? 'bg-emerald-600/10 text-emerald-400 shadow-2xl scale-100' : 'text-slate-500 scale-95 opacity-50 hover:opacity-100'
          }`}
        >
          <i className="fa-solid fa-bell"></i>
          Requests
          {requests.length > 0 && (
            <span className="absolute top-3 right-8 w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_12px_#10b981]"></span>
          )}
        </button>
      </div>

      {activeTab === 'planner' ? (
        <div className="space-y-6 animate-in slide-in-from-left-6 duration-700 px-1">
          <div className="glass rounded-[4rem] p-10 border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>
            
            <h3 className="text-[10px] font-black text-slate-400 mb-10 flex items-center gap-4 uppercase tracking-[0.3em]">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-xl">
                <i className="fa-solid fa-bolt text-xs"></i>
              </div>
              Intentional Window
            </h3>
            
            <div className="grid grid-cols-8 gap-3 mb-8">
              <div className="col-span-1"></div>
              {days.map(d => (
                <div key={d} className="text-center text-[8px] font-black text-slate-500 uppercase tracking-tighter opacity-40">{d[0]}</div>
              ))}
            </div>

            <div className="space-y-6">
              {slots.map(slot => (
                <div key={slot} className="grid grid-cols-8 gap-3 items-center">
                  <div className="col-span-1 text-[7px] font-black text-slate-600 uppercase pr-1 text-right opacity-50">{slot[0]}</div>
                  {days.map(day => {
                    const isActive = myAvailability[day]?.includes(slot);
                    return (
                      <button
                        key={`${day}-${slot}`}
                        onClick={() => toggleSlot(day, slot)}
                        className={`aspect-square transition-all duration-500 relative flex items-center justify-center group/btn ${
                          isActive 
                            ? 'petal-gradient shadow-[0_12px_25px_rgba(16,185,129,0.3)] scale-110 z-10 rounded-2xl border border-white/20' 
                            : 'bg-slate-900/40 border border-white/5 hover:border-emerald-500/30 rounded-xl scale-90 hover:scale-95'
                        }`}
                      >
                        {isActive ? (
                          <div className="animate-in zoom-in duration-300">
                             <i className="fa-solid fa-heart text-[10px] text-white drop-shadow-sm"></i>
                          </div>
                        ) : (
                          <div className="w-1 h-1 rounded-full bg-slate-800 transition-colors group-hover/btn:bg-emerald-500/40"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex gap-5 p-8 bg-slate-950/40 rounded-[3.5rem] border border-white/5 items-center shadow-inner group/tip">
              <div className="w-12 h-12 rounded-[1.25rem] bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg group-hover/tip:rotate-12 transition-transform">
                <i className="fa-solid fa-sparkles text-lg"></i>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                <span className="text-emerald-400 font-black tracking-widest uppercase text-[9px]">Sesh Logic:</span> Overlap triggers a verified Sesh request instantly. ✨
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-right-6 duration-700 px-1">
           {requests.length === 0 ? (
            <div className="text-center py-32 glass rounded-[4rem] border-white/5 space-y-6">
              <div className="w-24 h-24 bg-slate-900/80 rounded-[2.5rem] flex items-center justify-center text-slate-800 mx-auto border border-white/10 shadow-inner">
                <i className="fa-solid fa-calendar-xmark text-4xl"></i>
              </div>
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">No intentions found yet</p>
            </div>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="glass rounded-[3.5rem] p-8 border border-white/10 hover:border-emerald-500/30 transition-all duration-500 shadow-2xl group active:scale-[0.98]">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-[2rem] overflow-hidden border-2 border-slate-800 shadow-2xl relative z-10">
                      <img src={req.senderPhoto} alt={req.senderName} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-[1rem] flex items-center justify-center text-white text-xs border-4 border-slate-950 shadow-xl z-20 animate-bounce">
                      <i className="fa-solid fa-heart"></i>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-black text-white text-2xl tracking-tighter flex items-center gap-2">
                      {req.senderName}
                      <i className="fa-solid fa-sparkle text-[10px] text-emerald-400 animate-pulse"></i>
                    </h4>
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">{req.day} • {req.slot}</p>
                    <p className="text-[10px] text-slate-500 font-medium tracking-wide italic">{req.distance} away from your scene</p>
                  </div>
                </div>
                
                <div className="mt-8 bg-slate-950/40 p-5 rounded-[2rem] border border-white/5 italic text-slate-300 text-xs text-center font-medium">
                  "{req.note}"
                </div>

                <div className="mt-8 flex gap-4">
                  <button className="flex-1 py-5 bg-slate-900/80 rounded-[1.75rem] text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-red-400 transition-all border border-white/5 active:scale-95">Pass</button>
                  <button className="flex-[2.5] py-5 shimmer-btn rounded-[1.75rem] text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-2xl shadow-emerald-500/20 active:scale-95">Accept Sesh</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
