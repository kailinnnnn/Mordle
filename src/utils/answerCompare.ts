import { wordBank } from "./wordBank";

function getRandomAnswer(): string {
  const answer =
    wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase();
  return answer;
}

export const correctAnswer = getRandomAnswer();

export enum LetterState {
  Miss,
  Present,
  Match,
  Unchecked,
}

export function compareGuessAndAnswer(
  guessString: string,
  answerString: string = correctAnswer
) {
  const result: LetterState[] = [];
  const guessArray = guessString.toUpperCase().split("");
  const answerArray = answerString.toUpperCase().split("");

  guessArray.forEach((letter, index) => {
    const currentAnswerLetter = answerArray[index];

    if (currentAnswerLetter === letter) {
      result.push(LetterState.Match);
    } else if (answerArray.includes(letter)) {
      result.push(LetterState.Present);
    } else {
      result.push(LetterState.Miss);
    }
  });
  return result;
}
