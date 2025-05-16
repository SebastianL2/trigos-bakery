import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  suggestions?: string[];
  products?: Product[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  ingredients: string;
  preparation: string;
  taste: string;
  image?: string;
}

interface UserPreferences {
  category: 'dulce' | 'pan' | 'saludable' | null;
  sweetPreference: 'low' | 'medium' | 'high' | null;
  occasion: string | null;
  chocolatePreference: boolean;
  fruitPreference: boolean;
  traditionalPreference: boolean;
  previousLiked: string[];
  previousDisliked: string[];
}

interface ConversationContext {
  stage: 'greeting' | 'questioning' | 'recommending' | 'feedback' | 'description';
  currentQuestion: string | null;
  awaitingFeedback: boolean;
  lastRecommendation: Product | null;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    category: null,
    sweetPreference: null,
    occasion: null,
    chocolatePreference: false,
    fruitPreference: false,
    traditionalPreference: false,
    previousLiked: [],
    previousDisliked: []
  });
  const [context, setContext] = useState<ConversationContext>({
    stage: 'greeting',
    currentQuestion: null,
    awaitingFeedback: false,
    lastRecommendation: null
  });

  // Base de datos de productos de Trigos
  const products: Product[] = [
    {
      id: 'pan-blanco-tradicional',
      name: 'Pan Blanco Tradicional',
      category: 'pan',
      description: 'Pan blanco recién horneado con corteza dorada y miga esponjosa.',
      ingredients: 'Harina de trigo, levadura, agua, sal, azúcar',
      preparation: 'Fermentado lentamente y horneado hasta dorar',
      taste: 'Suave y esponjoso, ideal para cualquier momento del día'
    },
    {
      id: 'croissants',
      name: 'Croissants',
      category: 'pan',
      description: 'Croissants franceses tradicionales hojaldrados y mantecosos.',
      ingredients: 'Harina de trigo, mantequilla europea, levadura, leche, sal',
      preparation: 'Laminado manual tradicional, fermentado y horneado',
      taste: 'Ligeros, hojaldrados con capas mantecosas que se deshacen en la boca'
    },
    {
      id: 'pan-integral',
      name: 'Pan Integral',
      category: 'pan',
      description: 'Pan saludable hecho con harina integral y semillas.',
      ingredients: 'Harina integral, semillas (sésamo, girasol), levadura, agua, sal',
      preparation: 'Fermentación lenta para desarrollar sabores complejos',
      taste: 'Sabor robusto y terroso, textura densa pero tierna'
    },
    {
      id: 'cheesecake',
      name: 'Cheesecake',
      category: 'dulce',
      description: 'Deliciosa tarta de queso cremosa con base de galleta.',
      ingredients: 'Queso crema, azúcar, huevos, vainilla, galletas María',
      preparation: 'Horneado al baño María para lograr textura cremosa perfecta',
      taste: 'Cremoso, suave y dulce, con un equilibrio perfecto entre acidez y dulzura'
    },
    {
      id: 'galletas-chispas-chocolate',
      name: 'Galletas con Chispas de Chocolate',
      category: 'dulce',
      description: 'Galletas caseras crujientes repletas de chispas de chocolate.',
      ingredients: 'Harina, mantequilla, azúcar moreno, huevos, chispas de chocolate',
      preparation: 'Horneadas hasta dorar ligeramente los bordes',
      taste: 'Crujientes por fuera, suaves por dentro, con intenso sabor a chocolate'
    },
    {
      id: 'tortas-personalizadas',
      name: 'Tortas Personalizadas',
      category: 'dulce',
      description: 'Tortas hechas a medida para ocasiones especiales.',
      ingredients: 'Harina, huevos, mantequilla, azúcar, decoraciones personalizadas',
      preparation: 'Horneado perfecto con decoración artesanal según tus deseos',
      taste: 'Esponjosa y húmeda, con sabor elegido especialmente para ti'
    },
    {
      id: 'brownies',
      name: 'Brownies',
      category: 'dulce',
      description: 'Brownies de chocolate intenso, húmedos y fudgeosos.',
      ingredients: 'Chocolate negro, mantequilla, azúcar, huevos, harina, nueces (opcional)',
      preparation: 'Horneados el tiempo justo para mantener centro húmedo',
      taste: 'Denso, cremoso y con intenso sabor a chocolate que derrite en la boca'
    },
    {
      id: 'galletas-integrales',
      name: 'Galletas Integrales',
      category: 'saludable',
      description: 'Galletas nutritivas hechas con ingredientes integrales.',
      ingredients: 'Harina integral, avena, miel, aceite de coco, frutos secos',
      preparation: 'Horneadas a temperatura moderada para conservar nutrientes',
      taste: 'Textura un poco rústica, naturalmente dulces y nutritivas'
    }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: 1,
          text: '¡Hola! Soy el asistente virtual de Trigos. ¿Qué tipo de antojo tienes hoy? ¿Algo dulce, pan fresco, o tal vez algo más saludable?',
          isBot: true,
          suggestions: ['Algo dulce', 'Pan recién horneado', 'Algo saludable']
        }]);
      }, 500);
    }
  }, [isOpen]);

  const handleUserPreference = (input: string) => {
    const lowerInput = input.toLowerCase();
    let category: 'dulce' | 'pan' | 'saludable' | null = null;
    let response = '';
    let suggestions: string[] = [];

    if (lowerInput.includes('dulce')) {
      category = 'dulce';
      response = '¡Excelente elección! Tenemos deliciosas opciones dulces. ¿Prefieres algo con chocolate, frutas o tal vez un postre tradicional?';
      suggestions = ['Con chocolate', 'Con frutas', 'Algo tradicional'];
    } else if (lowerInput.includes('pan')) {
      category = 'pan';
      response = 'Nuestro pan se hornea fresco durante todo el día. ¿Prefieres pan tradicional, integral o tal vez algo especial como croissants?';
      suggestions = ['Pan tradicional', 'Pan integral', 'Croissants'];
    } else if (lowerInput.includes('saludable')) {
      category = 'saludable';
      response = 'Tenemos excelentes opciones saludables. ¿Te gustaría probar nuestro pan integral, galletas con cereales o algo bajo en azúcar?';
      suggestions = ['Pan integral', 'Galletas con cereales', 'Bajo en azúcar'];
    }

    if (category) {
      setUserPreferences(prev => ({ ...prev, category }));
      return { response, suggestions };
    }

    return null;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const preference = handleUserPreference(input);
      
      if (preference) {
        const botMessage: Message = {
          id: messages.length + 2,
          text: preference.response,
          isBot: true,
          suggestions: preference.suggestions
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Filtrar productos según la categoría seleccionada
        const filteredProducts = products.filter(p => p.category === userPreferences.category);
        const randomProduct = filteredProducts[Math.floor(Math.random() * filteredProducts.length)];
        
        const botMessage: Message = {
          id: messages.length + 2,
          text: `Te recomiendo probar nuestro ${randomProduct.name}. ${randomProduct.description}\n\n¿Te gustaría saber más sobre este producto?`,
          isBot: true,
          suggestions: ['Sí, cuéntame más', 'Prefiero otra opción', 'Gracias'],
          products: [randomProduct]
        };
        setMessages(prev => [...prev, botMessage]);
      }
      
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSendMessage({ preventDefault: () => {} } as React.FormEvent);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={toggleChat}
        className="bg-gold text-white p-4 rounded-full shadow-lg hover:bg-gold/90 transition-colors"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gold text-white p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <MessageSquare className="mr-2" size={20} />
                <div>
                  <h3 className="font-medium">Asistente Trigos</h3>
                  <p className="text-xs text-white/80">Encontremos tu antojo perfecto</p>
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
          
          <div className="h-80 overflow-y-auto p-4 bg-cream/50">
            <div className="space-y-4">
              {messages.map(message => (
                <div key={message.id}>
                  <div className={`max-w-[85%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-white text-brown-dark mr-auto'
                      : 'bg-gold/20 text-brown-dark ml-auto'
                  }`}>
                    <div className="whitespace-pre-line">{message.text}</div>
                  </div>
                  
                  {message.products && (
                    <div className="mt-3">
                      {message.products.map(product => (
                        <div key={product.id} className="bg-white p-3 rounded-lg border border-gold/20">
                          <h4 className="font-semibold text-brown-dark">{product.name}</h4>
                          <p className="text-sm text-brown/80 mt-1">{product.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {message.isBot && message.suggestions && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="bg-white text-brown-dark text-sm px-3 py-2 rounded-full border border-gold/20 hover:bg-gold/10 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="max-w-[85%] p-3 rounded-lg bg-white text-brown-dark mr-auto">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Cuéntame tu antojo..."
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