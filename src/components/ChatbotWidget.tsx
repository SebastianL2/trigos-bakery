import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "¡Hola! Soy el asistente virtual de Trigos. ¿En qué puedo ayudarte hoy?", isBot: true }
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
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      
      if (input.toLowerCase().includes('torta') || input.toLowerCase().includes('pastel')) {
        botResponse = "¡Claro que sí! Contamos con una variedad de tortas y pasteles. Puedes personalizarlas con el sabor, tamaño y decoración que prefieras. ¿Para qué ocasión la necesitas?";
      } else if (input.toLowerCase().includes('pan') || input.toLowerCase().includes('panaderia')) {
        botResponse = "Nuestro pan se hornea fresco todos los días. Tenemos pan blandito, mantequilla, multicereal, campesino y muchas otras variedades. ¿Hay alguno en particular que te interese?";
      } else if (input.toLowerCase().includes('ubicacion') || input.toLowerCase().includes('direccion') || input.toLowerCase().includes('donde')) {
        botResponse = "En Sogamoso tenemos dos ubicaciones: nuestra sede principal en Carrera 11 No. 11-04 en el Centro, y otra en el Centro Comercial Meditropoli 1, Local 140. ¿Cuál te queda más cerca?";
      } else if (input.toLowerCase().includes('hora') || input.toLowerCase().includes('horario')) {
        botResponse = "Nuestro horario es de lunes a sábado de 7:00 am a 8:00 pm, y los domingos de 8:00 am a 6:00 pm. ¡Te esperamos!";
      } else if (input.toLowerCase().includes('domicilio') || input.toLowerCase().includes('envio') || input.toLowerCase().includes('entregar')) {
        botResponse = "¡Sí, tenemos servicio a domicilio! Puedes hacer tu pedido llamando al 312 6548790 o por WhatsApp al 313 2488837. ¿Qué te gustaría ordenar?";
      } else {
        botResponse = "Gracias por tu mensaje. ¿En qué más puedo ayudarte con nuestros productos o servicios de panadería?";
      }
      
      const botMessageObj: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true
      };
      
      setMessages(prev => [...prev, botMessageObj]);
      setIsTyping(false);
    }, 1500);
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
                  <p className="text-xs text-white/80">Disponible 24/7</p>
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
                <div
                  key={message.id}
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-white text-brown-dark mr-auto'
                      : 'bg-gold/20 text-brown-dark ml-auto'
                  }`}
                >
                  {message.text}
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
                placeholder="Escribe tu mensaje..."
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