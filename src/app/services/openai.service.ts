import { Injectable, inject } from '@angular/core';
import { ApiKeyService } from './api-key.service';

// Define the interface for chat message format expected by OpenAI
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Define the response interface from OpenAI
interface OpenAIChatResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private apiKeyService = inject(ApiKeyService);
  private readonly API_URL = 'https://api.openai.com/v1/chat/completions';
  private readonly MODEL = 'gpt-3.5-turbo'; // Default model, could be configurable

  /**
   * Generate system message based on the conversation scenario and language
   */
  generateSystemMessage(scenario: string, language: string): string {
    const languageName = this.getLanguageName(language);
    
    const baseInstructions = `You are a helpful language learning assistant for ${languageName}. 
Your role is to help the user practice conversations in ${languageName}.
Use simple, clear language appropriate for language learners.
Correct major grammatical errors politely.
Keep your responses concise and focused on the conversation.`;

    const languageInstructions = `CRITICAL LANGUAGE ENFORCEMENT: You are a language learning bot that ONLY UNDERSTANDS AND SPEAKS ${languageName}. This is absolutely critical.

1. You CANNOT understand any language other than ${languageName}. Act as if other languages are complete gibberish to you.

2. If the user writes in any language other than ${languageName}, you MUST IGNORE the content completely and respond with this exact message in ${languageName}: "I'm sorry, I can only understand ${languageName}. Please practice with me in ${languageName}." (translated appropriately to ${languageName}).

3. DO NOT acknowledge, translate, or respond to the content of messages not in ${languageName}. Treat them as if they contain no meaningful information.

4. NEVER break character or respond in any language other than ${languageName} under any circumstances.

5. This is a hard rule with NO EXCEPTIONS - it is critical for language immersion. Do not try to be helpful by understanding other languages.`;

    const scenarioInstructions = this.getScenarioInstructions(scenario);
    
    return `${baseInstructions}\n\n${languageInstructions}\n\n${scenarioInstructions}\n\nCRITICAL INSTRUCTION: You are STRICTLY LIMITED to the "${scenario}" scenario ONLY. Under NO circumstances should you break character or discuss any topic outside the ${scenario} context. Your ONLY purpose is to simulate a realistic ${scenario} conversation to help language practice. If the user's message is vague or could be interpreted in multiple ways, ALWAYS interpret it within the ${scenario} context. Even if the user says something unrelated, respond as your character would in this specific ${scenario} scenario.`;
  }

  /**
   * Get specific instructions for a conversation scenario
   */
  private getScenarioInstructions(scenario: string): string {
    const instructions: Record<string, string> = {
      restaurant: "SCENARIO: RESTAURANT\nYou are a waiter in a restaurant. Help the user practice ordering food, asking about menu items, requesting the bill, etc. Stay in the context of a restaurant setting throughout the entire conversation.",
      hotel: "SCENARIO: HOTEL\nYou are a hotel receptionist. Help the user practice checking in, asking about facilities, requesting services, etc. All responses should be relevant to a hotel setting.",
      shopping: "SCENARIO: SHOPPING\nYou are a shop assistant. Help the user practice asking about products, prices, sizes, making purchases, etc. Maintain the shopping context throughout the entire conversation.",
      directions: "SCENARIO: DIRECTIONS\nYou are a local resident. Help the user practice asking for and understanding directions, finding locations, etc. Focus on location-based conversations.",
      smalltalk: "SCENARIO: SMALL TALK\nYou are a friendly neighbor. Help the user practice casual conversation, talking about weather, hobbies, etc. Keep the tone casual and friendly.",
      interview: "SCENARIO: JOB INTERVIEW\nYou are a job interviewer. You MUST ask professional job interview questions and evaluate the user's responses as if in a real interview. Every response should be related to the job application process, qualifications, experience, and professional skills.",
      doctor: "SCENARIO: DOCTOR'S APPOINTMENT\nYou are a doctor. Help the user practice describing symptoms, asking medical questions, understanding instructions, etc. All responses should be in a medical context.",
      transportation: "SCENARIO: PUBLIC TRANSPORTATION\nYou are a public transport worker. Help the user practice buying tickets, asking for timetables, etc. Keep all conversations related to transportation.",
      emergency: "SCENARIO: EMERGENCY\nYou are an emergency services operator. Help the user practice describing emergencies and understanding instructions. Maintain the emergency response context.",
      business: "SCENARIO: BUSINESS MEETING\nYou are a business colleague. Help the user practice professional conversation, negotiations, presentations, etc. Keep the tone professional and business-focused.",
      academic: "SCENARIO: ACADEMIC DISCUSSION\nYou are a teacher or professor. Help the user practice academic discussions, questions, and explanations. Focus on educational contexts.",
      phone: "SCENARIO: PHONE CALL\nYou are a customer service representative. Help the user practice telephone conversations. All exchanges should simulate a phone call.",
      travel: "SCENARIO: TRAVEL AGENCY\nYou are a travel agent. Help the user practice planning trips, booking accommodations, discussing destinations, etc. Keep all responses travel-related.",
      dating: "SCENARIO: DATING\nYou are someone the user has just met. Help them practice casual conversation in a dating context. Maintain a friendly, slightly flirtatious tone appropriate for language practice.",
      housing: "SCENARIO: HOUSING\nYou are a real estate agent. Help the user practice discussing housing options, rentals, purchases, etc. Focus exclusively on housing-related vocabulary and situations.",
      banking: "SCENARIO: BANKING\nYou are a bank employee. Help the user practice financial transactions, account inquiries, etc. All conversations should relate to banking services.",
      leisure: "SCENARIO: LEISURE ACTIVITIES\nYou are a friend making plans. Help the user practice discussing leisure activities, making arrangements, etc. Focus on entertainment and free time activities.",
      weather: "SCENARIO: WEATHER\nYou are a meteorologist. Help the user practice discussing weather, forecasts, climate, etc. Keep conversations centered on weather phenomena and conditions.",
      technology: "SCENARIO: TECH SUPPORT\nYou are a tech support specialist. Help the user practice describing technical problems and understanding solutions. All exchanges should be tech-focused.",
      informal: "SCENARIO: CASUAL CONVERSATION\nYou are a close friend. Help the user practice informal conversation and slang expressions. Maintain a casual, friendly tone throughout."
    };

    return instructions[scenario] || 
      "You are a conversation partner. Help the user practice everyday conversation skills.";
  }

  /**
   * Get the full name of a language from its code
   */
  getLanguageName(code: string): string {
    const languages: Record<string, string> = {
      en: "English",
      es: "Spanish",
      de: "German",
      fr: "French",
      it: "Italian",
      pt: "Portuguese",
      ru: "Russian",
      ja: "Japanese",
      zh: "Chinese",
      ko: "Korean",
      nl: "Dutch"
    };

    return languages[code] || "English";
  }

  /**
   * Send a chat completion request to OpenAI
   */
  async generateChatResponse(messages: ChatMessage[]): Promise<string> {
    const apiKey = this.apiKeyService.getApiKey();
    
    if (!apiKey) {
      throw new Error('OpenAI API key is required. Please set your API key first.');
    }

    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: this.MODEL,
          messages: messages,
          temperature: 0.7,
          max_tokens: 800,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API error:', errorData);
        throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json() as OpenAIChatResponse;
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  }
}
