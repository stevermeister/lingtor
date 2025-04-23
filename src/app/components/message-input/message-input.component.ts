import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent implements OnInit {
  // Output event emitter to send the message to the parent component
  @Output() sendMessage = new EventEmitter<string>();
  
  // Holds the current message text
  messageText = '';
  // Current language of the chat
  currentLanguage = 'en';
  // Shows error message when language mismatch detected
  languageError = false;
  // Stores the error message
  errorMessage = '';
  
  private chatService = inject(ChatService);
  
  ngOnInit(): void {
    // Subscribe to the current scenario to get the language
    this.chatService.currentScenario$.subscribe(() => {
      this.currentLanguage = this.chatService.getCurrentLanguage();
      console.log(`Message input now expects language: ${this.currentLanguage}`);
    });
  }
  
  /**
   * Check if the message is in the expected language
   * @returns True if language check passes
   */
  validateMessageLanguage(): boolean {
    // If message is very short, let it through (could be "OK", "Hi", etc)
    if (this.messageText.trim().length <= 3) {
      return true;
    }
    
    // Simple language heuristics for basic frontend validation
    // This is a very simple check that looks for language-specific patterns
    const text = this.messageText.toLowerCase();
    let failedCheck = false;
    
    // Only do checks for languages we have specific patterns for
    if (['en', 'es', 'de', 'nl'].includes(this.currentLanguage)) {
      // Check for non-Latin characters (Cyrillic, etc)
      if (/[а-яА-ЯёЁ\u0400-\u04FF]/.test(text)) {
        failedCheck = true;
      }
      
      // Check language-specific patterns
      if (this.currentLanguage !== 'en' && /\b(the|and|of|is|are|been|have|has|was|were|will|would|could|should|with|for|this|that|these|those|there|their|they|them|then|than)\b/.test(text)) {
        failedCheck = true;
      }
      
      if (this.currentLanguage !== 'es' && /\b(el|la|los|las|en|es|una|uno|pero|como|para|por|con|sin|sobre|desde|hasta|hacia|según|durante|mediante|entre|contra)\b/.test(text) || /[áéíóúñ¿¡]/.test(text)) {
        failedCheck = true;
      }
      
      if (this.currentLanguage !== 'de' && /\b(der|die|das|ein|eine|einen|zu|aus|bei|nach|von|vor|für|mit|durch|gegen|ohne|um|an|auf|unter|über|neben|zwischen|hinter)\b/.test(text) || /[äöüß]/.test(text)) {
        failedCheck = true;
      }
      
      if (this.currentLanguage !== 'nl' && /\b(de|het|een|in|op|van|met|door|aan|uit|naar|over|onder|zonder|tegen|tussen|achter|voor|naast|binnen|buiten)\b/.test(text) || /[ĳ]/.test(text)) {
        failedCheck = true;
      }
    }
    
    if (failedCheck) {
      // Set error message in the appropriate language
      switch (this.currentLanguage) {
        case 'es':
          this.errorMessage = 'Por favor, escribe en español.';
          break;
        case 'de':
          this.errorMessage = 'Bitte schreiben Sie auf Deutsch.';
          break;
        case 'nl':
          this.errorMessage = 'Schrijf alstublieft in het Nederlands.';
          break;
        default:
          this.errorMessage = 'Please write in the selected language.';
      }
      
      this.languageError = true;
      
      // Auto-clear error after 3 seconds
      setTimeout(() => {
        this.languageError = false;
      }, 3000);
      
      return false;
    }
    
    return true;
  }
  
  /**
   * Handle sending a message
   */
  onSendMessage(): void {
    if (this.messageText.trim()) {
      // Check if message is in the expected language
      if (!this.validateMessageLanguage()) {
        return;
      }
      
      // Emit the message to the parent component
      this.sendMessage.emit(this.messageText);
      
      // Clear the input field
      this.messageText = '';
      this.languageError = false;
    }
  }
}
