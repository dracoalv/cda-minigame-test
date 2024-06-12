import { useCallback, useEffect, useState } from 'react';
import lineLeft from '#/assets/line-left.svg';
import crown from '#/assets/crown.svg';
import lineRight from '#/assets/line-right.svg';
import leftBottomCommas from '#/assets/left-bottom-commas.svg';
import rightBottomCommas from '#/assets/right-bottom-commas.svg';
import { Howl } from 'howler';

const MAX_SEQUENCES = 3; // Quantidade de sequencias por desafio
const SEQUENCE_LENGTH = 8; // Quantidade de teclas por sequencia
const TIME_PER_SEQUENCE = 4; // Tempo de cada sequencia

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
  const [sequences, setSequences] = useState<string[][]>([]);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_SEQUENCE);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [result, setResult] = useState<null | 'correct' | 'wrong'>(null);
  const [showRanking, setShowRanking] = useState(false);
  const [sequenceTimerKey, setSequenceTimerKey] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timerSound.rate(timeLeft <= TIME_PER_SEQUENCE / 2 ? 2.5 : 2);
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
    const generatedSequences = Array.from({ length: MAX_SEQUENCES }, () => generateSequence(SEQUENCE_LENGTH));
    setSequences(generatedSequences);
    setCurrentSequenceIndex(0);
    setCurrentIndex(0);
    setTimeLeft(TIME_PER_SEQUENCE);
    setIsPlaying(true);
    setMessage('');
    setScore(0);
    setTotalTime(0);
    setResult(null);
    setShowRanking(false);
    setSequenceTimerKey(prev => prev + 1);
    timerSound.play();
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isPlaying) return;

    const key = event.key.toUpperCase();
    if (key === sequences[currentSequenceIndex][currentIndex]) {
      keyboardSound.play();
      setCurrentIndex((prev) => prev + 1);
      setScore((prev) => prev + 1);
      setResult('correct');

      if (currentIndex + 1 === sequences[currentSequenceIndex].length) {
        const timeTaken = TIME_PER_SEQUENCE - timeLeft;
        setTotalTime((prev) => prev + timeTaken);
        correctSequenceSound.play();
        if (currentSequenceIndex + 1 === sequences.length) {
          setMessage(`Sucesso! Você completou todas as sequências em ${totalTime + timeTaken} segundos!`);
          setIsPlaying(false);
          timerSound.stop();
          successSound.play();
          saveScore(totalTime + timeTaken);
        } else {
          setCurrentSequenceIndex((prev) => prev + 1);
          setCurrentIndex(0);
          setTimeLeft(TIME_PER_SEQUENCE);
          setSequenceTimerKey(prev => prev + 1);
          timerSound.stop();
          timerSound.play();
        }
      } else {
        setResult(null);
      }
    } else {
      wrongSound.play();
      setResult('wrong');
      setMessage('Você falhou!');
      setIsPlaying(false);
      timerSound.stop();
    }
  }, [isPlaying, sequences, currentSequenceIndex, currentIndex, timeLeft, totalTime]);

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
            {sequences[currentSequenceIndex].map((char, index) => (
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
              key={sequenceTimerKey}
              className="h-full bg-primary animate-[shrink_var(--time-per-sequence)_linear_forwards]"
              style={{ '--time-per-sequence': `${TIME_PER_SEQUENCE}s` } as React.CSSProperties}
            />
          </div>
          <div className="text-lg mb-4">Score: {score}</div>
        </>
      ) : (
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
