
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 px-4 pt-4 pb-10 flex justify-between items-center shadow-[0_-20px_50px_rgba(0,0,0,0.6)] rounded-t-[3.5rem]">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id as AppView)}
          className={`flex flex-col items-center justify-center gap-1.5 transition-all duration-500 flex-1 relative ${
            currentView === item.id ? 'text-emerald-400 scale-110 -translate-y-2' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          {currentView === item.id && (
            <div className="absolute -inset-x-2 -inset-y-3 bg-emerald-500/10 blur-2xl rounded-full animate-pulse"></div>
          )}
          
          <div className="relative z-10 transition-transform duration-500 active:scale-75">
            {item.component ? (
              <div className={currentView === item.id ? 'animate-bounce' : ''}>
                {React.cloneElement(item.component as React.ReactElement<any>, { 
                  color: currentView === item.id ? '#10b981' : 'currentColor',
                  className: `${(item.component as any).props.className} transition-colors duration-300`
                })}
              </div>
            ) : (
              <i className={`${item.icon} text-xl xs:text-2xl transition-colors duration-300`}></i>
            )}
          </div>
          
          <span className={`text-[8px] xs:text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${currentView === item.id ? 'opacity-100' : 'opacity-40'}`}>
            {item.label}
          </span>
          
          {currentView === item.id && (
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-0.5 shadow-[0_0_10px_#10b981] animate-pulse"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
