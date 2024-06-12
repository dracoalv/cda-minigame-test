import { GameControlsProps } from '../@types/components'
import { getScores } from '../utils/game-utils'

export const GameControls = ({
  isPlaying,
  startGame,
  message,
  sequences,
  showRanking,
  setShowRanking
}: GameControlsProps) => (
  <>
    {isPlaying ? null : (
      <>
        <h1 className="text-primary text-center uppercase">Mini-Game</h1>
        <button onClick={startGame} className="px-4 py-2 bg-primary text-background font-semibold rounded">Iniciar</button>
        {message && <div className="mt-6 text-2xl text-red-500">{message}</div>}
        {sequences.length > 0 && (
          <button onClick={() => setShowRanking(true)} className="mt-4 px-4 py-2 border bg-secondary text-white rounded">Exibir Ranking</button>
        )}
        {showRanking && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Top 5 Tempos:</h2>
            <ol className="list-decimal list-inside">
              {sequences.length > 0 && getScores().map((time, index) => (
                <li key={index}>
                  Tempo: <span className="text-primary">{time} {time === 1 ? 'segundo' : 'segundos'}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </>
    )}
  </>
)
