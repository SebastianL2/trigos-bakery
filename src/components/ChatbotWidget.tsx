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
  category: 'dulce' | 'pan' | 'saludable' | null;
  sweetPreference: 'low' | 'medium' | 'high' | null;
  occasion: string | null;
  chocolatePreference: boolean;
  fruitPreference: boolean;
  traditionalPreference: boolean;
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
      id: 'cheesecake',
      name: 'Cheesecake',
      category: 'dulce',
      description: 'Deliciosa tarta de queso cremosa con base de galleta.',
      ingredients: 'Queso crema, azúcar, huevos, vainilla, galletas María',
      preparation: 'Horneado al baño María para lograr textura cremosa perfecta',
      taste: 'Cremoso, suave y dulce, con un equilibrio perfecto entre acidez y dulzura'
    },
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
      id: 'galletas-chispas-chocolate',
      name: 'Galletas con Chispas de Chocolate',
      category: 'dulce',
      description: 'Galletas caseras crujientes repletas de chispas de chocolate.',
      ingredients: 'Harina, mantequilla, azúcar moreno, huevos, chispas de chocolate',
      preparation: 'Horneadas hasta dorar ligeramente los bordes',
      taste: 'Crujientes por fuera, suaves por dentro, con intenso sabor a chocolate'
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
      id: 'muffins',
      name: 'Muffins',
      category: 'dulce',
      description: 'Muffins esponjosos con diferentes variedades de sabores.',
      ingredients: 'Harina, azúcar, huevos, aceite, saborizantes (arándanos, chocolate, limón)',
      preparation: 'Horneados hasta que al insertar palillo salga limpio',
      taste: 'Esponjosos y dulces, con rellenos que explotan de sabor'
    },
    {
      id: 'roscas-dulces',
      name: 'Roscas Dulces',
      category: 'dulce',
      description: 'Roscas tradicionales glaseadas, perfectas para compartir.',
      ingredients: 'Harina, azúcar, huevos, mantequilla, levadura, glaseado dulce',
      preparation: 'Fermentadas y fritas, cubiertas con glaseado mientras están tibias',
      taste: 'Dulces y suaves, con glaseado que se derrite deliciosamente'
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
      id: 'galletas-integrales',
      name: 'Galletas Integrales',
      category: 'saludable',
      description: 'Galletas nutritivas hechas con ingredientes integrales.',
      ingredients: 'Harina integral, avena, miel, aceite de coco, frutos secos',
      preparation: 'Horneadas a temperatura moderada para conservar nutrientes',
      taste: 'Textura un poco rústica, naturalmente dulces y nutritivas'
    },
    {
      id: 'tres-leches',
      name: 'Tres Leches',
      category: 'dulce',
      description: 'Pastel empapado en tres tipos de leche, suave y cremoso.',
      ingredients: 'Bizcocho, leche condensada, leche evaporada, crema de leche',
      preparation: 'Bizcocho empapado en mezcla de tres leches, refrigerado',
      taste: 'Húmedo, dulce y cremoso, con textura que se deshace en el paladar'
    }
  ];

  const questions = [
    {
      id: 'category',
      text: '¿Qué tipo de antojo tienes hoy? ¿Algo dulce, pan fresco, o tal vez algo más saludable?',
      suggestions: ['Algo dulce', 'Pan recién horneado', 'Opciones saludables']
    },
    {
      id: 'sweetness-level',
      text: 'Cuando comes algo dulce, ¿prefieres que sea muy dulce, moderadamente dulce, o apenas dulce?',
      suggestions: ['Muy dulce', 'Moderadamente dulce', 'Apenas dulce']
    },
    {
      id: 'occasion',
      text: '¿Para qué ocasión es? ¿Para desayunar, merendar, postre, o algo especial?',
      suggestions: ['Desayuno', 'Merienda', 'Postre', 'Ocasión especial']
    },
    {
      id: 'preference',
      text: '¿Tienes alguna preferencia particular? ¿Te gusta el chocolate, prefieres frutas, o algo más tradicional?',
      suggestions: ['Me encanta el chocolate', 'Prefiero con frutas', 'Algo tradicional']
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
      if (context.currentQuestion === 'category') {
        if (input.includes('dulce')) {
          setUserPreferences(prev => ({ ...prev, category: 'dulce' }));
        } else if (input.includes('pan')) {
          setUserPreferences(prev => ({ ...prev, category: 'pan' }));
        } else if (input.includes('saludable')) {
          setUserPreferences(prev => ({ ...prev, category: 'saludable' }));
        }
      } else if (context.currentQuestion === 'sweetness-level') {
        if (input.includes('muy dulce')) {
          setUserPreferences(prev => ({ ...prev, sweetPreference: 'high' }));
        } else if (input.includes('moderadamente')) {
          setUserPreferences(prev => ({ ...prev, sweetPreference: 'medium' }));
        } else if (input.includes('apenas')) {
          setUserPreferences(prev => ({ ...prev, sweetPreference: 'low' }));
        }
      } else if (context.currentQuestion === 'occasion') {
        setUserPreferences(prev => ({ ...prev, occasion: input }));
      } else if (context.currentQuestion === 'preference') {
        if (input.includes('chocolate')) {
          setUserPreferences(prev => ({ ...prev, chocolatePreference: true }));
        } else if (input.includes('fruta')) {
          setUserPreferences(prev => ({ ...prev, fruitPreference: true }));
        } else if (input.includes('tradicional')) {
          setUserPreferences(prev => ({ ...prev, traditionalPreference: true }));
        }
      }
    }
    
    // Procesar feedback sobre recomendaciones
    if (context.awaitingFeedback && context.lastRecommendation) {
      if (input.includes('gustó') || input.includes('gusta') || input.includes('me parece bien') || input.includes('delicioso')) {
        setUserPreferences(prev => ({
          ...prev,
          previousLiked: [...prev.previousLiked, context.lastRecommendation!.id]
        }));
        return {
          text: '¡Excelente! Me alegra que te haya gustado. Recordaré esta preferencia para futuras recomendaciones. ¿Te gustaría que te sugiera algo más de nuestro delicioso menú?',
          suggestions: ['Sí, otra recomendación', 'No, gracias', 'Algo completamente diferente']
        };
      } else if (input.includes('no era') || input.includes('no me gusta') || input.includes('no era lo que esperaba')) {
        setUserPreferences(prev => ({
          ...prev,
          previousDisliked: [...prev.previousDisliked, context.lastRecommendation!.id]
        }));
        return {
          text: 'Entiendo, gracias por tu feedback. Esto me ayudará a elegir mejor la próxima vez. ¿Podrías decirme qué no te convenció para ajustar mi siguiente recomendación?',
          suggestions: ['Era muy dulce', 'No era lo que esperaba', 'Quiero algo diferente']
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