import { Injectable } from '@angular/core';

export interface ScenarioInfo {
  title: string;
  roleName: string;
  roleTitle: string;
  avatarIcon: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {
  private scenarioInfoMap: Record<string, ScenarioInfo> = {
    restaurant: { 
      title: 'Restaurant Conversation', 
      roleName: 'Miguel', 
      roleTitle: 'Waiter',
      avatarIcon: 'restaurant'
    },
    hotel: { 
      title: 'Hotel Check-in', 
      roleName: 'Sarah', 
      roleTitle: 'Receptionist',
      avatarIcon: 'hotel'
    },
    shopping: { 
      title: 'Shopping Experience', 
      roleName: 'Emma', 
      roleTitle: 'Shop Assistant',
      avatarIcon: 'shopping'
    },
    directions: { 
      title: 'Asking for Directions', 
      roleName: 'David', 
      roleTitle: 'Local Resident',
      avatarIcon: 'directions'
    },
    smalltalk: { 
      title: 'Casual Conversation', 
      roleName: 'Alex', 
      roleTitle: 'Neighbor',
      avatarIcon: 'smalltalk'
    },
    interview: { 
      title: 'Job Interview', 
      roleName: 'Richard', 
      roleTitle: 'Interviewer',
      avatarIcon: 'interview'
    },
    doctor: { 
      title: 'Doctor\'s Appointment', 
      roleName: 'Dr. Chen', 
      roleTitle: 'Physician',
      avatarIcon: 'doctor'
    },
    transportation: { 
      title: 'Public Transportation', 
      roleName: 'James', 
      roleTitle: 'Transport Officer',
      avatarIcon: 'transportation'
    },
    emergency: { 
      title: 'Emergency Situation', 
      roleName: 'Officer Garcia', 
      roleTitle: 'Emergency Operator',
      avatarIcon: 'emergency'
    },
    business: { 
      title: 'Business Meeting', 
      roleName: 'Michael', 
      roleTitle: 'Business Partner',
      avatarIcon: 'business'
    },
    academic: { 
      title: 'Academic Discussion', 
      roleName: 'Prof. Williams', 
      roleTitle: 'Professor',
      avatarIcon: 'academic'
    },
    phone: { 
      title: 'Phone Conversation', 
      roleName: 'Rebecca', 
      roleTitle: 'Customer Service',
      avatarIcon: 'phone'
    },
    travel: { 
      title: 'Travel Planning', 
      roleName: 'Sofia', 
      roleTitle: 'Travel Agent',
      avatarIcon: 'travel'
    },
    dating: { 
      title: 'First Date Conversation', 
      roleName: 'Jamie', 
      roleTitle: 'Date Partner',
      avatarIcon: 'dating'
    },
    housing: { 
      title: 'Housing Inquiry', 
      roleName: 'Thomas', 
      roleTitle: 'Real Estate Agent',
      avatarIcon: 'housing'
    },
    banking: { 
      title: 'Banking Services', 
      roleName: 'Olivia', 
      roleTitle: 'Bank Teller',
      avatarIcon: 'banking'
    },
    leisure: { 
      title: 'Planning Leisure Activities', 
      roleName: 'Sam', 
      roleTitle: 'Friend',
      avatarIcon: 'leisure'
    },
    weather: { 
      title: 'Weather Discussion', 
      roleName: 'Diana', 
      roleTitle: 'Meteorologist',
      avatarIcon: 'weather'
    },
    technology: { 
      title: 'Tech Support', 
      roleName: 'Ryan', 
      roleTitle: 'IT Specialist',
      avatarIcon: 'technology'
    },
    informal: { 
      title: 'Informal Chat', 
      roleName: 'Chris', 
      roleTitle: 'Friend',
      avatarIcon: 'informal'
    }
  };

  /**
   * Get scenario information including title and role details
   * @param scenario The scenario key
   * @returns ScenarioInfo object with title and role information
   */
  getScenarioInfo(scenario: string): ScenarioInfo {
    return this.scenarioInfoMap[scenario] || {
      title: 'General Conversation',
      roleName: 'Assistant',
      roleTitle: 'Language Partner',
      avatarIcon: 'assistant'
    };
  }

  /**
   * Get the full role name (name + title) for display
   * @param scenario The scenario key
   * @returns Full role name (e.g. "Miguel the Waiter")
   */
  getRoleDisplayName(scenario: string): string {
    const info = this.getScenarioInfo(scenario);
    return `${info.roleName} the ${info.roleTitle}`;
  }
  
  /**
   * Get the avatar icon name for a scenario
   * @param scenario The scenario key
   * @returns Avatar icon name
   */
  getAvatarIcon(scenario: string): string {
    const info = this.getScenarioInfo(scenario);
    return info.avatarIcon;
  }
}
