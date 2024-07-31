import { LetterState, compareGuessAndAnswer } from "../../utils/answerCompare";
import { wordBank } from "../../utils/wordBank";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
  words: string[];
  currentRowIndex: number;
  isGuessInvalid: boolean;
  status: GameState;
  guessStates: { [key: number]: number[] };
}

export enum GameState {
  Playing = "Playing",
  Win = "Win",
  Lose = "Lose",
}

const MAX_WORD_LENGTH = 5;
const MAX_ROW_INDEX = 5;

const initialGuessStates = Array.from({ length: MAX_ROW_INDEX }, () =>
  Array(MAX_WORD_LENGTH).fill(LetterState.Unchecked)
);

export const initialState: BoardState = {
  words: ["", "", "", "", ""],
  currentRowIndex: 0,
  isGuessInvalid: false,
  status: GameState.Playing,
  guessStates: initialGuessStates,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    update(state, action: PayloadAction<{ word: string }>) {
      const { word } = action.payload;
      if (state.words[state.currentRowIndex].length < MAX_WORD_LENGTH) {
        state.words[state.currentRowIndex] += word;
      }
    },
    deleteWord(state) {
      if (state.words[state.currentRowIndex].length > 0) {
        state.words[state.currentRowIndex] = state.words[
          state.currentRowIndex
        ].slice(0, -1);
        state.isGuessInvalid = false;
      }
    },
    checkAnswer(state) {
      if (state.words[state.currentRowIndex].length === MAX_WORD_LENGTH) {
        if (
          !wordBank.includes(
            state.words[state.currentRowIndex].toLocaleLowerCase()
          )
        ) {
          state.isGuessInvalid = true;
        } else {
          const updatedGuessState = compareGuessAndAnswer(
            state.words[state.currentRowIndex]
          );
          state.guessStates[state.currentRowIndex] = updatedGuessState;

          if (updatedGuessState.every((value) => value === LetterState.Match)) {
            state.status = GameState.Win;
          } else if (state.currentRowIndex === MAX_ROW_INDEX - 1) {
            state.status = GameState.Lose;
          } else {
            state.currentRowIndex += 1;
          }
        }
      }
    },
    clearBoard(state) {
      state.words = initialState.words;
      state.currentRowIndex = initialState.currentRowIndex;
      state.isGuessInvalid = initialState.isGuessInvalid;
      state.status = initialState.status;
      state.guessStates = initialState.guessStates;
    },
  },
});

export const { update, deleteWord, checkAnswer, clearBoard } =
  boardSlice.actions;
export default boardSlice.reducer;
