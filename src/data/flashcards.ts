export interface Flashcard {
  category: "animals" | "food" | "verbs";
  spanish: string;
  english: string;
  quiz: {
    type: "multiple-choice";
    options: string[];
  };
}

export const flashcards: Flashcard[] = [
  // Animals
  {
    category: "animals",
    spanish: "el gato",
    english: "the cat",
    quiz: {
      type: "multiple-choice",
      options: ["the dog", "the house", "the cat", "the bird"]
    }
  },
  {
    category: "animals",
    spanish: "el perro",
    english: "the dog",
    quiz: {
      type: "multiple-choice",
      options: ["the cat", "the dog", "the bird", "the fish"]
    }
  },
  {
    category: "animals",
    spanish: "el pájaro",
    english: "the bird",
    quiz: {
      type: "multiple-choice",
      options: ["the cat", "the house", "the bird", "the dog"]
    }
  },
  {
    category: "animals",
    spanish: "el pez",
    english: "the fish",
    quiz: {
      type: "multiple-choice",
      options: ["the bird", "the fish", "the cat", "the dog"]
    }
  },
  // Food
  {
    category: "food",
    spanish: "la manzana",
    english: "the apple",
    quiz: {
      type: "multiple-choice",
      options: ["the bread", "the apple", "the milk", "the cheese"]
    }
  },
  {
    category: "food",
    spanish: "el pan",
    english: "the bread",
    quiz: {
      type: "multiple-choice",
      options: ["the apple", "the bread", "the milk", "the cheese"]
    }
  },
  {
    category: "food",
    spanish: "la leche",
    english: "the milk",
    quiz: {
      type: "multiple-choice",
      options: ["the bread", "the apple", "the milk", "the cheese"]
    }
  },
  {
    category: "food",
    spanish: "el queso",
    english: "the cheese",
    quiz: {
      type: "multiple-choice",
      options: ["the bread", "the apple", "the milk", "the cheese"]
    }
  },
  // Verbs
  {
    category: "verbs",
    spanish: "comer",
    english: "to eat",
    quiz: {
      type: "multiple-choice",
      options: ["to drink", "to eat", "to sleep", "to run"]
    }
  },
  {
    category: "verbs",
    spanish: "beber",
    english: "to drink",
    quiz: {
      type: "multiple-choice",
      options: ["to eat", "to drink", "to sleep", "to run"]
    }
  },
  {
    category: "verbs",
    spanish: "dormir",
    english: "to sleep",
    quiz: {
      type: "multiple-choice",
      options: ["to eat", "to drink", "to sleep", "to run"]
    }
  },
  {
    category: "verbs",
    spanish: "correr",
    english: "to run",
    quiz: {
      type: "multiple-choice",
      options: ["to eat", "to drink", "to sleep", "to run"]
    }
  }
];

export const getCardsByCategory = (category: "animals" | "food" | "verbs"): Flashcard[] => {
  return flashcards.filter(card => card.category === category);
};

export const categories = ["animals", "food", "verbs"] as const;

