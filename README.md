# Lingtor Language Chat 🗣️

Lingtor is an immersive language learning application that simulates realistic conversations in various scenarios and languages, built with Angular 19.0.0.

## Overview 🌟

Lingtor provides authentic conversation practice with contextual feedback in a variety of everyday situations. The application creates an immersive environment by:
- Enforcing target language use only
- Offering realistic scenarios with role-appropriate responses
- Providing a low-pressure environment to practice conversation skills
- Being available 24/7 for practice, unlike human language partners

## Features 🚀

### Core Features
- **Language Selection**: Support for multiple languages (English, Spanish, German, Dutch)
- **Conversation Scenarios**: 20+ predefined conversation scenarios in common situations
- **Character-Based Dialogues**: AI-powered conversation partners with defined roles
- **Modern Chat Interface**: Real-time message exchange with visual indicators
- **Language Immersion**: Frontend language validation to maintain target language use
- **Settings Management**: API key management for OpenAI integration

### Target Audience
- Language learners (beginner to advanced)
- Students preparing for travel or work in foreign countries
- Educators seeking interactive tools for language instruction
- Self-learners looking for conversation practice

## Technical Details 🛠️

- **Framework**: Angular 19.0.0
- **Styling**: SCSS with responsive design
- **State Management**: Angular services with RxJS observables
- **API Integration**: OpenAI API for language generation
- **Deployment**: Static site hosting on Netlify

## Development 👨‍💻

### Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start development server:
```bash
npm start
```
4. Navigate to `http://localhost:4200/`

### Folder Structure
- `src/app/components/` - Angular standalone components
- `src/app/services/` - Application services
- `src/app/models/` - Data models and interfaces
- `stories/` - User stories and requirements

### Code Generation

Generate new standalone components:

```bash
ng generate component components/component-name --standalone
```

### Building for Production

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory.

## Testing 🧪

### Running Unit Tests

```bash
npm test
```

Unit tests are written to ensure 100% coverage for methods and functions.

## User Stories 📚

The application is built based on user stories located in the `stories/` directory. Each story follows standard format with ID, title, description, acceptance criteria, technical notes, priority, and story point estimation.

## Additional Resources 📚

- [Angular Documentation](https://angular.dev)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Netlify Deployment Guides](https://docs.netlify.com/)
