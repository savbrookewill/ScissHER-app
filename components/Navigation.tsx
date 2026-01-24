
import React from 'react';
import { AppView } from '../types';
import { SeshClockIcon } from './Header';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const items = [
    { id: 'discovery', icon: 'fa-solid fa-wand-magic-sparkles', component: null, label: 'Explore' },
    { id: 'spark', icon: 'fa-solid fa-bolt-lightning', component: null, label: 'Sparks' },
    { id: 'live', icon: 'fa-solid fa-tower-broadcast', component: null, label: 'Live' },
    { id: 'calendar', icon: '', component: <SeshClockIcon className="w-5 h-5 xs:w-6 xs:h-6" />, label: 'Sesh' },
    { id: 'profile', icon: 'fa-solid fa-user', component: null, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 px-2 pt-4 pb-8 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id as AppView)}
          className={`flex flex-col items-center justify-center gap-1.5 transition-all duration-300 flex-1 ${
            currentView === item.id ? 'text-emerald-400 scale-110' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <div className="relative">
            {item.component ? (
              <div className={currentView === item.id ? 'animate-[bounce_2s_infinite]' : ''}>
                {/* Cast to any to allow the custom 'color' prop in cloneElement */}
                {React.cloneElement(item.component as React.ReactElement<any>, { color: currentView === item.id ? '#10b981' : 'currentColor' })}
              </div>
            ) : (
              <i className={`${item.icon} text-lg xs:text-xl`}></i>
            )}
            {currentView === item.id && (
              <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-30"></div>
            )}
          </div>
          <span className="text-[7px] xs:text-[9px] font-black uppercase tracking-widest">{item.label}</span>
          {currentView === item.id && (
            <div className="w-1 h-1 bg-emerald-500 rounded-full mt-0.5"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
