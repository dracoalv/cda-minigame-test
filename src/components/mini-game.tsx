import { useCallback, useEffect, useState } from 'react';
import lineLeft from '#/assets/line-left.svg';
import crown from '#/assets/crown.svg';
import lineRight from '#/assets/line-right.svg';
import leftBottomCommas from '#/assets/left-bottom-commas.svg';
import rightBottomCommas from '#/assets/right-bottom-commas.svg';
import { Howl } from 'howler';

const TOTAL_TIME = 10; // Defina o tempo total para concluir o jogo.

const timerSound = new Howl({
  src: ['src/assets/sounds/timer.mp3'],
  loop: true
});

const keyboardSound = new Howl({
  src: ['src/assets/sounds/click-button.mp3']
});

const wrongSound = new Howl({
  src: ['src/assets/sounds/error.mp3']
});

const correctSequenceSound = new Howl({
  src: ['src/assets/sounds/correct.mp3']
});

const successSound = new Howl({
  src: ['src/assets/sounds/success.mp3']
});

function generateSequence(length: number): string[] {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]);
}

const saveScore = (time: number) => {
  const scores = JSON.parse(localStorage.getItem('scores') || '[]');
  scores.push(time);
  scores.sort((a: number, b: number) => a - b);
  if (scores.length > 5) {
    scores.pop();
  }
  localStorage.setItem('scores', JSON.stringify(scores));
};

const getScores = () => {
  return JSON.parse(localStorage.getItem('scores') || '[]');
};

export function MiniGame() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME); // Use the TOTAL_TIME constant here
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<null | 'correct' | 'wrong'>(null);
  const [showRanking, setShowRanking] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      if (timeLeft <= TOTAL_TIME / 2) {
        timerSound.rate(2.5); // Velocidade aumentada do som
      } else {
        timerSound.rate(2); // Velocidade normal do som
      }

      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      setMessage('O tempo acabou, você falhou!');
      setIsPlaying(false);
      timerSound.stop();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setSequence(generateSequence(8));
    setCurrentIndex(0);
    setTimeLeft(TOTAL_TIME);
    setIsPlaying(true);
    setMessage('');
    setScore(0);
    setResult(null);
    setShowRanking(false);
    timerSound.play();
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isPlaying) return;

    const key = event.key.toUpperCase();
    if (key === sequence[currentIndex]) {
      keyboardSound.play();
      setCurrentIndex((prev) => prev + 1);
      setScore((prev) => prev + 1);
      setResult('correct');

      if (currentIndex + 1 === sequence.length) {
        const timeTaken = TOTAL_TIME - timeLeft;
        saveScore(timeTaken);
        setMessage(`Sucesso! Você completou a sequência em ${timeTaken} ${timeTaken === 1 ? 'segundo' : 'segundos'}!`);
        setIsPlaying(false);
        timerSound.stop();
        correctSequenceSound.play();
      } else {
        setResult(null); // Clear the result immediately
      }
    } else {
      wrongSound.play();
      setResult('wrong');
      setMessage('Você falhou!');
      setIsPlaying(false);
      timerSound.stop();
    }
  }, [isPlaying, sequence, currentIndex, timeLeft]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="relative flex flex-col items-center justify-center gap-8 w-full max-w-screen-md mx-auto p-8 pt-4 border border-primary rounded-md">
      <div className="flex items-center justify-between gap-4">
        <img src={lineLeft} alt="" />
        <img src={crown} alt="" />
        <img src={lineRight} alt="" />
      </div>
      {isPlaying ? (
        <>
          <div className="flex gap-2 mb-6">
            {sequence.map((char, index) => (
              <button
                key={index}
                className={`text-2xl flex justify-center items-center w-12 h-12 border rounded transition-all duration-300 ease-in-out ${
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
          <div className="w-full h-3 bg-gray-300 mb-4 relative">
            <div className="absolute w-full h-3 bg-primary/10 border border-primary"></div>
            <div 
              className="h-full bg-primary animate-[shrink_var(--total-time)_linear_forwards]"
              style={{ '--total-time': `${TOTAL_TIME}s` } as React.CSSProperties}
            />
          </div>
          <div className="text-lg mb-4">Score: {score}</div>
        </>
      ) : (
          <>
            <h1 className="text-primary text-center uppercase">Mini-Game</h1>
            <button onClick={startGame} className="px-4 py-2 bg-primary text-background font-semibold rounded">Iniciar</button>
            {message && <div className="mt-6 text-2xl text-red-500">{message}</div>}
            {sequence.length > 0 && (
              <button onClick={() => setShowRanking(true)} className="mt-4 px-4 py-2 border bg-secondary text-white rounded">Exibir Ranking</button>
            )}
            {showRanking && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Top 5 Tempos:</h2>
                <ol className="list-decimal list-inside">
                  {getScores().map((time: number, index: number) => (
                    <li key={index}>
                      Tempo: {' '}
                      <span className="text-primary">
                        {time} {time === 1 ? 'segundo' : 'segundos'}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </>
      )}
      <img src={leftBottomCommas} alt="" className="absolute left-4 bottom-4" />
      <img src={rightBottomCommas} alt="" className="absolute right-4 bottom-4" />
    </div>
  );
}
