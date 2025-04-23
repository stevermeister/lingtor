import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiKeyService } from '../../services/api-key.service';

@Component({
  selector: 'app-api-key-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './api-key-modal.component.html',
  styleUrl: './api-key-modal.component.scss'
})
export class ApiKeyModalComponent {
  @Output() close = new EventEmitter<void>();
  
  apiKey = '';
  isVisible = true;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  
  private apiKeyService = inject(ApiKeyService);
  
  /**
   * Check if an API key exists already
   */
  get hasExistingKey(): boolean {
    return !!this.apiKeyService.getApiKey();
  }
  
  /**
   * Display the last 5 characters of the API key
   */
  get maskedApiKey(): string {
    const key = this.apiKeyService.getApiKey();
    if (!key) return '';
    
    return '••••••••••••' + key.substring(key.length - 5);
  }
  
  /**
   * Save the API key
   */
  async saveApiKey(): Promise<void> {
    if (!this.apiKey.trim()) {
      this.errorMessage = 'Please enter an API key';
      return;
    }
    
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;
    
    try {
      // Validate the API key format
      if (!this.apiKey.startsWith('sk-') || this.apiKey.length < 20) {
        this.errorMessage = 'Invalid API key format. OpenAI keys typically start with "sk-"';
        this.isLoading = false;
        return;
      }
      
      // Validate with OpenAI API
      const isValid = await this.apiKeyService.validateApiKey(this.apiKey);
      
      if (!isValid) {
        this.errorMessage = 'Invalid API key. Please check your key and try again.';
        this.isLoading = false;
        return;
      }
      
      // Save the API key
      this.apiKeyService.saveApiKey(this.apiKey);
      this.successMessage = 'API key saved successfully!';
      this.apiKey = '';
      
      // Close the modal after a short delay
      setTimeout(() => {
        this.closeModal();
      }, 1500);
      
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred while saving the API key';
    } finally {
      this.isLoading = false;
    }
  }
  
  /**
   * Remove the API key
   */
  removeApiKey(): void {
    if (confirm('Are you sure you want to remove your API key?')) {
      this.apiKeyService.removeApiKey();
      this.successMessage = 'API key removed successfully!';
      this.errorMessage = '';
      
      // Reset after a delay
      setTimeout(() => {
        this.successMessage = '';
      }, 1500);
    }
  }
  
  /**
   * Close the modal
   */
  closeModal(): void {
    this.isVisible = false;
    this.close.emit();
  }
}
