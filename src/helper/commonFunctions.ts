import { InputTypes } from "./types/types";
import wordListText from './data/wordList.text?raw';


// This function assign relevant letter to relevant position when user click on it.
export const AssignValues = (letters: string, dataArray: InputTypes[]): InputTypes[] => {
  return dataArray.map((item, index) => ({
    ...item,
    letter: letters[index] || item.letter,
  }));
};

// This will return words as a array using using direct importing text file
export const loadWordsSync = (): string[] => {
  return wordListText.split('\n').map(word => word.trim()).filter(word => word.length > 0);
};

//This Function to get a random word from the list
export const getRandomWord = (words: string[]): string => {
  if (words.length === 0) return '';
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

// This is check the user input word and correct word comparison
export const checkWord = (currentWord: string, dataArray: { letter: string }[]) => {
  const word = [...currentWord];
  const usedIndices = new Set<number>();

  return dataArray.map((item, index) => {
    // Check if the letter is in the correct position
    if (item.letter === word[index]) {
      usedIndices.add(index);
      return { ...item, 
        isRightLetterAndRightPosition: true, 
        isRightLetterAndWrongPosition: false, 
        isWrongLetter: false 
      };
    }

    // Check if the letter exists in the word but at a different position
    const wrongPosition = word.findIndex((letter, i) => letter === item.letter && !usedIndices.has(i));
    if (wrongPosition !== -1) {
      usedIndices.add(wrongPosition);
      return { ...item, 
        isRightLetterAndRightPosition: false, 
        isRightLetterAndWrongPosition: true, 
        isWrongLetter: false 
      };
    }

    // Letter is not in the word
    return { ...item, 
      isRightLetterAndRightPosition: false, 
      isRightLetterAndWrongPosition: false, 
      isWrongLetter: true 
    };
  });
};
