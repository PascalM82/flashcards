# Spanish Flashcards Web App

A modern, interactive flashcards web application to help users learn Spanish vocabulary. Built with **Vite**, **React**, and **TypeScript**.

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
git clone <repository-url>
cd Flashcards
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

**Phase 1: ✅ Complete**
- Project setup with Vite + React + TypeScript
- File structure organized
- Static flashcards data (animals, food, verbs)
- Home page with navigation
- Category selection pages
- Professional UI design

**Phase 2-5: 🚧 In Progress**
- Flashcard study mode
- Quiz mode
- Statistics tracking
- Redo mode for wrong answers

See `docs/toDO.md` for detailed progress and upcoming features.

## License

This project is open source and available under the MIT License.
