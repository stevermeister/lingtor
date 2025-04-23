/**
 * Avatar SVG library
 * This provides stylized avatar faces for different roles
 */

export const avatarFaces: Record<string, string> = {
  // User avatar
  user: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#FF5733" opacity="0.1"/>
    <circle cx="18" cy="14" r="6" fill="#FF5733" opacity="0.7"/>
    <path d="M30 32c0-6.627-5.373-12-12-12S6 25.373 6 32" fill="#FF5733" opacity="0.4"/>
  </svg>`,
  
  // Restaurant - Waiter
  restaurant: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#FF9500" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#FF9500" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#FF9500" opacity="0.2"/>
    <path d="M22 11a4 4 0 01-8 0" stroke="#FF9500" stroke-width="1.5"/>
    <path d="M14 17c2 1 6 1 8 0M13 10c0-2 1-4 5-4s5 2 5 4" stroke="#FF9500" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#FF9500"/>
    <path d="M23 14v-4h2M13 14v-4h-2" stroke="#FF9500" stroke-width="1.5"/>
  </svg>`,
  
  // Hotel - Receptionist
  hotel: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#AF52DE" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#AF52DE" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#AF52DE" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#AF52DE" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#AF52DE"/>
    <path d="M23 9c0 4-5 5-5 5s-5-1-5-5" stroke="#AF52DE" stroke-width="1.5"/>
    <path d="M15 9a3 3 0 116 0 3 3 0 01-6 0z" fill="#AF52DE" opacity="0.2" stroke="#AF52DE" stroke-width="1.5"/>
  </svg>`,
  
  // Shopping - Shop Assistant
  shopping: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#5AC8FA" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#5AC8FA" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#5AC8FA" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#5AC8FA" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#5AC8FA"/>
    <path d="M16 10c-1-1.5.5-3 2-3s3 1.5 2 3M12 11c1-1 2-2 4-2h4c2 0 3 1 4 2" stroke="#5AC8FA" stroke-width="1.5"/>
  </svg>`,
  
  // Interview - Job Interviewer
  interview: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#FF3B30" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#FF3B30" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#FF3B30" opacity="0.2"/>
    <path d="M14 16.5c2 1 6 1 8 0" stroke="#FF3B30" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#FF3B30"/>
    <path d="M13 8c1-1 2.5-2 5-2s4 1 5 2" stroke="#FF3B30" stroke-width="1.5"/>
    <path d="M24 11c-.5-2-3-4-6-4s-5.5 2-6 4" stroke="#FF3B30" stroke-width="1.5"/>
    <path d="M13 11h2.5M23 11h-2.5" stroke="#FF3B30" stroke-width="1.5"/>
  </svg>`,
  
  // Doctor
  doctor: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#5856D6" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#5856D6" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#5856D6" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#5856D6" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#5856D6"/>
    <path d="M12 13c0-4 2-6 6-6s6 2 6 6" stroke="#5856D6" stroke-width="1.5"/>
    <path d="M18 4v3M16.5 7h3" stroke="#5856D6" stroke-width="1.5"/>
  </svg>`,
  
  // Business - Business Partner
  business: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#007AFF" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#007AFF" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#007AFF" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#007AFF" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#007AFF"/>
    <path d="M24 10c-.5-2-3-4-6-4s-5.5 2-6 4" stroke="#007AFF" stroke-width="1.5"/>
    <path d="M14 9h8M14 12h8" stroke="#007AFF" stroke-width="1.5"/>
  </svg>`,
  
  // Academic - Professor
  academic: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#5856D6" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#5856D6" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#5856D6" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#5856D6" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#5856D6"/>
    <path d="M13 8c1-1 2.5-2 5-2s4 1 5 2" stroke="#5856D6" stroke-width="1.5"/>
    <path d="M25 10.5c0 .83-.67 1.5-1.5 1.5S22 11.33 22 10.5 22.67 9 23.5 9s1.5.67 1.5 1.5zM14 10.5c0 .83-.67 1.5-1.5 1.5S11 11.33 11 10.5 11.67 9 12.5 9s1.5.67 1.5 1.5z" fill="#5856D6" opacity="0.5"/>
  </svg>`,
  
  // Directions - Local Guide
  directions: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#007AFF" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#007AFF" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#007AFF" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#007AFF" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#007AFF"/>
    <path d="M18 7c-2 0-3 1-3 3s1.5 4 3 4 3-2 3-4-1-3-3-3z" fill="#007AFF" opacity="0.3" stroke="#007AFF" stroke-width="1"/>
    <path d="M15 10h6" stroke="#007AFF" stroke-width="1"/>
  </svg>`,
  
  // Smalltalk - Friendly Neighbor
  smalltalk: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#34C759" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#34C759" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#34C759" opacity="0.2"/>
    <path d="M14 16.5c2 1.5 6 1.5 8 0" stroke="#34C759" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#34C759"/>
    <path d="M13 11c0-3 2-5 5-5s5 2 5 5" stroke="#34C759" stroke-width="1.5"/>
  </svg>`,
  
  // Transportation - Transport Worker
  transportation: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#FF9500" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#FF9500" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#FF9500" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#FF9500" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#FF9500"/>
    <path d="M24 8h-4v3h4a1 1 0 001-1V9a1 1 0 00-1-1z" fill="#FF9500" opacity="0.3"/>
    <path d="M12 8h4v3h-4a1 1 0 01-1-1V9a1 1 0 011-1z" fill="#FF9500" opacity="0.3"/>
  </svg>`,
  
  // Emergency - Emergency Operator
  emergency: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#FF3B30" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#FF3B30" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#FF3B30" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#FF3B30" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#FF3B30"/>
    <path d="M16 8v4M14 10h4" stroke="#FF3B30" stroke-width="1.5"/>
  </svg>`,
  
  // Phone - Customer Service Rep
  phone: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#FF9500" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#FF9500" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#FF9500" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#FF9500" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#FF9500"/>
    <path d="M24 8c0 .5-.5 1-1 1h-2a1 1 0 01-1-1V7a1 1 0 011-1h2a1 1 0 011 1v1z" fill="#FF9500" opacity="0.3"/>
    <path d="M14 11c2-2 6-2 8 0" stroke="#FF9500" stroke-width="1.5"/>
  </svg>`,
  
  // Travel - Travel Agent
  travel: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#5AC8FA" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#5AC8FA" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#5AC8FA" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#5AC8FA" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#5AC8FA"/>
    <path d="M13 9a5 5 0 0110 0" stroke="#5AC8FA" stroke-width="1.5"/>
    <path d="M13 9h10" stroke="#5AC8FA" stroke-width="1.5"/>
  </svg>`,
  
  // Dating - Date Partner
  dating: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#FF2D55" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#FF2D55" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#FF2D55" opacity="0.2"/>
    <path d="M14 16.5c2 1.5 6 1.5 8 0" stroke="#FF2D55" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#FF2D55"/>
    <path d="M21 7c-.75.67-2 2-3 2-1 0-2.25-1.33-3-2" stroke="#FF2D55" stroke-width="1.5"/>
    <path d="M12.5 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM23.5 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="#FF2D55" opacity="0.3"/>
  </svg>`,
  
  // Housing - Real Estate Agent
  housing: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#34C759" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#34C759" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#34C759" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#34C759" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#34C759"/>
    <path d="M18 9l-5 4h10l-5-4z" fill="#34C759" opacity="0.3"/>
  </svg>`,
  
  // Banking - Bank Teller
  banking: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#007AFF" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#007AFF" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#007AFF" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#007AFF" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#007AFF"/>
    <path d="M14 10a4 4 0 118 0" stroke="#007AFF" stroke-width="1.5"/>
    <path d="M14 10h8" stroke="#007AFF" stroke-width="1.5"/>
    <path d="M18 6v2" stroke="#007AFF" stroke-width="1.5"/>
  </svg>`,
  
  // Leisure - Friend
  leisure: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#5AC8FA" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#5AC8FA" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#5AC8FA" opacity="0.2"/>
    <path d="M14 16c2 2 6 2 8 0" stroke="#5AC8FA" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#5AC8FA"/>
    <path d="M24 8c-1 2-3.5 3-6 3s-5-1-6-3" stroke="#5AC8FA" stroke-width="1.5"/>
  </svg>`,
  
  // Weather - Meteorologist
  weather: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#FF9500" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#FF9500" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#FF9500" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#FF9500" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#FF9500"/>
    <path d="M14 9a4 4 0 018 0" stroke="#FF9500" stroke-width="1.5"/>
    <path d="M22 9h-8M15 6l3 3M21 6l-3 3" stroke="#FF9500" stroke-width="1.5"/>
  </svg>`,
  
  // Technology - IT Specialist
  technology: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#5856D6" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#5856D6" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#5856D6" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#5856D6" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#5856D6"/>
    <path d="M24 9h-3M12 9h3M16 6l2 3M20 6l-2 3" stroke="#5856D6" stroke-width="1.5"/>
  </svg>`,
  
  // Informal - Friend
  informal: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#FF2D55" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#FF2D55" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#FF2D55" opacity="0.2"/>
    <path d="M14 16c2 2 6 2 8 0" stroke="#FF2D55" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#FF2D55"/>
    <path d="M13 10c1-2 3-2 5-2s4 0 5 2" stroke="#FF2D55" stroke-width="1.5"/>
  </svg>`,
  
  // Default assistant avatar for other scenarios
  assistant: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#FF5733" opacity="0.1"/>
    <circle cx="18" cy="13" r="7" fill="#FF5733" opacity="0.2"/>
    <path d="M18 20c-5 0-9 3-9 8h18c0-5-4-8-9-8z" fill="#FF5733" opacity="0.2"/>
    <path d="M14 17c2 1 6 1 8 0" stroke="#FF5733" stroke-width="1.5"/>
    <path d="M16 15a1 1 0 100-2 1 1 0 000 2zM20 15a1 1 0 100-2 1 1 0 000 2z" fill="#FF5733"/>
  </svg>`
};

// Get a face SVG for a specific role
export function getAvatarFace(role: string): string {
  return avatarFaces[role] || avatarFaces['assistant'];
}
