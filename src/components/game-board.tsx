import { GameBoardProps } from "../@types/components"

export function GameBoard ({ 
  sequences,
  currentSequenceIndex,
  currentIndex,
  result 
}: GameBoardProps) {
  return (
    <div className="flex gap-2 mb-6">
      {sequences[currentSequenceIndex].map((char, index) => (
        <button
          key={index}
          className={`text-2xl flex justify-center items-center w-12 h-12 border rounded transition-all duration-300 ease-in-out neo ${
            index === currentIndex
              ? result === 'correct'
                ? 'bg-primary text-white'
                : result === 'wrong'
                ? 'bg-error text-white'
                : 'bg-white transform -translate-y-2'
              : index < currentIndex
              ? 'bg-primary text-white'
              : ''
          }`}
        >
          {char}
        </button>
      ))}
    </div>
  )
}