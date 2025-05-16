import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

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
  sweetPreference: 'low' | 'medium' | 'high' | null;
  saltyPreference: 'low' | 'medium' | 'high' | null;
  temperaturePreference: 'hot' | 'cold' | 'ambient' | null;
  substancePreference: 'light' | 'medium' | 'heavy' | null;
  previousLiked: string[];
  previousDisliked: string[];
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  suggestions?: string[];
  products?: Product[];
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
    sweetPreference: null,
    saltyPreference: null,
    temperaturePreference: null,
    substancePreference: null,
    previousLiked: [],
    previousDisliked: []
  });
  const [context, setContext] = useState<ConversationContext>({
    stage: 'greeting',
    currentQuestion: null,
    awaitingFeedback: false,
    lastRecommendation: null
  });

  // Simulación de base de datos de productos
  const products: Product[] = [
    {
      id: 'croissant-chocolate',
      name: 'Croissant de Chocolate',
      category: 'dulce',
      description: 'Croissant recién horneado relleno de cremoso chocolate.',
      ingredients: 'Harina de trigo, mantequilla artesanal, chocolate belga, huevos',
      preparation: 'Laminado tradicional francés, horneado a 190°C',
      taste: 'Crujiente por fuera, esponjoso por dentro, con chocolate derretido'
    },
    {
      id: 'empanada-carne',
      name: 'Empanada de Carne Jugosa',
      category: 'salado',
      description: 'Empanada tradicional con relleno de carne especiada.',
      ingredients: 'Carne de res, cebolla, huevo duro, aceitunas, masa casera',
      preparation: 'Cocida al horno hasta dorar la masa',
      taste: 'Masa crocante con relleno jugoso y bien condimentado'
    },
    {
      id: 'smoothie-mango',
      name: 'Smoothie de Mango y Maracuyá',
      category: 'bebida',
      description: 'Refrescante batido de frutas tropicales.',
      ingredients: 'Mango fresco, maracuyá, yogurt natural, miel',
      preparation: 'Licuado con hielo hasta obtener consistencia cremosa',
      taste: 'Dulce tropical con toque ácido del maracuyá'
    },
    {
      id: 'sandwich-pavo',
      name: 'Sandwich de Pavo Gourmet',
      category: 'salado',
      description: 'Sandwich artesanal con jamón de pavo premium.',
      ingredients: 'Pan integral, pavo ahumado, queso manchego, tomate, lechuga',
      preparation: 'Tostado ligeramente en plancha',
      taste: 'Equilibrado entre lo salado del pavo y la frescura de las verduras'
    },
    {
      id: 'muffin-arandanos',
      name: 'Muffin de Arándanos',
      category: 'dulce',
      description: 'Esponjoso muffin repleto de arándanos frescos.',
      ingredients: 'Harina integral, arándanos frescos, mantequilla, huevos, azúcar',
      preparation: 'Horneado a 180°C hasta dorar levemente',
      taste: 'Dulce y esponjoso con toques ácidos de arándano'
    }
  ];

  const questions = [
    {
      id: 'sweet-level',
      text: '¿Qué tan dulce te gusta lo que comes? ¿Prefieres algo poco dulce, moderadamente dulce, o muy dulce?',
      suggestions: ['Poco dulce', 'Moderadamente dulce', 'Muy dulce']
    },
    {
      id: 'temperature',
      text: '¿Prefieres algo caliente, frío, o temperatura ambiente?',
      suggestions: ['Caliente', 'Frío', 'Temperatura ambiente']
    },
    {
      id: 'substance',
      text: '¿Quieres algo ligero o más sustancioso para llenarte?',
      suggestions: ['Algo ligero', 'Moderadamente saciante', 'Muy sustancioso']
    },
    {
      id: 'category',
      text: '¿Tienes antojo de algo dulce, salado, o quizás una bebida refrescante?',
      suggestions: ['Algo dulce', 'Algo salado', 'Una bebida']
    }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Mensaje inicial cuando se abre el chat
      setTimeout(() => {
        setMessages([{
          id: 1,
          text: '¡Hola! Soy el asistente virtual de Trigos. Me encanta ayudarte a encontrar tu antojo perfecto. Para recomendarte algo delicioso, me gustaría conocerte un poco mejor. ¿Comenzamos?',
          isBot: true,
          suggestions: ['¡Claro, comencemos!', 'Solo quiero algo rápido', 'Sorpréndeme']
        }]);
      }, 500);
    }
  }, [isOpen]);

  const processUserResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    // Procesar respuestas sobre preferencias
    if (context.stage === 'questioning') {
      if (context.currentQuestion === 'sweet-level') {
        if (input.includes('poco')) {
          setUserPreferences(prev => ({ ...prev, sweetPreference: 'low' }));
        } else if (input.includes('moderada') || input.includes('normal')) {
          setUserPreferences(prev => ({ ...prev, sweetPreference: 'medium' }));
        } else if (input.includes('muy')) {
          setUserPreferences(prev => ({ ...prev, sweetPreference: 'high' }));
        }
      } else if (context.currentQuestion === 'temperature') {
        if (input.includes('caliente')) {
          setUserPreferences(prev => ({ ...prev, temperaturePreference: 'hot' }));
        } else if (input.includes('frío')) {
          setUserPreferences(prev => ({ ...prev, temperaturePreference: 'cold' }));
        } else {
          setUserPreferences(prev => ({ ...prev, temperaturePreference: 'ambient' }));
        }
      } else if (context.currentQuestion === 'substance') {
        if (input.includes('ligero')) {
          setUserPreferences(prev => ({ ...prev, substancePreference: 'light' }));
        } else if (input.includes('moderada')) {
          setUserPreferences(prev => ({ ...prev, substancePreference: 'medium' }));
        } else {
          setUserPreferences(prev => ({ ...prev, substancePreference: 'heavy' }));
        }
      }
    }
    
    // Procesar feedback sobre recomendaciones
    if (context.awaitingFeedback && context.lastRecommendation) {
      if (input.includes('gustó') || input.includes('gusta') || input.includes('me parece bien')) {
        setUserPreferences(prev => ({
          ...prev,
          previousLiked: [...prev.previousLiked, context.lastRecommendation!.id]
        }));
        return {
          text: '¡Excelente! Me alegra que te haya gustado. Recordaré esta preferencia para futuras recomendaciones. ¿Te gustaría que te sugiera algo más?',
          suggestions: ['Sí, otra recomendación', 'No, gracias', 'Algo diferente']
        };
      } else if (input.includes('no era') || input.includes('no me gusta') || input.includes('no era lo que esperaba')) {
        setUserPreferences(prev => ({
          ...prev,
          previousDisliked: [...prev.previousDisliked, context.lastRecommendation!.id]
        }));
        return {
          text: 'Entiendo, gracias por tu feedback. Esto me ayudará a mejorar mis recomendaciones. ¿Podrías decirme qué no te gustó para ajustar mejor mi sugerencia?',
          suggestions: ['Era muy dulce', 'Era muy salado', 'No era lo que esperaba']
        };
      }
    }
    
    return null; // No hay respuesta específica procesada
  };

  const generateRecommendation = () => {
    // Filtrar productos basado en preferencias
    let filteredProducts = products.filter(product => 
      !userPreferences.previousDisliked.includes(product.id)
    );
    
    // Lógica de recomendación basada en preferencias
    if (userPreferences.sweetPreference === 'high') {
      filteredProducts = filteredProducts.filter(p => p.category === 'dulce');
    } else if (userPreferences.sweetPreference === 'low') {
      filteredProducts = filteredProducts.filter(p => p.category !== 'dulce');
    }
    
    // Seleccionar producto aleatorio de los filtrados
    const recommendedProduct = filteredProducts[Math.floor(Math.random() * filteredProducts.length)];
    
    setContext(prev => ({
      ...prev,
      lastRecommendation: recommendedProduct,
      awaitingFeedback: true,
      stage: 'recommending'
    }));
    
    return {
      text: `Te recomiendo nuestro ${recommendedProduct.name}. ${recommendedProduct.description}

**¿Por qué te gustará?**
Con tu gusto por ${userPreferences.sweetPreference === 'high' ? 'lo dulce' : userPreferences.sweetPreference === 'low' ? 'lo no tan dulce' : 'el equilibrio'}, creo que disfrutarás de ${recommendedProduct.name} porque ${recommendedProduct.taste}.

**Detalles del producto:**
- **Ingredientes:** ${recommendedProduct.ingredients}
- **Preparación:** ${recommendedProduct.preparation}
- **Sabor:** ${recommendedProduct.taste}

¿Te parece que podría gustarte?`,
      suggestions: ['¡Se ve delicioso!', 'Me gustaría más detalles', 'Prefiero algo diferente'],
      products: [recommendedProduct]
    };
  };

  const getNextQuestion = () => {
    const answeredQuestions = [];
    if (userPreferences.sweetPreference) answeredQuestions.push('sweet-level');
    if (userPreferences.temperaturePreference) answeredQuestions.push('temperature');
    if (userPreferences.substancePreference) answeredQuestions.push('substance');
    
    const unansweredQuestions = questions.filter(q => !answeredQuestions.includes(q.id));
    return unansweredQuestions.length > 0 ? unansweredQuestions[0] : null;
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
    
    // Simulate bot response delay
    setTimeout(() => {
      // Procesar respuesta del usuario
      const processedResponse = processUserResponse(input);
      let botResponse;
      
      if (processedResponse) {
        botResponse = processedResponse;
      } else if (context.stage === 'greeting') {
        // Comenzar con preguntas
        setContext(prev => ({ ...prev, stage: 'questioning' }));
        const nextQuestion = getNextQuestion();
        if (nextQuestion) {
          setContext(prev => ({ ...prev, currentQuestion: nextQuestion.id }));
          botResponse = {
            text: nextQuestion.text,
            suggestions: nextQuestion.suggestions
          };
        }
      } else if (context.stage === 'questioning') {
        // Continuar con más preguntas o generar recomendación
        const nextQuestion = getNextQuestion();
        if (nextQuestion) {
          setContext(prev => ({ ...prev, currentQuestion: nextQuestion.id }));
          botResponse = {
            text: nextQuestion.text,
            suggestions: nextQuestion.suggestions
          };
        } else {
          // Todas las preguntas respondidas, generar recomendación
          botResponse = generateRecommendation();
        }
      } else {
        // Respuesta genérica
        botResponse = {
          text: 'Interesante... Déjame pensar en la mejor recomendación para ti.',
          suggestions: ['Sorpréndeme', 'Quiero algo específico']
        };
      }
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse.text,
        isBot: true,
        suggestions: botResponse.suggestions,
        products: botResponse.products
      };
      
      setMessages(prev => [...prev, botMessage]);
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
          
          {/* Chat messages */}
          <div className="h-80 overflow-y-auto p-4 bg-cream/50">
            <div className="space-y-4">
              {messages.map(message => (
                <div key={message.id}>
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-white text-brown-dark mr-auto'
                        : 'bg-gold/20 text-brown-dark ml-auto'
                    }`}
                  >
                    <div className="whitespace-pre-line">{message.text}</div>
                  </div>
                  
                  {/* Product cards */}
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
                  
                  {/* Suggestions */}
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
          
          {/* Chat input */}
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