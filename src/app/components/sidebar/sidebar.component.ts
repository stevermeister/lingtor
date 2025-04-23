import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  // Navigation menu removed as requested
  
  /**
   * Handle finish chat button click
   */
  finishChat(): void {
    // Show confirmation dialog
    if (confirm('Are you sure you want to finish this chat session?')) {
      console.log('Chat session finished');
      // Here you would handle ending the session, saving data, etc.
    }
  }
}
