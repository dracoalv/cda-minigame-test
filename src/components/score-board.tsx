import { ScoreBoardProps } from '../@types/components';

export const ScoreBoard = ({ 
  score, 
  showRanking,  
  getScores 
}: ScoreBoardProps) => (
  <>
    <div className="text-lg mb-4">Score: {score}</div>
    {showRanking && (
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Top 5 Tempos:</h2>
        <ol className="list-decimal list-inside">
          {getScores().map((time, index) => (
            <li key={index}>
              Tempo: <span className="text-primary">{time} {time === 1 ? 'segundo' : 'segundos'}</span>
            </li>
          ))}
        </ol>
      </div>
    )}
  </>
)