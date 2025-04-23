import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="avatarClasses">
      <img [src]="avatarUrl" alt="Profile avatar" class="avatar-image">
    </div>
  `,
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnChanges {
  @Input() avatarType: 'user' | 'role' = 'user';
  @Input() roleIcon: string = 'assistant';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  avatarUrl: SafeUrl;
  
  // Mapping of roles to specific avatar styles for better avatars
  // Using only valid DiceBear API v7.x styles
  private readonly roleMap: { [key: string]: string } = {
    'restaurant': 'avataaars',      // Waiter
    'hotel': 'avataaars',           // Receptionist
    'interview': 'micah',           // Interviewer
    'doctor': 'micah',              // Doctor
    'shopping': 'avataaars',        // Shop Assistant
    'business': 'bottts',           // Business Partner
    'academic': 'micah',            // Professor
    'assistant': 'avataaars',       // Assistant
    'technology': 'micah',          // IT Specialist
    'directions': 'avataaars',      // Local Guide
    'emergency': 'bottts',          // Emergency Operator
    'smalltalk': 'avataaars',       // Friendly Neighbor
    'transportation': 'bottts',     // Transport Worker
    'weather': 'micah',             // Meteorologist
    'dating': 'avataaars',          // Date Partner
    'banking': 'bottts',            // Bank Teller
    'leisure': 'avataaars',         // Friend
    'informal': 'avataaars'         // Friend
  };
  
  // Specific seeds to keep consistency for each role
  private readonly roleSeeds: { [key: string]: string } = {
    'restaurant': 'waiter123',
    'hotel': 'receptionist123',
    'interview': 'interviewer123',
    'doctor': 'doctor123',
    'shopping': 'shopassistant123',
    'business': 'businesspartner123',
    'academic': 'professor123',
    'assistant': 'assistant123',
    'technology': 'itspecialist123',
    'directions': 'localguide123',
    'emergency': 'emergency123',
    'smalltalk': 'neighbor123',
    'transportation': 'transport123',
    'weather': 'meteorologist123',
    'dating': 'date123',
    'banking': 'banker123',
    'leisure': 'leisurefriend123',
    'informal': 'informalfriend123'
  };
  
  constructor(private sanitizer: DomSanitizer) {
    this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl('');
    this.updateAvatar();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // Explicitly check if the roleIcon input changed
    if (changes['roleIcon'] || changes['avatarType']) {
      // Add a small timeout to ensure DOM is ready
      setTimeout(() => this.updateAvatar(), 0);
    }
  }
  
  /**
   * Get CSS classes for the avatar
   */
  get avatarClasses(): string {
    return `avatar avatar-${this.avatarType} avatar-size-${this.size}`;
  }
  
  /**
   * Update the avatar URL based on the role or user type
   */
  private updateAvatar(): void {
    let url: string;
    
    if (this.avatarType === 'user') {
      // Use a big smiley face for user avatar
      url = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23ffde34"/><circle cx="35" cy="40" r="5" fill="%23000"/><circle cx="65" cy="40" r="5" fill="%23000"/><path d="M25,65 Q50,85 75,65" stroke="%23000" stroke-width="5" fill="none"/></svg>';
    } else {
      // Ensure we have a valid roleIcon
      const roleIcon = this.roleIcon || 'assistant';
      
      // Get avatar style based on role - ensure we use a valid DiceBear style
      // Valid styles include: 'avataaars', 'bottts', 'micah', etc.
      const avatarStyle = this.roleMap[roleIcon] || 'avataaars';
      const seed = this.roleSeeds[roleIcon] || roleIcon;
      
      // Add style-specific options and a cache-busting parameter
      let styleOptions = '';
      if (avatarStyle === 'avataaars') {
        styleOptions = '&backgroundColor=b6e3f4,ffdfbf,ffd5dc,d1d4f9';
      } else if (avatarStyle === 'bottts') {
        styleOptions = '&colorful=1&mouthColor=ffffff,000000';
      } else if (avatarStyle === 'micah') {
        styleOptions = '&baseColor=f9c9b6,ea8ab4,ffdfbf';
      }
      
      // Generate URL for the role avatar with different styles per role
      url = `https://api.dicebear.com/7.x/${avatarStyle}/png?seed=${seed}${styleOptions}&cacheBuster=${new Date().getTime()}`;
      
      console.log(`Avatar updated for role: ${roleIcon}, using style: ${avatarStyle}`);
    }
    
    this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
