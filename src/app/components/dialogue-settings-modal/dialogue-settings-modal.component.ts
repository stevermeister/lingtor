import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialogue-settings-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dialogue-settings-modal.component.html',
  styleUrl: './dialogue-settings-modal.component.scss'
})
export class DialogueSettingsModalComponent {
  @Input() show = false;
  @Input() selectedLanguage = 'en';
  @Input() selectedScenario = 'restaurant';
  
  @Output() close = new EventEmitter<void>();
  @Output() startDialogue = new EventEmitter<{language: string, scenario: string}>();
  @Output() languageChange = new EventEmitter<string>();
  @Output() scenarioChange = new EventEmitter<string>();
  
  tempLanguage = 'en';
  tempScenario = 'restaurant';
  
  ngOnChanges(): void {
    // When the modal opens, initialize the temporary values
    if (this.show) {
      this.tempLanguage = this.selectedLanguage;
      this.tempScenario = this.selectedScenario;
    }
  }
  
  closeModal(): void {
    this.close.emit();
  }
  
  startNewDialogue(): void {
    this.startDialogue.emit({
      language: this.tempLanguage,
      scenario: this.tempScenario
    });
    this.closeModal();
  }
  
  updateLanguage(lang: string): void {
    this.tempLanguage = lang;
  }
  
  updateScenario(scenario: string): void {
    this.tempScenario = scenario;
  }
}
