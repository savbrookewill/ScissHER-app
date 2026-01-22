
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
      onUpdateTickets((user?.speedDatingTickets || 0) + parseInt(count));
      alert("Tickets confirmed! Check your profile for balance.");
    }
  };

  if (showSesh) {
    return (
      <div className="animate-in fade-in duration-500">
        <button onClick={() => setShowSesh(false)} className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
          <i className="fa-solid fa-arrow-left"></i> Back to Events
        </button>
        <SpeedDatingView user={user} onUpdateTickets={onUpdateTickets} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-32 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1 px-2">
        <h2 className="text-4xl font-black tracking-tighter shimmer-text">City Events</h2>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Weekly Intentional Gatherings</p>
      </div>

      {/* Ticket Balance Card */}
      <div className="mx-2 p-6 glass rounded-[2.5rem] border-white/5 flex items-center justify-between shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 petal-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-700"></div>
        <div className="space-y-1 relative z-10">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">My Sesh Balance</p>
          <p className="text-2xl font-black text-white italic">
            {user?.isPremium ? 'Unlimited ✨' : `${user?.speedDatingTickets || 0} Tickets`}
          </p>
        </div>
        <button 
          onClick={buyTickets}
          className="relative z-10 px-5 py-3 shimmer-btn text-white text-[9px] font-black uppercase tracking-widest rounded-2xl shadow-xl active:scale-95 transition-all"
        >
          {user?.isPremium ? 'Spot Secured' : 'Buy Tickets'}
        </button>
      </div>

      <div className="space-y-6">
        {MOCK_EVENTS.map(event => (
          <div key={event.id} className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group mx-2">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            
            <div className="absolute top-6 left-6 flex gap-2">
              {event.isLive && (
                <span className="bg-red-600 text-[10px] font-black px-3 py-1 rounded-full text-white uppercase tracking-wider shadow-lg animate-pulse">LIVE</span>
              )}
              <span className="bg-black/60 backdrop-blur-md text-[9px] font-black px-3 py-1 rounded-full text-white uppercase tracking-widest border border-white/10">
                {event.type}
              </span>
            </div>

            <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-pink-500 uppercase tracking-[0.2em]">{event.date} • {event.time}</p>
                <h3 className="text-2xl font-black text-white tracking-tight">{event.title}</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <i className="fa-solid fa-users mr-1"></i> {event.attendees} Attending
                </p>
              </div>
              
              <button 
                onClick={() => setShowSesh(true)}
                className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-pink-500 hover:border-pink-500 transition-all shadow-xl active:scale-90"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/50 p-8 rounded-[3rem] border border-white/5 text-center space-y-4 mx-2">
        <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 mx-auto shadow-lg border border-pink-500/10">
          <i className="fa-solid fa-calendar-circle-star text-xl"></i>
        </div>
        <h4 className="font-black text-xl tracking-tight">Host an Event</h4>
        <p className="text-xs text-slate-500 leading-relaxed font-medium px-4">
          Want to gather local lesbians for a themed mixer? <br/> Verified users can host official City Events.
        </p>
        <button className="text-[9px] font-black uppercase tracking-[0.3em] text-pink-500 hover:text-white transition-colors">Apply to Host ✨</button>
      </div>
    </div>
  );
};

export default EventsView;
