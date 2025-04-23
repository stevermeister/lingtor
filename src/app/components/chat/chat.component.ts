import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Message } from '../../models/message';
import { ChatService } from '../../services/chat.service';
import { MessageInputComponent } from '../message-input/message-input.component';
import { ScenarioService } from '../../services/scenario.service';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MessageInputComponent, AvatarComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  currentRoleName = '';
  currentRoleIcon = 'assistant';
  private messagesSubscription!: Subscription;
  private currentScenarioSubscription!: Subscription;
  
  @ViewChild('chatMessagesContainer') private chatContainer!: ElementRef;
  
  constructor(private chatService: ChatService, private scenarioService: ScenarioService) {}
  
  ngOnInit(): void {
    // Subscribe to messages from the chat service
    this.messagesSubscription = this.chatService.messages$.subscribe(messages => {
      this.messages = messages;
      // Scroll to bottom after view is updated
      setTimeout(() => this.scrollToBottom(), 0);
    });
    
    // Subscribe to current scenario to update role name and icon
    this.currentScenarioSubscription = this.chatService.currentScenario$.subscribe(scenario => {
      const scenarioInfo = this.scenarioService.getScenarioInfo(scenario);
      // Update properties with a small delay to ensure Angular change detection catches up
      setTimeout(() => {
        this.currentRoleName = `${scenarioInfo.roleName}`;
        this.currentRoleIcon = scenarioInfo.avatarIcon;
        console.log(`Chat updated to scenario: ${scenario}, role: ${this.currentRoleName}, icon: ${this.currentRoleIcon}`);
      }, 0);
    });
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions when component is destroyed
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
    
    if (this.currentScenarioSubscription) {
      this.currentScenarioSubscription.unsubscribe();
    }
  }
  
  /**
   * Send a message to the chat
   * @param content The message content
   */
  async sendMessage(content: string): Promise<void> {
    await this.chatService.addMessage(content);
  }
  
  /**
   * Scroll chat to the latest message
   */
  private scrollToBottom(): void {
    try {
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      // Silently handle error in case view is not initialized
      console.error('Error scrolling to bottom:', err);
    }
  }
}
