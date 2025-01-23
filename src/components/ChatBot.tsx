import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [showTooltip, setShowTooltip] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');

    // Check for bunker code related questions
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('bunker code') || 
        lowerInput.includes('access the bunker') ||
        lowerInput.includes('bunker access')) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "You're clever to ask! The code to the bunker is discounts. Stay safe!",
          isUser: false
        }]);
      }, 1000);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "Thanks for your message! Our team will get back to you soon.",
          isUser: false
        }]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-8 right-8 p-4 rounded-full bg-[#00A3FF] text-black 
                   hover:bg-[#00A3FF]/90 transition-all duration-300 shadow-lg z-40
                   ${isOpen ? 'hidden' : 'animate-bounce'}`}
          aria-label="Open chat"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        {showTooltip && !isOpen && (
          <div className="fixed bottom-24 right-8 bg-black/90 text-[#0f0] px-4 py-2 rounded-lg 
                        shadow-lg z-40 text-sm max-w-[200px] animate-fade-in">
            Curious about our secrets? Just ask the assistant...
          </div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[500px] bg-black border border-[#00A3FF]/20 
                      rounded-lg shadow-2xl z-50 animate-scale-in">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-[#00A3FF]/20">
            <h3 className="text-lg font-semibold text-white">Chat Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[380px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-[#00A3FF] text-black ml-auto'
                      : 'bg-gray-800 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-4 bg-black">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 rounded-lg bg-gray-800 text-white border border-[#00A3FF]/20 
                         focus:outline-none focus:border-[#00A3FF]"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-[#00A3FF] text-black hover:bg-[#00A3FF]/90 
                         transition-colors"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}