import { useSelector } from "react-redux";
import { LetterState } from "../../utils/answerCompare";

interface CharacterBoxProps {
  index: number;
  value: string;
  rowIndex: number;
}

const basicStyles =
  "flex items-center justify-center rounded rounded-2xl h-12 w-12 border-2  text-2xl font-bold uppercase text-stone-50";

const checkedStateStyles = {
  [LetterState.Miss]: "border-slate-700 bg-slate-700 text-slate-400",
  [LetterState.Present]: "border-amber-300 bg-amber-300 text-yellow-600",
  [LetterState.Match]: "border-emerald-500 bg-emerald-500 text-emerald-800",
  [LetterState.Unchecked]: "",
};

const Letter = ({ index, value, rowIndex }: CharacterBoxProps) => {
  const state = useSelector((state: any) => state.board);
  const letterState: LetterState = state.guessStates[rowIndex][index];

  const getStateStyles = () => {
    const stateStyles = {
      noValue: " border-stone-500",
      hasValue:
        "border-blue-100 animate-jump animate-once animate-duration-100",

      checked: `animate-rotate-x animate-once ${checkedStateStyles[letterState]} }`,
    };

    if (letterState === LetterState.Unchecked) {
      if (value === "") {
        return stateStyles.noValue;
      }
      return stateStyles.hasValue;
    }
    return stateStyles.checked;
  };

  return <div className={`${basicStyles} ${getStateStyles()}`}>{value}</div>;
};

export default Letter;
