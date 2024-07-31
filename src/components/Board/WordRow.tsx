import Letter from "./Letter";

interface WordProps {
  letters: string;
  index: number;
}

const LETTER_LENGTH = 5;

const WordRow = ({ letters: lettersProp, index: rowIndex }: WordProps) => {
  const letterRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp.split("").concat(Array(letterRemaining).fill(""));

  return (
    <div className={`grid grid-cols-5 gap-2 text-center `}>
      {letters.map((letter, index) => (
        <Letter key={index} index={index} value={letter} rowIndex={rowIndex} />
      ))}
    </div>
  );
};

export default WordRow;
