
import React, { useState } from 'react';
import { User, AvailabilitySlot } from '../types';

interface SeshRequestModalProps {
  user: User;
  onClose: () => void;
  onSubmit: (day: string, slot: string, note: string) => void;
}

const SeshRequestModal: React.FC<SeshRequestModalProps> = ({ user, onClose, onSubmit }) => {
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [note, setNote] = useState('');

  const handleSend = () => {
    if (selectedDay && selectedSlot) {
      onSubmit(selectedDay, selectedSlot, note);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-slate-900 rounded-[2.5rem] p-6 shadow-2xl border border-white/10 animate-in slide-in-from-bottom-full duration-500">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl petal-gradient flex items-center justify-center text-white border border-white/20">
              <i className="fa-solid fa-scissors"></i>
            </div>
            <div>
              <h3 className="text-xl font-black">scissHER Sesh</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Request with {user.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">HER AVAILABILITY</h4>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {user.availability.map((avail) => (
                <button
                  key={avail.day}
                  onClick={() => {
                    setSelectedDay(avail.day);
                    setSelectedSlot('');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    selectedDay === avail.day 
                      ? 'bg-pink-600 border-pink-500 text-white shadow-lg' 
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {avail.day}
                </button>
              ))}
            </div>
          </div>

          {selectedDay && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">SELECT A SLOT</h4>
              <div className="grid grid-cols-2 gap-2">
                {user.availability.find(a => a.day === selectedDay)?.slots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                      selectedSlot === slot 
                        ? 'bg-purple-600 border-purple-500 text-white shadow-lg' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">A LIL NOTE (OPTIONAL)</h4>
            <textarea
              placeholder="E.g. Coffee at that queer bookstore? ☕️"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/30 text-slate-200"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!selectedDay || !selectedSlot}
            className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${
              selectedDay && selectedSlot
                ? 'petal-gradient text-white shadow-xl shadow-pink-500/20 active:scale-95'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            Send Sesh Request <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeshRequestModal;
