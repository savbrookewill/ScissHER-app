
import React, { useState } from 'react';
import { SeshRequest } from '../types';

interface ExtendedSeshRequest extends SeshRequest {
  senderName: string;
  senderPhoto: string;
  distance: string;
}

const CalendarView: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const slots = ['Morning', 'Afternoon', 'Evening', 'Late Night'];
  
  const [myAvailability, setMyAvailability] = useState<Record<string, string[]>>({
    'Fri': ['Evening', 'Late Night'],
    'Sat': ['Afternoon', 'Evening', 'Late Night']
  });

  const [requests, setRequests] = useState<ExtendedSeshRequest[]>([
    {
      id: 'r1',
      senderId: 'u2',
      senderName: 'Elena',
      senderPhoto: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200',
      receiverId: 'me',
      day: 'Fri',
      slot: 'Late Night',
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

  const handleRequest = (id: string, action: 'accept' | 'decline') => {
    if (action === 'accept') {
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
      setTimeout(() => {
        setRequests(prev => prev.filter(r => r.id !== id));
        alert("Sesh Confirmed! It's on the calendar. ✨");
      }, 600);
    } else {
      setRequests(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-32 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1 px-2">
        <h2 className="text-4xl font-black tracking-tighter shimmer-text">Sesh Center</h2>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Define your available windows</p>
      </div>

      <div className="flex bg-slate-900/50 p-1.5 rounded-[2.5rem] border border-white/5 mx-2 shadow-inner relative z-10">
        <button 
          onClick={() => setActiveTab('planner')}
          className={`flex-1 py-3.5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            activeTab === 'planner' ? 'bg-slate-800 text-white shadow-xl' : 'text-slate-500'
          }`}
        >
          <i className="fa-solid fa-calendar-week"></i>
          My Planner
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-3.5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 relative ${
            activeTab === 'requests' ? 'bg-pink-600/20 text-pink-400' : 'text-slate-500'
          }`}
        >
          <i className="fa-solid fa-bell"></i>
          Requests
          {requests.length > 0 && (
            <span className="absolute top-2.5 right-6 w-2 h-2 bg-pink-500 rounded-full animate-pulse shadow-[0_0_8px_#ff0080]"></span>
          )}
        </button>
      </div>

      {activeTab === 'planner' ? (
        <div className="space-y-6 animate-in slide-in-from-left-4 duration-500 px-2">
          <div className="glass rounded-[3rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <i className="fa-solid fa-sparkles text-8xl text-pink-500"></i>
            </div>
            
            <h3 className="text-[10px] font-black text-slate-400 mb-8 flex items-center gap-3 uppercase tracking-widest">
              <div className="w-9 h-9 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20 shadow-lg">
                <i className="fa-solid fa-heart-pulse"></i>
              </div>
              Tap to set your "Intention" window
            </h3>
            
            <div className="grid grid-cols-8 gap-2 mb-6">
              <div className="col-span-1"></div>
              {days.map(d => (
                <div key={d} className="text-center text-[9px] font-black text-slate-500 uppercase tracking-tighter">{d}</div>
              ))}
            </div>

            {slots.map(slot => (
              <div key={slot} className="grid grid-cols-8 gap-2 mb-4 items-center">
                <div className="col-span-1 text-[7px] font-black text-slate-600 leading-none uppercase pr-1 text-right">{slot}</div>
                {days.map(day => {
                  const isActive = myAvailability[day]?.includes(slot);
                  return (
                    <button
                      key={`${day}-${slot}`}
                      onClick={() => toggleSlot(day, slot)}
                      className={`aspect-square transition-all duration-500 relative flex items-center justify-center ${
                        isActive 
                          ? 'petal-gradient shadow-[0_0_20px_rgba(255,0,128,0.4)] scale-110 z-10 rounded-2xl' 
                          : 'bg-slate-900/30 border border-white/5 hover:border-pink-500/20 rounded-xl scale-90'
                      }`}
                    >
                      {isActive ? (
                        <div className="animate-in zoom-in duration-300">
                           <i className="fa-solid fa-heart text-[10px] text-white"></i>
                        </div>
                      ) : (
                        <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
            
            <div className="mt-10 flex gap-4 p-6 bg-slate-950/60 rounded-[2.5rem] border border-white/5 items-start shadow-inner">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-500 shrink-0 shadow-lg">
                <i className="fa-solid fa-wand-magic-sparkles text-sm"></i>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                <span className="text-pink-400 font-black">PRO TIP:</span> Overlapping intention windows trigger instant Sesh Request opportunities. ✨
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-500 px-2">
           {requests.length === 0 ? (
            <div className="text-center py-24 glass rounded-[3rem] border-white/5 space-y-4">
              <div className="w-20 h-20 bg-slate-900/50 rounded-3xl flex items-center justify-center text-slate-800 mx-auto border border-white/5">
                <i className="fa-solid fa-calendar-xmark text-3xl"></i>
              </div>
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">No active requests found</p>
            </div>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="glass rounded-[3rem] p-7 border border-white/5 hover:border-pink-500/20 transition-all shadow-xl group">
                <div className="flex items-center gap-5">
                  <div className="w-18 h-18 rounded-[1.5rem] overflow-hidden border-2 border-slate-800 shadow-xl relative">
                    <img src={req.senderPhoto} alt={req.senderName} className="w-full h-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-pink-600 rounded-lg flex items-center justify-center text-white text-[10px] border-2 border-slate-950 shadow-lg">
                      <i className="fa-solid fa-heart animate-pulse"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-white text-xl flex items-center gap-2">
                      {req.senderName}
                      <i className="fa-solid fa-sparkle text-[8px] text-pink-500"></i>
                    </h4>
                    <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest">{req.day} • {req.slot}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{req.distance} away</p>
                  </div>
                </div>
                <div className="mt-8 flex gap-3">
                  <button onClick={() => handleRequest(req.id, 'decline')} className="flex-1 py-4 bg-slate-900/80 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20">Cut Out</button>
                  <button onClick={() => handleRequest(req.id, 'accept')} className="flex-[2] py-4 shimmer-btn rounded-2xl text-[9px] font-black uppercase tracking-[0.25em] text-white shadow-xl border border-white/10 active:scale-95">Accept Sesh</button>
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
