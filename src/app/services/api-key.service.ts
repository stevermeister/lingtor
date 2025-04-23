import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {
  private readonly API_KEY_STORAGE_KEY = 'openai_api_key';
  private hasApiKeySubject = new BehaviorSubject<boolean>(false);
  
  constructor() {
    // Check if API key exists on initialization
    this.checkForExistingKey();
  }
  
  /**
   * Get the status of whether an API key is stored
   */
  get hasApiKey$(): Observable<boolean> {
    return this.hasApiKeySubject.asObservable();
  }
  
  /**
   * Save the API key to localStorage
   */
  saveApiKey(apiKey: string): void {
    if (!apiKey || apiKey.trim() === '') {
      throw new Error('API key cannot be empty');
    }
    
    // Basic validation that it looks like an OpenAI key
    if (!apiKey.startsWith('sk-') || apiKey.length < 20) {
      throw new Error('Invalid API key format. OpenAI keys typically start with "sk-"');
    }
    
    // Store the key with simple obfuscation (not truly secure but better than plaintext)
    const encodedKey = btoa(apiKey);
    localStorage.setItem(this.API_KEY_STORAGE_KEY, encodedKey);
    this.hasApiKeySubject.next(true);
  }
  
  /**
   * Get the stored API key
   */
  getApiKey(): string | null {
    const encodedKey = localStorage.getItem(this.API_KEY_STORAGE_KEY);
    if (!encodedKey) {
      return null;
    }
    
    try {
      return atob(encodedKey);
    } catch (error) {
      console.error('Error decoding API key', error);
      return null;
    }
  }
  
  /**
   * Remove the stored API key
   */
  removeApiKey(): void {
    localStorage.removeItem(this.API_KEY_STORAGE_KEY);
    this.hasApiKeySubject.next(false);
  }
  
  /**
   * Check if a key is already stored
   */
  private checkForExistingKey(): void {
    const hasKey = !!localStorage.getItem(this.API_KEY_STORAGE_KEY);
    this.hasApiKeySubject.next(hasKey);
  }
  
  /**
   * Validate an API key with OpenAI
   * Returns a promise that resolves to a boolean indicating if the key is valid
   */
  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error validating API key', error);
      return false;
    }
  }
}
