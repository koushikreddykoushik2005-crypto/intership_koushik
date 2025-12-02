import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { chatWithAI } from '../services/geminiService';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hi! I\'m FreshGen AI. Ask me about products, recipes, or nutrition!', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Build minimal context from chat history
    const context = messages.slice(-5).map(m => `${m.role}: ${m.text}`).join('\n');
    
    const responseText = await chatWithAI(userMsg.text, context);
    
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px] transition-all transform origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <div>
                <h3 className="font-bold text-sm">FreshGen Assistant</h3>
                <span className="flex items-center text-xs text-emerald-100">
                  <span className="w-2 h-2 bg-emerald-200 rounded-full mr-1 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  <ReactMarkdown className={msg.role === 'user' ? '' : 'prose prose-sm prose-emerald'}>
                    {msg.text}
                  </ReactMarkdown>
                  <div className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-emerald-100' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about products or recipes..."
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button 
                onClick={handleSend}
                disabled={!inputText.trim() || isTyping}
                className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'hidden' : 'flex'} h-14 w-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg items-center justify-center transition-transform hover:scale-105 active:scale-95`}
      >
        <MessageCircle className="h-8 w-8" />
      </button>
    </div>
  );
};
