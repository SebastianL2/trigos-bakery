declare module 'dialogflow' {
  export interface DialogflowConfig {
    projectId: string;
    sessionId: string;
    credentials: {
      client_email: string;
      private_key: string;
    };
  }

  export interface DialogflowResponse {
    intent: string;
    fulfillmentText: string;
    parameters: Record<string, any>;
  }

  export class DialogflowClient {
    constructor(config: DialogflowConfig);
    detectIntent(text: string): Promise<DialogflowResponse>;
  }
}