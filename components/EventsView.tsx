
import React, { useState } from 'react';
import { User, DatingEvent } from '../types';
import SpeedDatingView from './SpeedDatingView';

interface EventsViewProps {
  user: User | null;
  onUpdateTickets: (count: number) => void;
}

const MOCK_EVENTS: DatingEvent[] = [
  { id: 'e1', title: 'Late Night Blind Sesh', type: 'Blind Date', date: 'Tonight', time: '8:00 PM', attendees: 124, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', isLive: true },
  { id: 'e2', title: 'Speed Dating: Artists Edition', type: 'Speed Dating', date: 'Saturday', time: '7:00 PM', attendees: 56, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80' },
  { id: 'e3', title: 'Intentional Mix & Mingle', type: 'Mixer', date: 'Sunday', time: '4:00 PM', attendees: 89, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80' },
];

const EventsView: React.FC<EventsViewProps> = ({ user, onUpdateTickets }) => {
  const [showSesh, setShowSesh] = useState(false);

  const buyTickets = () => {
    const count = prompt("Purchase tickets for the next intentional event? Each ticket grants 1 Blind Sesh entry.", "3");
    if (count && parseInt(count) > 0) {
      const added = parseInt(count);
      onUpdateTickets((user?.speedDatingTickets || 0) + added);
      alert(`Successfully added ${added} Sesh tickets to your account. ✨`);
    }
  };

  if (showSesh) {
    return (
      <div className="animate-in fade-in duration-500">
        <button onClick={() => setShowSesh(false)} className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 group">
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> Back to Events
        </button>
        <SpeedDatingView user={user} onUpdateTickets={onUpdateTickets} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-32 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1 px-2">
        <h2 className="text-4xl font-black tracking-tighter shimmer-text italic">City Events</h2>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Weekly Intentional Gatherings</p>
      </div>

      {/* Ticket Balance Card */}
      <div className="mx-2 p-8 glass rounded-[3rem] border-white/10 flex items-center justify-between shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 petal-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-1000"></div>
        <div className="space-y-1 relative z-10">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Sesh Balance</p>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-black text-white italic tracking-tighter">
              {user?.isPremium ? 'Unlimited ✨' : `${user?.speedDatingTickets || 0}`}
            </p>
            {!user?.isPremium && <i className="fa-solid fa-ticket text-pink-500 rotate-12"></i>}
          </div>
        </div>
        <button 
          onClick={buyTickets}
          className="relative z-10 px-6 py-4 shimmer-btn text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl active:scale-95 transition-all border border-white/20"
        >
          {user?.isPremium ? 'Spot Secured' : 'Top Up'}
        </button>
      </div>

      <div className="space-y-6">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-4">Scheduled for You</h3>
        {MOCK_EVENTS.map(event => (
          <div key={event.id} className="relative aspect-[16/11] rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl group mx-2 bg-slate-900">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            
            <div className="absolute top-8 left-8 flex gap-2">
              {event.isLive && (
                <div className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full shadow-xl animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">LIVE NOW</span>
                </div>
              )}
              <span className="bg-white/10 backdrop-blur-md text-[9px] font-black px-4 py-2 rounded-full text-white uppercase tracking-widest border border-white/10">
                {event.type}
              </span>
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-pink-500 uppercase tracking-[0.2em]">{event.date} • {event.time}</p>
                <h3 className="text-3xl font-black text-white tracking-tighter leading-none mb-2">{event.title}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                     {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full border border-slate-900 bg-slate-700"></div>)}
                  </div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {event.attendees}+ In Queue
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowSesh(true)}
                className="w-16 h-16 shimmer-btn rounded-[2rem] flex items-center justify-center text-white border-2 border-white/20 hover:scale-110 transition-all shadow-2xl active:scale-90"
              >
                <i className="fa-solid fa-bolt-lightning text-xl"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/40 p-10 rounded-[4rem] border border-white/5 text-center space-y-5 mx-2 relative overflow-hidden group">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/10 blur-[60px] rounded-full group-hover:bg-pink-500/20 transition-all"></div>
        <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 mx-auto shadow-2xl border border-pink-500/20 rotate-6 group-hover:rotate-0 transition-transform">
          <i className="fa-solid fa-microphone-lines text-2xl"></i>
        </div>
        <h4 className="font-black text-2xl tracking-tighter text-white italic">Host a Sesh</h4>
        <p className="text-xs text-slate-500 leading-relaxed font-medium px-6">
          Verified creators can host themed Blind Sessions. Curate the vibe for your community and connect with intention.
        </p>
        <button className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500 hover:text-white transition-all">Apply to Host ✨</button>
      </div>
    </div>
  );
};

export default EventsView;
