
import React, { useState, useRef, useEffect } from 'react';
import { getSmartResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bem-vindo à Experiência Digital Ótica Cdo. Sou seu consultor de visão 24/7. Como posso otimizar seu atendimento hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    const aiResponse = await getSmartResponse(messages, userMsg);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      {isOpen ? (
        <div className="glass w-[350px] md:w-[420px] h-[600px] rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-20 border border-white/10">
          <div className="bg-brand-blue/80 p-8 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center shadow-xl">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg">Cdo Concierge</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse"></span>
                  <p className="text-[9px] text-white/40 font-black uppercase tracking-widest">Neural Logic Active</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/30 hover:text-white transition-colors p-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-deep-navy/95">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-[24px] text-[13px] leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-brand-blue text-white rounded-br-none border border-white/10' 
                  : 'bg-white/5 text-white/80 rounded-bl-none border border-white/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-deep-navy border-t border-white/5">
            <div className="relative flex items-center">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ex: Diferença entre Varilux e Zeiss..."
                className="w-full pl-6 pr-12 py-4 bg-white/5 rounded-2xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-orange transition-all border border-white/10"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-3 p-2 text-brand-orange hover:scale-110 disabled:opacity-50 transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-brand-orange text-white p-6 rounded-[32px] shadow-[0_15px_50px_rgba(255,107,0,0.4)] hover:scale-105 transition-all flex items-center gap-4 group active:scale-95"
        >
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-80">Online</span>
            <span className="font-display font-bold text-lg leading-none">AI MASTER</span>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
             <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </div>
        </button>
      )}
    </div>
  );
};

export default Assistant;
