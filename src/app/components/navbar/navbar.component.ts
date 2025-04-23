import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ApiKeyService } from '../../services/api-key.service';
import { ApiKeyModalComponent } from '../api-key-modal/api-key-modal.component';
import { DialogueSettingsModalComponent } from '../dialogue-settings-modal/dialogue-settings-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, ApiKeyModalComponent, DialogueSettingsModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  selectedLanguage = 'en';
  selectedTheme = 'light';
  selectedConversationTheme = 'restaurant';
  hasApiKey = false;
  showApiKeyModal = false;
  showDialogueSettingsModal = false;
  
  private chatService = inject(ChatService);
  private apiKeyService = inject(ApiKeyService);
  
  ngOnInit(): void {
    // Load saved preferences
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const savedConversationTheme = localStorage.getItem('conversationTheme');
    
    // Apply saved preferences if available
    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
    }
    
    // Always use light theme
    this.selectedTheme = 'light';
    this.applyTheme('light');
    
    if (savedConversationTheme) {
      this.selectedConversationTheme = savedConversationTheme;
    }
    
    // Subscribe to API key status changes
    this.apiKeyService.hasApiKey$.subscribe(hasKey => {
      this.hasApiKey = hasKey;
    });
  }
  
  setLanguage(lang: string): void {
    this.selectedLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    console.log(`Language set to: ${lang}`);
    
    // Update the current language in the chat service
    this.chatService.updateScenario(this.selectedConversationTheme, lang);
  }
  
  setTheme(theme: string): void {
    this.selectedTheme = theme;
    localStorage.setItem('preferredTheme', theme);
    this.applyTheme(theme);
  }
  
  setConversationTheme(theme: string): void {
    this.selectedConversationTheme = theme;
    localStorage.setItem('conversationTheme', theme);
    console.log(`Conversation theme set to: ${theme}`);
    
    // Update the current scenario in the chat service
    this.chatService.updateScenario(theme, this.selectedLanguage);
  }
  
  openDialogueSettingsModal(): void {
    this.showDialogueSettingsModal = true;
  }
  
  closeDialogueSettingsModal(): void {
    this.showDialogueSettingsModal = false;
  }
  
  startNewDialogue(settings?: {language: string, scenario: string}): void {
    // If settings are provided, update the local values
    if (settings) {
      this.selectedLanguage = settings.language;
      this.selectedConversationTheme = settings.scenario;
      
      // Save to localStorage
      localStorage.setItem('preferredLanguage', this.selectedLanguage);
      localStorage.setItem('conversationTheme', this.selectedConversationTheme);
    }
    
    // Start new conversation through the chat service
    this.chatService.startNewDialogue(
      this.selectedConversationTheme, 
      this.selectedLanguage
    );
    
    // Close the modal if it was open
    this.closeDialogueSettingsModal();
  }
  
  /**
   * Open the API key modal
   */
  openApiKeyModal(): void {
    this.showApiKeyModal = true;
  }
  
  /**
   * Close the API key modal
   */
  closeApiKeyModal(): void {
    this.showApiKeyModal = false;
  }
  
  private applyTheme(theme: string): void {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    console.log(`UI theme set to: ${theme}`);
  }
}
