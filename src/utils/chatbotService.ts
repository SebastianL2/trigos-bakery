// Enhanced chatbot service with smart product recommendations

export interface ChatbotResponse {
  text: string;
  intent?: string;
  parameters?: Record<string, any>;
  suggestions?: string[];
}

interface ProductRecommendation {
  name: string;
  description: string;
  category: string;
  timeOfDay: string[];
  mood: string[];
  tags: string[];
}

const products: ProductRecommendation[] = [
  {
    name: "Pan Blandito Recién Horneado",
    description: "Suave, esponjoso y con un aroma irresistible. Perfecto para cualquier momento del día.",
    category: "panadería",
    timeOfDay: ["mañana", "tarde"],
    mood: ["feliz", "neutral", "hambriento"],
    tags: ["suave", "tradicional", "básico"]
  },
  {
    name: "Croissant de Almendras",
    description: "Crujiente por fuera, tierno por dentro, con deliciosas almendras caramelizadas.",
    category: "panadería",
    timeOfDay: ["mañana"],
    mood: ["feliz", "antojo"],
    tags: ["dulce", "crujiente", "especial"]
  },
  {
    name: "Café Latte",
    description: "Espresso suave con leche cremosa, perfecto para empezar el día o tomar un descanso.",
    category: "bebidas",
    timeOfDay: ["mañana", "tarde"],
    mood: ["cansado", "neutral", "trabajando"],
    tags: ["caliente", "cafeína", "energía"]
  },
  {
    name: "Torta de Chocolate",
    description: "Rica torta húmeda de chocolate con ganache. Ideal para momentos especiales o antojos dulces.",
    category: "pastelería",
    timeOfDay: ["tarde", "noche"],
    mood: ["feliz", "celebración", "antojo"],
    tags: ["dulce", "chocolate", "postre"]
  },
  {
    name: "Sandwich de Pollo",
    description: "Pan artesanal con pollo a la plancha, verduras frescas y nuestra salsa especial.",
    category: "cafetería",
    timeOfDay: ["tarde"],
    mood: ["hambriento", "almuerzo", "neutral"],
    tags: ["salado", "sustancioso", "almuerzo"]
  }
];

const getCurrentTimeOfDay = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "mañana";
  if (hour < 18) return "tarde";
  return "noche";
};

const getMoodFromMessage = (message: string): string[] => {
  const moods: string[] = [];
  
  if (message.match(/cansad[oa]|sueño|agotad[oa]/i)) moods.push("cansado");
  if (message.match(/feliz|content[oa]|alegr[ea]/i)) moods.push("feliz");
  if (message.match(/hambre|hambient[oa]/i)) moods.push("hambriento");
  if (message.match(/antojo|antojos|ganas/i)) moods.push("antojo");
  if (message.match(/celebr|fiesta|cumpleaños/i)) moods.push("celebración");
  
  return moods.length ? moods : ["neutral"];
};

const getPreferencesFromMessage = (message: string): string[] => {
  const preferences: string[] = [];
  
  if (message.match(/dulce|azúcar|postre/i)) preferences.push("dulce");
  if (message.match(/salad[oa]|sal/i)) preferences.push("salado");
  if (message.match(/caliente|calient[ea]/i)) preferences.push("caliente");
  if (message.match(/frí[oa]|fresc[oa]/i)) preferences.push("frío");
  
  return preferences;
};

const getRecommendations = (
  mood: string[],
  timeOfDay: string,
  preferences: string[]
): ProductRecommendation[] => {
  return products
    .filter(product => {
      // Match time of day
      if (!product.timeOfDay.includes(timeOfDay)) return false;
      
      // Match mood if specified
      if (mood.length && !mood.some(m => product.mood.includes(m))) return false;
      
      // Match preferences if specified
      if (preferences.length && !preferences.some(p => product.tags.includes(p))) return false;
      
      return true;
    })
    .slice(0, 3); // Return top 3 recommendations
};

const formatRecommendations = (recommendations: ProductRecommendation[]): string => {
  if (!recommendations.length) {
    return "Lo siento, no tengo recomendaciones específicas en este momento. ¿Podrías decirme más sobre lo que te gustaría?";
  }
  
  return "Te sugiero:\n\n" + recommendations
    .map(rec => `🔸 ${rec.name}: ${rec.description}`)
    .join("\n\n");
};

export const processMessage = async (message: string): Promise<ChatbotResponse> => {
  const timeOfDay = getCurrentTimeOfDay();
  const mood = getMoodFromMessage(message);
  const preferences = getPreferencesFromMessage(message);
  
  // Initial greeting
  if (message.match(/hola|buenos|buenas/i)) {
    return {
      text: "¡Hola! Soy el asistente virtual de Trigos. ¿Tienes algún antojo en particular? Puedo recomendarte algo dulce, salado, o quizás una bebida refrescante.",
      intent: "welcome"
    };
  }
  
  // Handle specific product inquiries
  if (message.match(/pan|panadería/i)) {
    return {
      text: "En nuestra panadería encontrarás una gran variedad de panes artesanales. ¿Prefieres algo tradicional como nuestro pan blandito, o tal vez algo especial como un croissant?",
      intent: "bread_products",
      suggestions: ["Pan Blandito", "Croissant", "Pan Integral", "Pan de Queso"]
    };
  }
  
  if (message.match(/torta|pastel|cumpleaños/i)) {
    return {
      text: "¡Nuestras tortas son perfectas para cualquier celebración! ¿Buscas algo específico? Tenemos desde tortas tradicionales hasta diseños personalizados.",
      intent: "cake_products",
      suggestions: ["Torta de Chocolate", "Torta de Vainilla", "Cheesecake", "Torta Personalizada"]
    };
  }
  
  if (message.match(/café|bebida/i)) {
    return {
      text: "¿Qué te gustaría tomar? Tenemos una gran variedad de bebidas calientes y frías preparadas por nuestros expertos baristas.",
      intent: "beverages",
      suggestions: ["Café Espresso", "Cappuccino", "Latte", "Chocolate Caliente"]
    };
  }
  
  // Get personalized recommendations based on context
  const recommendations = getRecommendations(mood, timeOfDay, preferences);
  
  if (message.match(/recomienda|sugerencia|qué hay|que hay/i) || preferences.length > 0) {
    return {
      text: formatRecommendations(recommendations),
      intent: "recommendations",
      parameters: { mood, timeOfDay, preferences }
    };
  }
  
  // Feedback handling
  if (message.match(/me gust[óo]|estuvo bueno|excelente|delicioso/i)) {
    return {
      text: "¡Me alegra que te haya gustado! ¿Te gustaría probar algo más? Puedo recomendarte otros productos similares.",
      intent: "positive_feedback"
    };
  }
  
  if (message.match(/no me gust[óo]|no era|malo|regular/i)) {
    return {
      text: "Lamento que no haya sido lo que esperabas. ¿Podrías contarme más sobre tus preferencias para hacerte mejores recomendaciones?",
      intent: "negative_feedback"
    };
  }
  
  // Default response with contextual suggestions
  return {
    text: "¿Puedo ayudarte a encontrar algo específico? Tenemos una gran variedad de productos frescos y deliciosos.",
    intent: "fallback",
    suggestions: recommendations.map(rec => rec.name)
  };
};