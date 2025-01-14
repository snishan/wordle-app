import { AssignValues, loadWordsSync, getRandomWord, checkWord } from '../helper/commonFunctions';
import { InputTypes } from '../helper/types/types';

// Mock the raw text import
jest.mock('../data/wordList.text?raw', () => `apple
banana
cherry
delta
eagle`);



describe('AssignValues', () => {
  test('should assign letters to correct positions', () => {
    const initialData: InputTypes[] = [
      { letter: '', isRightLetterAndRightPosition: false, isRightLetterAndWrongPosition: false, isWrongLetter: false },
      { letter: '', isRightLetterAndRightPosition: false, isRightLetterAndWrongPosition: false, isWrongLetter: false },
      { letter: '', isRightLetterAndRightPosition: false, isRightLetterAndWrongPosition: false, isWrongLetter: false },
    ];
    const letters = 'abc';

    const result = AssignValues(letters, initialData);

    expect(result).toEqual([
      { letter: 'a', isRightLetterAndRightPosition: false, isRightLetterAndWrongPosition: false, isWrongLetter: false },
      { letter: 'b', isRightLetterAndRightPosition: false, isRightLetterAndWrongPosition: false, isWrongLetter: false },
      { letter: 'c', isRightLetterAndRightPosition: false, isRightLetterAndWrongPosition: false, isWrongLetter: false },
    ]);
  });

  test('should keep existing letters when input is shorter', () => {
    const initialData: InputTypes[] = [
      { letter: 'x', isRightLetterAndRightPosition: false, isRightLetterAndWrongPosition: false, isWrongLetter: false },
      { letter: 'y', isRightLetterAndRightPosition: false, isRightLetterAndWrongPosition: false, isWrongLetter: false },
      { letter: 'z', isRightLetterAndRightPosition: false, isRightLetterAndWrongPosition: false, isWrongLetter: false },
    ];
    const letters = 'ab';

    const result = AssignValues(letters, initialData);

    expect(result).toEqual([
      { letter: 'a', isRightLetterAndRightPosition: false, isRightLetterAndWrongPosition: false, isWrongLetter: false },
      { letter: 'b', isRightLetterAndRightPosition: false, isRightLetterAndWrongPosition: false, isWrongLetter: false },
      { letter: 'z', isRightLetterAndRightPosition: false, isRightLetterAndWrongPosition: false, isWrongLetter: false },
    ]);
  });
});

describe('loadWordsSync', () => {
  test('should load and parse words from text file', () => {
    const words = loadWordsSync();

    expect(words).toBeInstanceOf(Array);
    expect(words.length).toBeGreaterThan(0);
    expect(words.every(word => typeof word === 'string')).toBe(true);
  });

  test('should filter out empty lines', () => {
    const words = loadWordsSync();

    expect(words.every(word => word.length > 0)).toBe(true);
  });
});

describe('getRandomWord', () => {
  test('should return a random word from the list', () => {
    const wordList = ['apple', 'banana', 'cherry'];
    const result = getRandomWord(wordList);

    expect(wordList).toContain(result);
  });

  test('should return empty string for empty word list', () => {
    const result = getRandomWord([]);

    expect(result).toBe('');
  });
});

describe('checkWord', () => {
  const createInputLetter = (letter: string): InputTypes => ({
    letter,
    isRightLetterAndRightPosition: false,
    isRightLetterAndWrongPosition: false,
    isWrongLetter: false
  });

  test('should correctly identify right letters in right positions', () => {
    const currentWord = 'HELLO';
    const input = [
      createInputLetter('H'),
      createInputLetter('E'),
      createInputLetter('L'),
      createInputLetter('L'),
      createInputLetter('O'),
    ];

    const result = checkWord(currentWord, input);

    expect(result.every(item => item.isRightLetterAndRightPosition)).toBe(true);
    expect(result.every(item => !item.isRightLetterAndWrongPosition)).toBe(true);
    expect(result.every(item => !item.isWrongLetter)).toBe(true);
  });

  test('should identify right letters in wrong positions', () => {
    const currentWord = 'HELLO';
    const input = [
      createInputLetter('E'),
      createInputLetter('H'),
      createInputLetter('L'),
      createInputLetter('L'),
      createInputLetter('O'),
    ];

    const result = checkWord(currentWord, input);

    expect(result[0].isRightLetterAndWrongPosition).toBe(true);
    expect(result[1].isRightLetterAndWrongPosition).toBe(true);
    expect(result[2].isRightLetterAndRightPosition).toBe(true);
    expect(result[3].isRightLetterAndRightPosition).toBe(true);
    expect(result[4].isRightLetterAndRightPosition).toBe(true);
  });

  test('should identify wrong letters', () => {
    const currentWord = 'HELLO';
    const input = [
      createInputLetter('W'),
      createInputLetter('O'),
      createInputLetter('R'),
      createInputLetter('L'),
      createInputLetter('D'),
    ];

    const result = checkWord(currentWord, input);

    expect(result[0].isWrongLetter).toBe(true);
    expect(result[1].isRightLetterAndWrongPosition).toBe(true);
    expect(result[2].isWrongLetter).toBe(true);
    expect(result[3].isRightLetterAndRightPosition).toBe(true);
    expect(result[4].isWrongLetter).toBe(true);
  });

  test('should handle duplicate letters correctly', () => {
    const currentWord = 'HELLO';
    const input = [
      createInputLetter('L'),
      createInputLetter('L'),
      createInputLetter('L'),
      createInputLetter('L'),
      createInputLetter('O'),
    ];

    const result = checkWord(currentWord, input);

    // Only two L's should be marked as correct (either right position or wrong position)
    const correctLCount = result.filter(
      item => item.isRightLetterAndRightPosition
    ).length;
    expect(correctLCount).toBe(3);

    // Verify that exactly one L is in the right position (index 3)
    expect(result[3].isRightLetterAndRightPosition).toBe(true);

    // Verify that exactly one L is in the wrong position
    expect(result.filter(item => item.isRightLetterAndWrongPosition).length).toBe(0);

    // Verify that the remaining L's are marked as wrong
    expect(result.filter(item => item.isWrongLetter).length).toBe(2);
  });
});