import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';
import { OpenAIService, ChatMessage } from './openai.service';
import { ApiKeyService } from './api-key.service';
import { ScenarioService } from './scenario.service';

// Define conversation starters for each scenario
const SCENARIO_STARTERS: Record<string, string> = {
  restaurant: "Welcome to our restaurant! How can I assist you today?",
  hotel: "Welcome to our hotel! How may I help you with your check-in?",
  shopping: "Hello and welcome to our store! Are you looking for something specific today?",
  directions: "Hello there! You look a bit lost. Can I help you find your way?",
  smalltalk: "Hi! Nice weather we're having today, isn't it?",
  interview: "Thank you for coming in today. Could you tell me a bit about yourself?",
  doctor: "Good morning! What brings you to the clinic today?",
  transportation: "Hello! Where would you like to go today?",
  emergency: "Emergency services, what's your emergency?",
  business: "Welcome everyone to our meeting. Shall we go through today's agenda?",
  academic: "Let's discuss the main themes in the article we read for today.",
  phone: "Hello, you've reached customer service. How may I assist you?",
  travel: "Welcome to our travel agency! Where are you thinking of traveling to?",
  dating: "It's nice to finally meet you! Tell me something about yourself.",
  housing: "Welcome to our real estate office. Are you looking to rent or buy?",
  banking: "Good morning! How can I help you with your banking needs today?",
  leisure: "What kind of activities do you enjoy in your free time?",
  weather: "Quite a change in the weather today, isn't it? What's it like where you live?",
  technology: "I see you're having some technical issues. Could you describe the problem?",
  informal: "Hey! How's it going? What's new with you?"
};

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$: Observable<Message[]> = this.messagesSubject.asObservable();
  
  private currentScenarioSubject = new BehaviorSubject<string>('restaurant');
  public currentScenario$: Observable<string> = this.currentScenarioSubject.asObservable();
  
  private currentScenario = 'restaurant';
  private currentLanguage = 'en';
  private isGeneratingResponse = false;
  private currentRoleName = 'Assistant';
  
  private openaiService = inject(OpenAIService);
  private apiKeyService = inject(ApiKeyService);
  private scenarioService = inject(ScenarioService);

  constructor() {
    // Initialize with default message
    this.startNewDialogue('restaurant', 'en');
  }
  
  /**
   * Generate a response using OpenAI API
   * @param messages Current conversation messages
   * @returns Promise with the generated response
   */
  private async generateOpenAIResponse(messages: Message[]): Promise<string> {
    // Convert our messages to the format expected by OpenAI
    const openAIMessages: ChatMessage[] = [];
    
    // Add system message
    openAIMessages.push({
      role: 'system',
      content: this.openaiService.generateSystemMessage(this.currentScenario, this.currentLanguage)
    });
    
    // Add conversation history (limit to last 10 messages to avoid token limit)
    const recentMessages = messages.slice(-10);
    
    for (const message of recentMessages) {
      openAIMessages.push({
        role: message.sender === 'user' ? 'user' : 'assistant',
        content: message.content
      });
    }
    
    // Generate response
    return this.openaiService.generateChatResponse(openAIMessages);
  }

  /**
   * Get the current messages in the chat
   */
  getMessages(): Message[] {
    return this.messagesSubject.getValue();
  }

  /**
   * Add a new message to the conversation
   * @param content The message content
   */
  async addMessage(content: string): Promise<void> {
    if (!content.trim() || this.isGeneratingResponse) return;
    
    const currentMessages = this.messagesSubject.getValue();
    
    // Add user message
    const userMessage: Message = {
      id: this.generateId(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    const updatedMessages = [...currentMessages, userMessage];
    this.messagesSubject.next(updatedMessages);
    
    // Check if API key exists
    if (!this.apiKeyService.getApiKey()) {
      // Add system notification about missing API key
      const errorMessage: Message = {
        id: this.generateId(),
        content: 'Please set your OpenAI API key to continue the conversation. Click the API Key button in the navbar.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      this.messagesSubject.next([...updatedMessages, errorMessage]);
      return;
    }
    
    try {
      this.isGeneratingResponse = true;
      
      // Generate bot response using OpenAI
      const botResponse = await this.generateOpenAIResponse(updatedMessages);
      
      const botMessage: Message = {
        id: this.generateId(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      this.messagesSubject.next([...updatedMessages, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: this.generateId(),
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      this.messagesSubject.next([...updatedMessages, errorMessage]);
    } finally {
      this.isGeneratingResponse = false;
    }
  }

  /**
   * Generate a unique ID for a message
   */
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substring(2, 9);
  }

  /**
   * Update the current scenario and language without starting a new dialogue
   * @param scenario The conversation scenario to use
   * @param language The language code (en, es, de, etc.)
   */
  updateScenario(scenario: string, language: string): void {
    this.currentScenario = scenario;
    this.currentLanguage = language;
    this.currentScenarioSubject.next(scenario);
    console.log(`Updated scenario to: ${scenario}, language: ${language} (conversation continues)`);
  }
  
  /**
   * Get the current language code
   * @returns The current language code (en, es, de, etc.)
   */
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  /**
   * Get the first message in the selected language for a specific scenario
   * @param scenario The conversation scenario
   * @param language The language code
   * @returns Promise with the translated first message
   */
  private async getFirstMessageInLanguage(scenario: string, language: string): Promise<string> {
    try {
      // Check if API key exists
      if (!this.apiKeyService.getApiKey()) {
        return 'Please set your OpenAI API key to continue the conversation. Click the API Key button in the navbar.';
      }
      
      // Create a system message for translation
      const openAIMessages: ChatMessage[] = [
        {
          role: 'system',
          content: this.openaiService.generateSystemMessage(scenario, language)
        },
        {
          role: 'user',
          content: `Please provide a friendly greeting and introduction as ${this.currentRoleName} the ${this.scenarioService.getScenarioInfo(scenario).roleTitle}. It should be appropriate for the ${scenario} scenario and written in ${this.openaiService.getLanguageName(language)}. Make it casual, friendly and about 15-25 words.`
        }
      ];
      
      // Generate a localized first message
      return await this.openaiService.generateChatResponse(openAIMessages);
    } catch (error) {
      console.error('Error generating first message:', error);
      return SCENARIO_STARTERS[scenario] || "Hello! I'm here to help you practice your language skills. How can I assist you today?";
    }
  }

  /**
   * Start a new dialogue with a scenario-specific starter message
   * @param scenario The conversation scenario to use
   * @param language The language code (en, es, de, etc.)
   */
  async startNewDialogue(scenario: string, language: string): Promise<void> {
    // Update current scenario and language
    this.currentScenario = scenario;
    this.currentLanguage = language;
    this.currentScenarioSubject.next(scenario);
    
    // Get scenario info
    const scenarioInfo = this.scenarioService.getScenarioInfo(scenario);
    this.currentRoleName = scenarioInfo.roleName;
    
    // Clear messages
    this.messagesSubject.next([]);
    
    // Add initial loading message
    const loadingMessage: Message = {
      id: this.generateId(),
      content: `🔄 Starting new dialogue: ${scenarioInfo.title}...`,
      sender: 'system',
      timestamp: new Date(),
      isLoading: true
    };
    
    this.messagesSubject.next([loadingMessage]);
    
    try {
      // Get the first message in the selected language
      const firstMessageContent = await this.getFirstMessageInLanguage(scenario, language);
      
      // Now update with the complete sequence of messages
      const scenarioMessage: Message = {
        id: loadingMessage.id, // Replace the loading message
        content: `🔄 Starting new dialogue: ${scenarioInfo.title}`,
        sender: 'system',
        timestamp: new Date()
      };
      
      // Add system message for character joining
      const characterMessage: Message = {
        id: this.generateId(),
        content: `👋 ${scenarioInfo.roleName} the ${scenarioInfo.roleTitle} has joined the chat`,
        sender: 'system',
        timestamp: new Date(new Date().getTime() + 100) // slightly later timestamp
      };
      
      // Add starter message from the character in the correct language
      const botMessage: Message = {
        id: this.generateId(),
        content: firstMessageContent,
        sender: 'bot',
        timestamp: new Date(new Date().getTime() + 200) // slightly later timestamp
      };
      
      // Add all messages to begin the conversation
      this.messagesSubject.next([scenarioMessage, characterMessage, botMessage]);
    } catch (error) {
      console.error('Error starting dialogue:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: this.generateId(),
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        sender: 'system',
        timestamp: new Date()
      };
      
      this.messagesSubject.next([loadingMessage, errorMessage]);
    }
    
    // Log the new conversation start
    console.log(`Started new ${language} dialogue with scenario: ${scenario}, character: ${scenarioInfo.roleName}`);
  }
  /**
   * Initialize chat with demo messages
   */
  private initializeDemoChat(): void {
    const initialMessages: Message[] = [
      {
        id: this.generateId(),
        content: 'Hi, can we talk about travel?',
        sender: 'user',
        timestamp: new Date(Date.now() - 5 * 60000)
      },
      {
        id: this.generateId(),
        content: "Sure! What's your skill level?",
        sender: 'bot',
        timestamp: new Date(Date.now() - 4 * 60000)
      },
      {
        id: this.generateId(),
        content: "I'm at A2 level.",
        sender: 'user',
        timestamp: new Date(Date.now() - 3 * 60000)
      },
      {
        id: this.generateId(),
        content: "Great! Let's start with some basic phrases.",
        sender: 'bot',
        timestamp: new Date(Date.now() - 2 * 60000)
      }
    ];

    this.messagesSubject.next(initialMessages);
  }
}
