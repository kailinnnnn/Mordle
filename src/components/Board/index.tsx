import { useEffect } from "react";
import {
  GameState,
  update,
  deleteWord,
  checkAnswer,
} from "../../redux/reducers/boardReducer";
import WordRow from "./WordRow";
import { useSelector, useDispatch } from "react-redux";
import { correctAnswer } from "../../utils/answerCompare";

const Board = () => {
  const boardState = useSelector((state: any) => state.board);
  const userState = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (/^[A-Za-z]$/.test(event.key)) {
        dispatch(update({ word: event.key }));
      } else if (event.key === "Enter") {
        dispatch(checkAnswer(userState._id));
      } else if (event.key === "Backspace") {
        dispatch(deleteWord());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="mx-auto gap-4 flex flex-col items-center">
      {boardState.words.map((letters: string, index: number) => (
        <WordRow key={index} letters={letters} index={index} />
      ))}
      {boardState.status !== GameState.Playing && (
        <div className="h-8  mt-3 rounded-md bg-emerald-500 text-center text-xs px-2 font-bold leading-8 text-stone-50">
          {boardState.status === GameState.Win
            ? "You Win!"
            : "You Lose! The answer is " + correctAnswer}
        </div>
      )}
      {boardState.isGuessInvalid && (
        <div className="h-8 w-28 mt-3 rounded-md bg-amber-600 text-center text-xs font-bold leading-8 text-stone-50">
          Not in Word List
        </div>
      )}
    </main>
  );
};

export default Board;
