// This is a placeholder service for future Dialogflow integration
// You would need to add the Dialogflow SDK and configure your Dialogflow agent

export interface ChatbotResponse {
  text: string;
  intent?: string;
  parameters?: Record<string, any>;
}

// This is a mock implementation that would be replaced with actual Dialogflow integration
export const processMessage = async (message: string): Promise<ChatbotResponse> => {
  // Basic keyword matching as a placeholder for Dialogflow
  let response = '';
  let intent = '';
  
  if (message.toLowerCase().includes('hola') || message.toLowerCase().includes('buenos días') || message.toLowerCase().includes('buenas tardes')) {
    response = "¡Hola! Bienvenido a Panadería Trigos. ¿En qué puedo ayudarte hoy?";
    intent = "welcome";
  } 
  else if (message.toLowerCase().includes('horario') || message.toLowerCase().includes('hora') || message.toLowerCase().includes('abierto')) {
    response = "Nuestro horario es de lunes a sábado de 7:00 am a 8:00 pm, y los domingos de 8:00 am a 6:00 pm.";
    intent = "hours";
  }
  else if (message.toLowerCase().includes('ubicacion') || message.toLowerCase().includes('direccion') || message.toLowerCase().includes('donde')) {
    response = "Estamos ubicados en Carrera 11 No. 11-04 en el Centro de Sogamoso, y también en el Centro Comercial Meditropoli 1, Local 140.";
    intent = "location";
  }
  else if (message.toLowerCase().includes('pan') || message.toLowerCase().includes('panaderia')) {
    response = "Nuestro pan se hornea fresco todos los días. Tenemos pan blandito, pan mantequilla, pan multicereal, pan campesino y muchas otras variedades.";
    intent = "bread_products";
  }
  else if (message.toLowerCase().includes('pastel') || message.toLowerCase().includes('torta') || message.toLowerCase().includes('cumpleaños')) {
    response = "Contamos con una variedad de tortas y pasteles para todas las ocasiones. Puedes personalizarlas según tus preferencias.";
    intent = "cake_products";
  }
  else if (message.toLowerCase().includes('precio') || message.toLowerCase().includes('costo') || message.toLowerCase().includes('valor')) {
    response = "Los precios varían según el producto. ¿Hay algún producto específico del que te gustaría conocer el precio?";
    intent = "pricing";
  }
  else if (message.toLowerCase().includes('domicilio') || message.toLowerCase().includes('delivery') || message.toLowerCase().includes('envio')) {
    response = "Sí, contamos con servicio a domicilio. Puedes hacer tu pedido llamando al 312 6548790 o por WhatsApp al 313 2488837.";
    intent = "delivery";
  }
  else if (message.toLowerCase().includes('gracias')) {
    response = "¡Gracias a ti por contactarnos! Estamos para servirte. ¿Hay algo más en lo que pueda ayudarte?";
    intent = "thanks";
  }
  else if (message.toLowerCase().includes('adios') || message.toLowerCase().includes('hasta luego') || message.toLowerCase().includes('chao')) {
    response = "¡Hasta pronto! Esperamos verte pronto en Panadería Trigos.";
    intent = "goodbye";
  }
  else {
    response = "Gracias por tu mensaje. Para ayudarte mejor, ¿podrías darme más detalles sobre lo que estás buscando?";
    intent = "fallback";
  }
  
  return {
    text: response,
    intent: intent
  };
};

/*
Instructions for future Dialogflow integration:

1. Create a Dialogflow agent in the Google Cloud Console
2. Set up intents for common bakery questions (products, hours, location, etc.)
3. Train your agent with sample phrases
4. Install the Dialogflow SDK:
   npm install @google-cloud/dialogflow

5. Replace this mock implementation with actual Dialogflow code like:

import dialogflow from '@google-cloud/dialogflow';

const projectId = 'your-project-id';
const sessionId = 'unique-session-id';
const languageCode = 'es';

export const processMessage = async (message: string): Promise<ChatbotResponse> => {
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: 'path/to/your/credentials.json'
  });
  
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };
  
  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    
    return {
      text: result.fulfillmentText,
      intent: result.intent.displayName,
      parameters: result.parameters.fields
    };
  } catch (error) {
    console.error('Error with Dialogflow:', error);
    return {
      text: 'Lo siento, estoy teniendo problemas para responder. Por favor, intenta de nuevo más tarde.',
    };
  }
};
*/