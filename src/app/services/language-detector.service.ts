import { Injectable } from '@angular/core';

/**
 * Service for detecting language patterns in text
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageDetectorService {
  // Common letters and patterns for different languages
  private languagePatterns: Record<string, RegExp[]> = {
    en: [
      // English patterns (the, and, to, etc.)
      /\b(the|and|to|of|in|for|is|that|you|with|on|this|have|are|not|be|it|at|we|from|or|but|by|an|can|your|was|will|they|their|what|all|would|when)\b/i,
      // Common English word endings
      /ing\b|ed\b|ly\b|tion\b|ment\b|ness\b|able\b|ible\b|ful\b|less\b/i
    ],
    es: [
      // Spanish patterns (el, la, los, las, de, en, etc.)
      /\b(el|la|los|las|de|en|que|y|a|un|una|para|con|por|su|se|del|es|al|lo|como|más|pero|sus|no|le|me|si|sin|sobre|ya|cuando|fue|ser)\b/i,
      // Spanish special characters
      /[áéíóúüñ¿¡]/i
    ],
    de: [
      // German patterns (der, die, das, und, ist, etc.)
      /\b(der|die|das|und|ist|in|den|von|zu|mit|für|auf|dem|sich|des|ein|eine|einen|eines|einem|einer|nicht|auch|es|bei|nur|so|aber|doch|noch|wenn|als|bis|wie|wo|schon|vor|nach|unter|über)\b/i,
      // German special characters and patterns
      /[äöüß]|\bich\b|\bnicht\b|\bein[e]?\b/i
    ],
    nl: [
      // Dutch patterns (de, het, een, is, in, etc.)
      /\b(de|het|een|is|in|op|van|en|te|die|dat|voor|niet|met|zijn|hij|aan|zij|er|maar|dan|wat|als|bij|nog|om|uit|door|ook|wel|nu|geen|over)\b/i,
      // Dutch special words and patterns
      /\b(aan|achter|behalve|binnen|boven|buiten|door|langs|naast|naar|onder|zonder)\b/i
    ],
    ru: [
      // Russian patterns (и, в, на, с, etc.)
      /[а-яА-ЯёЁ]{2,}/,
      /\b(и|в|не|на|я|что|с|по|это|от|то|за|как|так|у|но|из|вы|мы|они|он|она|оно|мой|наш|быть|весь)\b/i
    ],
    fr: [
      // French patterns (le, la, les, de, en, etc.)
      /\b(le|la|les|de|en|un|une|et|à|est|que|qui|pour|dans|ce|il|elle|nous|vous|ils|elles|avec|sur|pas|plus|tout|même|aussi)\b/i,
      /[éèêëàâçîïôùûÿœæ]/i
    ],
    other: []
  };

  /**
   * Detect probable language of a text
   * @param text Text to analyze
   * @returns Language code with highest probability or 'unknown'
   */
  detectLanguage(text: string): string {
    if (!text || text.trim().length < 3) {
      return 'unknown';
    }

    // Store scores for each language
    const scores: Record<string, number> = {};
    
    // Get base score for each language
    Object.keys(this.languagePatterns).forEach(lang => {
      scores[lang] = this.calculateLanguageScore(text, lang);
    });

    // Find language with highest score
    let highestScore = 0;
    let detectedLanguage = 'unknown';
    
    Object.entries(scores).forEach(([lang, score]) => {
      if (score > highestScore) {
        highestScore = score;
        detectedLanguage = lang;
      }
    });

    // If score is too low, mark as unknown
    if (highestScore < 0.2) {
      return 'unknown';
    }

    return detectedLanguage;
  }

  /**
   * Check if text is likely in the expected language
   * @param text Text to validate
   * @param expectedLanguage Expected language code
   * @returns Boolean indicating if text is in expected language
   */
  validateLanguage(text: string, expectedLanguage: string): boolean {
    if (!text || text.trim().length < 3) {
      return true; // Too short to validate
    }

    const detectedLanguage = this.detectLanguage(text);
    
    // Allow if detected as unknown (too short/ambiguous) or matches expected
    return detectedLanguage === 'unknown' || detectedLanguage === expectedLanguage;
  }

  /**
   * Calculate language score for text based on patterns
   * @param text Text to analyze
   * @param language Language to calculate score for
   * @returns Score between 0-1
   */
  private calculateLanguageScore(text: string, language: string): number {
    if (!this.languagePatterns[language] || !this.languagePatterns[language].length) {
      return 0;
    }

    let patternMatches = 0;
    const patterns = this.languagePatterns[language];
    
    // Check each pattern for the language
    patterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        patternMatches += matches.length;
      }
    });

    // Account for other languages' characters
    const hasConfirmingCharacters = Object.entries(this.languagePatterns)
      .filter(([lang]) => lang !== language && lang !== 'other')
      .some(([_, patterns]) => {
        // Check if text has characters specific to other languages
        return patterns.some(pattern => {
          if (pattern.toString().includes('[')) { // Only check character classes
            return pattern.test(text);
          }
          return false;
        });
      });

    // Penalize score if text has characters from other languages
    let score = patternMatches / (text.length / 5);
    if (hasConfirmingCharacters && language !== 'other') {
      score *= 0.5;
    }

    return Math.min(score, 1); // Cap score at 1
  }
}
