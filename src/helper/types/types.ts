export interface InputTypes {
    letter: string;
    isRightLetterAndRightPosition: boolean;
    isRightLetterAndWrongPosition:boolean;
    isWrongLetter:boolean;
}

export type KeyType = string | 'Enter' | 'Remove';
