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
  const word = currentWord.split('');
  const letterCount = new Map<string, number>();
  
  // Count occurrences of each letter in the target word
  word.forEach(letter => {
    letterCount.set(letter, (letterCount.get(letter) || 0) + 1);
  });

  // First pass: Mark exact matches
  const result = dataArray.map((item, index) => {
    if (item.letter === word[index]) {
      letterCount.set(item.letter, letterCount.get(item.letter)! - 1);
      return {
        ...item,
        isRightLetterAndRightPosition: true,
        isRightLetterAndWrongPosition: false,
        isWrongLetter: false
      };
    }
    return {
      ...item,
      isRightLetterAndRightPosition: false,
      isRightLetterAndWrongPosition: false,
      isWrongLetter: true
    };
  });

  // Second pass: Mark letters in wrong positions
  result.forEach((item, index) => {
    if (!item.isRightLetterAndRightPosition && (letterCount.get(item.letter) ?? 0) > 0) {
      letterCount.set(item.letter, letterCount.get(item.letter)! - 1);
      result[index] = {
        ...item,
        isRightLetterAndRightPosition: false,
        isRightLetterAndWrongPosition: true,
        isWrongLetter: false
      };
    }
  });

  return result;
};
