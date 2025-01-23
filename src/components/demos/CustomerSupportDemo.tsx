import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, MessageSquare, Send, User, Bot, Brain, Zap, Shield, 
  AlertTriangle, Check, Clock, RefreshCw, Download
} from 'lucide-react';
import TypewriterText from '../TypewriterText';
import GlitchText from '../GlitchText';

interface CustomerSupportDemoProps {
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  isTyping?: boolean;
}

export default function CustomerSupportDemo({ onClose }: CustomerSupportDemoProps) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: "Hi! I'm your AI support assistant. How can I help you today?", 
      isUser: false, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (messages.length === 1) {
      inputRef.current?.focus();
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > 1) {
      setShowMetrics(true);
    }
  }, [messages.length]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses: { [key: string]: string } = {
      default: "I understand your question. Let me help you with that. Could you please provide more details?",
      pricing: "Our pricing plans start at $49/month for the basic package. Would you like me to break down the features included in each plan?",
      features: "Our platform includes AI-powered automation, real-time analytics, and 24/7 support. Which specific feature would you like to know more about?",
      help: "I'm here to help! Could you please describe what you're looking to achieve?",
      problem: "I'm sorry you're experiencing issues. Let's solve this together. Could you describe what's happening in more detail?",
      thank: "You're welcome! Is there anything else I can help you with?",
      hello: "Hello! How can I assist you today?",
    };

    const message = userMessage.toLowerCase();
    let response = responses.default;

    if (message.includes('price') || message.includes('cost')) {
      response = responses.pricing;
    } else if (message.includes('feature') || message.includes('what')) {
      response = responses.features;
    } else if (message.includes('help') || message.includes('support')) {
      response = responses.help;
    } else if (message.includes('problem') || message.includes('issue')) {
      response = responses.problem;
    } else if (message.includes('thank')) {
      response = responses.thank;
    } else if (message.includes('hi') || message.includes('hello')) {
      response = responses.hello;
    }

    return response;
  };

  const handleSendMessage = async () => {
    if (!input.trim() || thinking) return;
    
    const userMessage = input.trim();
    const messageId = Date.now().toString();
    setInput('');
    setThinking(true);

    // Add user message
    setMessages(prev => [...prev, {
      id: messageId,
      text: userMessage,
      isUser: true,
      timestamp: new Date(),
      status: 'sending'
    }]);

    try {
      // Add typing indicator
      setMessages(prev => [...prev, {
        id: 'typing',
        text: '',
        isUser: false,
        timestamp: new Date(),
        isTyping: true
      }]);

      // Generate AI response
      const response = await generateResponse(userMessage);

      // Remove typing indicator and add response
      setMessages(prev => prev
        .filter(m => m.id !== 'typing')
        .map(m => m.id === messageId ? { ...m, status: 'sent' as const } : m)
      );

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      }]);

      // Create success sound
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, context.currentTime);
      gainNode.gain.setValueAtTime(0.1, context.currentTime);
      
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.1);
      
      setTimeout(() => oscillator.stop(), 100);
    } catch (error) {
      setMessages(prev => prev
        .filter(m => m.id !== 'typing')
        .map(m => m.id === messageId ? { ...m, status: 'error' as const } : m)
      );
    } finally {
      setThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const exportChat = () => {
    const chatLog = messages
      .filter(m => !m.isTyping)
      .map(m => `[${m.timestamp.toLocaleTimeString()}] ${m.isUser ? 'User' : 'AI'}: ${m.text}`)
      .join('\n');

    const blob = new Blob([chatLog], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-log.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-black border border-[#0f0]/20 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#0f0]/20">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-[#0f0]" />
            <div>
              <h2 className="text-2xl font-bold text-[#0f0]">AI Support Assistant</h2>
              <p className="text-[#0f0]/60 text-sm">Experience next-gen customer support</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={exportChat}
              className="text-[#0f0]/60 hover:text-[#0f0] transition-colors"
              title="Export Chat"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="text-[#0f0]/60 hover:text-[#0f0] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Chat */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 flex items-start gap-3
                                ${message.isUser 
                                  ? 'bg-[#0f0]/20 ml-auto' 
                                  : 'bg-black/40 border border-[#0f0]/20'
                                }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                    ${message.isUser ? 'bg-[#0f0]/20' : 'bg-[#0f0]/10'}`}>
                        {message.isUser ? (
                          <User className="w-5 h-5 text-[#0f0]" />
                        ) : (
                          <Bot className="w-5 h-5 text-[#0f0]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        {message.isTyping ? (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-[#0f0]/60 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-[#0f0]/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-[#0f0]/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        ) : (
                          <>
                            <div className="text-[#0f0] break-words">{message.text}</div>
                            <div className="mt-1 text-xs text-[#0f0]/40 flex items-center gap-2">
                              {message.timestamp.toLocaleTimeString()}
                              {message.isUser && message.status && (
                                <>
                                  {message.status === 'sending' && (
                                    <RefreshCw className="w-3 h-3 animate-spin" />
                                  )}
                                  {message.status === 'sent' && (
                                    <Check className="w-3 h-3" />
                                  )}
                                  {message.status === 'error' && (
                                    <AlertTriangle className="w-3 h-3 text-red-500" />
                                  )}
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#0f0]/20 bg-black/40">
              <div className="flex gap-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-black/40 border border-[#0f0]/20 rounded-lg px-4 py-2
                           text-[#0f0] placeholder-[#0f0]/40 focus:outline-none focus:border-[#0f0]"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || thinking}
                  className="bg-[#0f0] text-black px-4 py-2 rounded-lg font-medium
                           hover:bg-[#0f0]/90 transition-colors disabled:opacity-50
                           disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {thinking ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Sidebar */}
          <AnimatePresence>
            {showMetrics && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="border-l border-[#0f0]/20 bg-black/40 overflow-hidden"
              >
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#0f0] mb-4">Conversation Metrics</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-black/40 border border-[#0f0]/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-[#0f0]" />
                          <span className="text-sm text-[#0f0]/60">Response Time</span>
                        </div>
                        <div className="text-2xl font-bold text-[#0f0]">0.8s</div>
                      </div>
                      <div className="p-4 bg-black/40 border border-[#0f0]/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-4 h-4 text-[#0f0]" />
                          <span className="text-sm text-[#0f0]/60">AI Confidence</span>
                        </div>
                        <div className="text-2xl font-bold text-[#0f0]">98%</div>
                      </div>
                      <div className="p-4 bg-black/40 border border-[#0f0]/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-[#0f0]" />
                          <span className="text-sm text-[#0f0]/60">Security Level</span>
                        </div>
                        <div className="text-2xl font-bold text-[#0f0]">Military Grade</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#0f0] mb-4">Active Learning</h3>
                    <div className="space-y-2">
                      {['Intent Recognition', 'Context Analysis', 'Sentiment Analysis'].map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between p-2 bg-black/40 
                                   border border-[#0f0]/20 rounded-lg"
                        >
                          <span className="text-sm text-[#0f0]/60">{item}</span>
                          <Clock className="w-4 h-4 text-[#0f0] animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}