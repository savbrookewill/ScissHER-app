
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
/* Fix: Added Gemini API import */
import { GoogleGenAI } from "@google/genai";

interface SpeedDatingViewProps {
  user: User | null;
  onUpdateTickets: (count: number) => void;
}

const SESSION_DURATION = 180; // 3 minutes in seconds

const SpeedDatingView: React.FC<SpeedDatingViewProps> = ({ user, onUpdateTickets }) => {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(SESSION_DURATION);
  const [blurAmount, setBlurAmount] = useState(40);
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          const next = prev - 1;
          setBlurAmount((40 * next) / SESSION_DURATION);
          return next;
        });
      }, 1000);
    } else if (timer === 0 && isActive) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startSession = () => {
    if (!user) return;
    
    if (!user.isPremium && user.speedDatingTickets <= 0) {
      alert("You're out of tickets! Purchase more or upgrade to Premium for unlimited access.");
      return;
    }

    if (!user.isPremium) {
      onUpdateTickets(user.speedDatingTickets - 1);
    }

    setIsActive(true);
    setTimer(SESSION_DURATION);
    setBlurAmount(40);
    setMessages([
      { sender: 'System', text: 'Connecting... You have 3 minutes of blind chat. Start with an intentional opener!' }
    ]);
  };

  /* Fix: Corrected ticket count logic and alert message */
  const buyTickets = () => {
    const count = prompt("How many tickets would you like to purchase? (Max 5)", "3");
    if (count && parseInt(count) > 0) {
      const addedCount = Math.min(parseInt(count), 5);
      const newTotal = (user?.speedDatingTickets || 0) + addedCount;
      onUpdateTickets(newTotal);
      alert(`Success! You now have ${newTotal} tickets.`);
    }
  };

  /* Fix: Implemented dynamic responses using Gemini API */
  const handleSend = async () => {
    if (!inputText.trim()) return;
    const currentInput = inputText;
    setMessages(prev => [...prev, { sender: 'You', text: currentInput }]);
    setInputText('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const history = messages
        .filter(m => m.sender !== 'System')
        .map(m => `${m.sender}: ${m.text}`)
        .join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are participating in a roleplay as a mystery person on ScissHER, a queer dating app for women.
        You are in a 3-minute "Blind Sesh" chat where users can't see each other yet. 
        Be intentional, mysterious, and engaging. Avoid generic AI phrasing.
        Current chat history:
        ${history}
        New message from potential match: "${currentInput}"
        Respond as the Mystery Girl. Keep the response short, under 20 words.`,
      });
      
      const reply = response.text || "That's intriguing... what else is on your mind?";
      setMessages(prev => [...prev, { sender: 'Mystery Girl', text: reply }]);
    } catch (error) {
      console.error("Gemini Sesh Error:", error);
      // Fallback to local mock replies if API fails
      setTimeout(() => {
        const replies = [
          "I love that! What brings you here tonight?",
          "Interesting vibe... tell me more.",
          "Haha, you caught my attention with that one!",
          "Let's skip the small talk—what's your intention this weekend?"
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        setMessages(prev => [...prev, { sender: 'Mystery Girl', text: randomReply }]);
      }, 1000);
    }
  };

  const handleDecision = (type: 'cut' | 'flower') => {
    if (type === 'flower') {
      alert("It's a Full Bloom! Match saved to your garden. ✨🌸");
    } else {
      alert("Cut! Keep exploring with intention. ✂️");
    }
    setTimer(SESSION_DURATION);
    setIsActive(false);
    setMessages([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isActive && messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[75vh] text-center px-6 space-y-8 animate-in zoom-in duration-500">
        <div className="relative">
          <div className="w-32 h-32 rounded-[2.5rem] glass flex items-center justify-center border-2 border-pink-500/20 shadow-[0_0_40px_rgba(255,0,128,0.2)]">
            <i className="fa-solid fa-mask text-5xl text-pink-500 animate-bounce"></i>
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full petal-gradient flex items-center justify-center text-white border-4 border-slate-950 animate-pulse">
            <i className="fa-solid fa-bolt text-lg"></i>
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tighter shimmer-text">Blind Sesh</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto font-medium">
            Virtual dates start blind and unblur as you chat. 
            <span className="text-pink-400 font-bold block mt-2 uppercase tracking-widest text-[10px]">3 Minutes to find the spark</span>
          </p>
        </div>

        <div className="w-full space-y-4">
          <button 
            onClick={startSession}
            className="w-full max-w-[240px] py-5 shimmer-btn text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-pink-500/20 active:scale-95 transition-all group border border-white/10 mx-auto block"
          >
            <span className="group-hover:tracking-[0.3em] transition-all">Enter Sesh</span>
          </button>

          <div className="glass p-4 rounded-3xl border-white/10 max-w-[240px] mx-auto">
            {user?.isPremium ? (
              <div className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-crown text-yellow-500"></i>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Unlimited Premium Access</span>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                  Tickets: <span className="text-pink-500">{user?.speedDatingTickets} Remaining</span>
                </p>
                <button 
                  onClick={buyTickets}
                  className="text-[9px] font-black text-pink-400 uppercase tracking-widest hover:text-white transition-colors"
                >
                  Purchase Tickets 🎟️
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">
           Next event: Tonight @ 8PM local
        </p>
      </div>
    );
  }

  if (timer === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[75vh] text-center space-y-10 animate-in zoom-in duration-500 px-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-pink-500/30 blur-[60px] rounded-full group-hover:bg-pink-500/50 transition-all"></div>
          <div className="w-48 h-48 rounded-[4rem] overflow-hidden border-4 border-pink-500 shadow-[0_0_40px_#ff008055] rotate-3 relative z-10 transition-transform hover:rotate-0 duration-500">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 shimmer-btn rounded-[1.5rem] flex items-center justify-center text-white border-4 border-slate-950 z-20 shadow-xl">
             <i className="fa-solid fa-sparkles text-2xl animate-spin-slow"></i>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tight text-white">Profile Revealed</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">Intentional connection found?</p>
        </div>

        <div className="flex gap-5 w-full max-w-xs mx-auto">
          <button 
            onClick={() => handleDecision('cut')}
            className="flex-1 flex flex-col items-center justify-center gap-2 py-6 bg-slate-900 border border-white/10 rounded-[2.5rem] font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-white hover:border-slate-400 transition-all group"
          >
            <i className="fa-solid fa-scissors text-3xl group-hover:rotate-12 transition-transform"></i>
            Cut
          </button>
          <button 
            onClick={() => handleDecision('flower')}
            className="flex-1 flex flex-col items-center justify-center gap-2 py-6 shimmer-btn rounded-[2.5rem] font-black text-[10px] uppercase tracking-widest text-white shadow-2xl shadow-pink-500/20 active:scale-95 transition-all group"
          >
            <i className="fa-solid fa-heart text-3xl group-active:scale-125 transition-transform"></i>
            Send Petal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[78vh] space-y-4 animate-in fade-in duration-300">
      <div className="relative aspect-[4/5] w-full rounded-[3.5rem] overflow-hidden border-2 border-white/5 shadow-2xl bg-slate-900 group">
        <img 
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60" 
          alt="Mystery Sesh" 
          className="w-full h-full object-cover transition-[filter] duration-1000 ease-linear"
          style={{ filter: `blur(${blurAmount}px)` }}
        />
        
        <div className="absolute inset-x-0 top-0 p-8 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest drop-shadow-md">Session Time</span>
            <div className="text-4xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,0,1)]">
              {formatTime(timer)}
            </div>
          </div>
          
          <div className="w-16 h-16 relative flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="32" cy="32" r="28" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
              <circle 
                cx="32" cy="32" r="28" fill="transparent" stroke="url(#timerGradient)" strokeWidth="4" 
                strokeDasharray="175.9" strokeDashoffset={175.9 - (175.9 * timer) / SESSION_DURATION} strokeLinecap="round" className="transition-all duration-1000 ease-linear"
              />
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff0080" />
                  <stop offset="100%" stopColor="#7928ca" />
                </linearGradient>
              </defs>
            </svg>
            <i className="fa-solid fa-mask text-white/20 text-xl"></i>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
           <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-lg">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
             <span className="text-[9px] font-black uppercase tracking-widest text-white/90">Mystery Sesh • Local</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 p-5 scroll-smooth glass rounded-[2.5rem] border-white/5 relative min-h-[140px]">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 px-2">{m.sender}</span>
            <div className={`px-5 py-3 rounded-[1.8rem] text-sm max-w-[85%] leading-relaxed ${
              m.sender === 'You' ? 'bg-pink-600 text-white rounded-tr-none shadow-lg' : 
              m.sender === 'System' ? 'bg-slate-800/40 italic text-slate-400 w-full text-center text-[10px] border border-white/5' :
              'bg-slate-900 border border-white/5 text-slate-200 rounded-tl-none shadow-lg'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <div className="flex-1 relative group">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Interacting with intention..."
            className="w-full bg-slate-900/80 border border-white/10 rounded-full px-8 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/30 text-white shadow-2xl backdrop-blur-md relative z-10"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
        </div>
        <button 
          onClick={handleSend}
          disabled={!inputText.trim()}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all relative z-10 ${
            inputText.trim() ? 'shimmer-btn' : 'bg-slate-800 text-slate-600'
          }`}
        >
          <i className="fa-solid fa-paper-plane text-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default SpeedDatingView;
