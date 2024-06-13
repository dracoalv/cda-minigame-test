import React from 'react'
import { useGameLogic, TIME_PER_SEQUENCE } from '../hooks/use-game-logic'
import { useKeyPress } from '../hooks/use-key-press'
import { GameBoard } from './game-board'
import { ScoreBoard } from './score-board'
import { GameControls } from './game-controls'
import lineLeft from '/assets/line-left.svg'
import crown from '/assets/crown.svg'
import lineRight from '/assets/line-right.svg'
import leftBottomCommas from '/assets/left-bottom-commas.svg'
import rightBottomCommas from '/assets/right-bottom-commas.svg'

export function MiniGame() {
  const {
    sequences,
    currentSequenceIndex,
    currentIndex,
    isPlaying,
    message,
    score,
    result,
    showRanking,
    sequenceTimerKey,
    startGame,
    handleKeyPress,
    setShowRanking,
    getScores
  } = useGameLogic()

  useKeyPress(handleKeyPress)

  return (
    <div className="relative flex flex-col items-center justify-center gap-8 w-full max-w-screen-md mx-auto p-8 pt-4 border border-primary rounded-md c4-container">
      <div className="flex items-center justify-between gap-4">
        <img src={lineLeft} alt="" />
        <img src={crown} alt="" />
        <img src={lineRight} alt="" />
      </div>
      {isPlaying ? (
        <>
          <GameBoard
            sequences={sequences}
            currentSequenceIndex={currentSequenceIndex}
            currentIndex={currentIndex}
            result={result}
          />
          <div className="w-full h-3 bg-gray-300 mb-4 relative">
            <div className="absolute w-full h-3 bg-primary/10 border border-primary"></div>
            <div 
              key={sequenceTimerKey}
              className="h-full bg-primary animate-[shrink_var(--time-per-sequence)_linear_forwards]"
              style={{ '--time-per-sequence': `${TIME_PER_SEQUENCE}s` } as React.CSSProperties}
            />
          </div>
          <ScoreBoard
            score={score}
            showRanking={showRanking}
            getScores={getScores}
          />
        </>
      ) : (
        <GameControls
          isPlaying={isPlaying}
          startGame={startGame}
          message={message}
          sequences={sequences}
          showRanking={showRanking}
          setShowRanking={setShowRanking}
        />
      )}
      <img src={leftBottomCommas} alt="" className="absolute left-4 bottom-4" />
      <img src={rightBottomCommas} alt="" className="absolute right-4 bottom-4" />
    </div>
  );
}