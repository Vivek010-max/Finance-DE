import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Command, Info } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  isActionable?: boolean;
}

export const AICoPilotChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Analysis complete. I noticed ₹2,00,000 idle in your savings. Moving this to an Arbitrage Fund could capture ~7% yield.',
      time: '09:41 AM',
      isActionable: true
    }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsTyping(false);
    // ... logic for AI response
  };

  return (
    <aside className="w-full h-full bg-panel border-l border-stroke-subtle hidden xl:flex flex-col animate-reveal">
      {/* 1. HEADER: Integrated & Subtle */}
      <div className="p-4 border-b border-stroke-subtle flex items-center justify-between bg-black/2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black/6 border border-stroke-medium flex items-center justify-center text-(--text-primary)">
            <Sparkles size={14} />
          </div>
          <div>
            <h3 className="text-[11px] font-bold text-(--text-primary) uppercase tracking-widest">OnlyFinance IQ</h3>
            <p className="text-[10px] text-(--text-secondary) font-medium">Neural Engine Active</p>
          </div>
        </div>
        <div className="px-2 py-1 rounded bg-black/3 border border-stroke-medium text-[9px] font-bold text-(--text-tertiary) uppercase tracking-tighter">
          v4.2-Pro
        </div>
      </div>

      {/* 2. CHAT AREA: Professional Density */}
      <div ref={scrollRef} className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-hide">
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'ai' ? 'items-start' : 'items-end'} gap-2`}>
            {/* AI Avatar Indicator */}
            {msg.sender === 'ai' && (
               <span className="text-[9px] font-bold text-(--text-tertiary) uppercase tracking-widest ml-1">Assistant</span>
            )}
            
            <div className={`group relative max-w-[90%] p-3.5 text-[12px] leading-[1.6] transition-all ${
              msg.sender === 'ai' 
                ? 'bg-card border border-stroke-subtle rounded-2xl rounded-tl-none text-(--text-secondary)' 
                : 'bg-black text-white font-semibold rounded-2xl rounded-tr-none shadow-lg shadow-black/30'
            }`}>
              {msg.text}
              
              {/* Contextual Action (Embedded) */}
              {msg.isActionable && (
                <button className="mt-3 w-full py-2 bg-black/3 border border-stroke-medium rounded-lg text-[10px] font-bold text-(--text-primary) hover:bg-black/8 transition-colors flex items-center justify-center gap-2">
                   Execute Optimization <Command size={10} />
                </button>
              )}
            </div>
            <p className="text-[9px] text-(--text-tertiary) font-mono">{msg.time}</p>
          </div>
        ))}
        
        {isTyping && (
           <div className="flex gap-1.5 p-3 bg-card w-12 rounded-full border border-stroke-subtle items-center justify-center">
             <div className="w-1 h-1 bg-black/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
             <div className="w-1 h-1 bg-black/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
             <div className="w-1 h-1 bg-black/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
           </div>
        )}
      </div>

      {/* 3. INPUT AREA: High-Density Commands */}
      <div className="p-4 bg-black/2 border-t border-stroke-subtle">
        <div className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Search commands or ask IQ..."
            className="w-full bg-card-elevated border border-stroke-medium rounded-xl py-3 pl-4 pr-12 text-[12px] text-(--text-primary) placeholder-(--text-tertiary) focus:outline-none focus:border-black/25 focus:ring-1 focus:ring-black/8 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <kbd className="hidden group-focus-within:block text-[9px] font-mono text-(--text-tertiary) border border-stroke-medium px-1.5 py-0.5 rounded">Enter</kbd>
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="text-(--text-tertiary) hover:text-(--text-primary) transition-colors disabled:opacity-0"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-1.5 opacity-40">
           <Info size={10} />
           <span className="text-[10px] font-medium tracking-tight text-(--text-tertiary)">System uses Llama-3-OnlyFinance-Financial</span>
        </div>
      </div>
    </aside>
  );
};