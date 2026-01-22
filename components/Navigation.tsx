
import React from 'react';
import { AppView } from '../types';
import { RoseIcon } from './Header';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const items = [
    { id: 'discovery', icon: 'fa-solid fa-wand-magic-sparkles', label: 'Explore' },
    { id: 'petal', icon: 'rose', label: 'Petals' },
    { id: 'live', icon: 'fa-solid fa-tower-broadcast', label: 'Live' },
    { id: 'calendar', icon: 'fa-solid fa-calendar-star', label: 'Sesh' },
    { id: 'profile', icon: 'fa-solid fa-user', label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 px-2 pt-4 pb-8 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id as AppView)}
          className={`flex flex-col items-center justify-center gap-1.5 transition-all duration-300 flex-1 ${
            currentView === item.id ? 'text-pink-500 scale-110' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <div className="relative">
            {item.icon === 'rose' ? (
              <RoseIcon className={`text-lg xs:text-xl ${currentView === 'petal' ? 'text-pink-500' : 'text-slate-500'}`} />
            ) : (
              <i className={`${item.icon} text-lg xs:text-xl`}></i>
            )}
            {currentView === item.id && (
              <div className="absolute inset-0 bg-pink-500 blur-xl opacity-30"></div>
            )}
          </div>
          <span className="text-[7px] xs:text-[9px] font-black uppercase tracking-widest">{item.label}</span>
          {currentView === item.id && (
            <div className="w-1 h-1 bg-pink-500 rounded-full mt-0.5"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
