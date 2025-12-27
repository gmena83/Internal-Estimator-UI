
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { Button } from './ui/Button';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-background border-r border-border">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center px-12">
            <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <p className="text-sm font-medium">No messages yet. Start by uploading project brief or asking for a mission summary.</p>
          </div>
        )}
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-primary/10 border border-primary/20 text-slate-200' 
                : 'bg-surface border border-border text-slate-300'
            }`}>
              <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                {msg.role === 'user' ? 'You' : 'ISI Assistant'}
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface border border-border rounded-2xl p-4 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-75" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-150" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-surface/50 border-t border-border">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command or question..."
            className="w-full bg-background border border-border rounded-xl px-4 py-3 pr-12 text-sm focus:ring-1 focus:ring-primary outline-none transition-all resize-none min-h-[50px] max-h-[200px]"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg disabled:opacity-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
