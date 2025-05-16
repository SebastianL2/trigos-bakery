import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  suggestions?: string[];
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "¡Hola! Soy el asistente virtual de Trigos. ¿Tienes algún antojo en particular? Puedo recomendarte algo dulce, salado, o quizás una bebida refrescante.", 
      isBot: true,
      suggestions: ["Algo dulce", "Algo salado", "Una bebida"]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Process message and get response
    import('../utils/chatbotService').then(({ processMessage }) => {
      processMessage(input).then(response => {
        const botMessage: Message = {
          id: messages.length + 2,
          text: response.text,
          isBot: true,
          suggestions: response.suggestions
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      });
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSendMessage({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="bg-gold text-white p-4 rounded-full shadow-lg hover:bg-gold/90 transition-colors"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform origin-bottom-right">
          {/* Chat header */}
          <div className="bg-gold text-white p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <MessageSquare className="mr-2" size={20} />
                <div>
                  <h3 className="font-medium">Asistente Trigos</h3>
                  <p className="text-xs text-white/80">¿Qué se te antoja hoy?</p>
                </div>
              </div>
              <button 
                onClick={toggleChat} 
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Cerrar chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="h-80 overflow-y-auto p-4 bg-cream/50">
            <div className="space-y-4">
              {messages.map(message => (
                <div key={message.id}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-white text-brown-dark mr-auto'
                        : 'bg-gold/20 text-brown-dark ml-auto'
                    }`}
                  >
                    {message.text}
                  </div>
                  
                  {/* Suggestions */}
                  {message.isBot && message.suggestions && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="bg-white text-brown-dark text-sm px-3 py-1 rounded-full border border-gold/20 hover:bg-gold/10 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="max-w-[80%] p-3 rounded-lg bg-white text-brown-dark mr-auto">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="¿Qué se te antoja hoy?"
                className="w-full p-3 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gold hover:text-gold/80 transition-colors"
                aria-label="Enviar mensaje"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;