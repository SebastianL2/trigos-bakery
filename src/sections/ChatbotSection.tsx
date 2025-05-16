import React from 'react';
import { useInView } from '../hooks/useInView';
import { MessageSquare, Clock, Check, Zap } from 'lucide-react';

const ChatbotSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section id="asistente" className="py-20 bg-brown-dark text-white" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - image */}
          <div className={`lg:w-1/2 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="relative">
              <div className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto lg:ml-0">
                <div className="flex items-center mb-4">
                  <div className="bg-gold h-10 w-10 rounded-full flex items-center justify-center mr-3">
                    <MessageSquare className="text-white" size={18} />
                  </div>
                  <div>
                    <h4 className="text-brown-dark font-medium">Asistente Virtual Trigos</h4>
                    <p className="text-brown text-sm">Siempre disponible para ayudarte</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-3">
                  <div className="bg-cream rounded-lg p-3 text-brown-dark max-w-xs">
                    ¡Hola! Soy el asistente virtual de Trigos. ¿En qué puedo ayudarte hoy?
                  </div>
                  
                  <div className="bg-gold/20 rounded-lg p-3 text-brown-dark max-w-xs ml-auto">
                    Hola, quisiera saber si tienen tortas para cumpleaños
                  </div>
                  
                  <div className="bg-cream rounded-lg p-3 text-brown-dark max-w-xs">
                    ¡Claro que sí! Contamos con una variedad de tortas para cumpleaños. Puedes personalizarlas con el sabor, tamaño y decoración que prefieras. ¿Para cuántas personas necesitas la torta?
                  </div>
                </div>
                
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Escribe tu mensaje..." 
                    className="w-full p-3 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 text-brown-dark"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gold hover:text-gold/80 transition-colors">
                    <MessageSquare className="fill-gold" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - text */}
          <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <h2 className="font-serif text-4xl mb-6">Asistente Virtual</h2>
            <p className="text-white/80 mb-8 text-lg">
              Nuestro asistente virtual está disponible 24/7 para responder tus preguntas, tomar pedidos, compartir información sobre nuestros productos y mucho más.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-gold/20 p-2 rounded-full mr-4">
                  <Clock className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Disponible 24/7</h3>
                  <p className="text-white/70">
                    Respuestas instantáneas a cualquier hora del día o la noche.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gold/20 p-2 rounded-full mr-4">
                  <Check className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Respuestas Precisas</h3>
                  <p className="text-white/70">
                    Información detallada sobre productos, precios, ubicaciones y más.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gold/20 p-2 rounded-full mr-4">
                  <Zap className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Pedidos Rápidos</h3>
                  <p className="text-white/70">
                    Realiza pedidos fácilmente y recibe confirmación al instante.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button className="bg-gold text-white px-6 py-3 rounded-md font-medium text-lg inline-flex items-center hover:bg-gold/90 transition-colors">
                <MessageSquare className="mr-2" size={20} />
                Iniciar Conversación
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;