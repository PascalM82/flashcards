# Spanish Flashcards Web App

A modern, interactive flashcards web application to help users learn Spanish vocabulary. Built with **Vite**, **React**, and **TypeScript**.

## 🚀 Live Demo

**[Try it now: https://flashcards-hazel-one.vercel.app/](https://flashcards-hazel-one.vercel.app/)**

## Features

- 📚 **Study Mode** - Interactive flashcards with flip animations
- 📝 **Quiz Mode** - Multiple choice and fill-in-the-blank quizzes
- 📊 **Statistics** - Track your learning progress
- 🎨 **Modern UI** - Professional, Office-style interface
- 📱 **Responsive** - Works on desktop and mobile devices

## Tech Stack

- **Frontend Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** CSS with modern design patterns
- **State Management:** React Hooks (useState, useReducer)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PascalM82/flashcards.git
cd flashcards/Flashcards
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

### Running E2E Tests

The project includes comprehensive End-to-End tests using Playwright:

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with interactive UI
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug
```

See `e2e/README.md` for more details about the test suite.

## Project Structure

```
Flashcards/
├── docs/                 # Project documentation
│   ├── specification.md  # Software specification
│   └── toDO.md          # Feature TODO list
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   ├── data/           # Static data (flashcards)
│   ├── pages/          # Page components
│   ├── styles/         # CSS stylesheets
│   └── App.tsx         # Main app component
├── index.html          # HTML entry point
└── package.json        # Project dependencies
```

## Current Status

**Phase 1-2: ✅ Complete**
- Project setup with Vite + React + TypeScript
- File structure organized
- Static flashcards data (animals, food, verbs)
- Home page with navigation
- Category selection pages
- Professional UI design
- Flashcard study mode with flip animations
- Track wrong answers

**Phase 3: ✅ Complete**
- Redo mode for reviewing wrong cards
- Persistent storage of wrong cards (localStorage)
- "Redo Wrong Cards" button on Home and Study completion
- Clear wrong cards functionality

**Phase 4-5: 🚧 In Progress**
- Quiz mode (Multiple choice & Fill-in-the-blank)
- Statistics tracking

See `docs/toDO.md` for detailed progress and upcoming features.

## Deployment

This project is deployed on **Vercel** with automatic deployments enabled.

- **Live URL:** [https://flashcards-hazel-one.vercel.app/](https://flashcards-hazel-one.vercel.app/)
- **Platform:** Vercel
- **Deploy on push:** Enabled (deploys automatically on push to main branch)

### Manual Deployment

To deploy your own version:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Import your repository
4. Vercel will auto-detect the Vite settings
5. Click "Deploy"

## License

This project is open source and available under the MIT License.
