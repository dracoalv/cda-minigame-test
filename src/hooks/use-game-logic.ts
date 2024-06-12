import { useState, useEffect, useCallback } from 'react'
import { generateSequence, saveScore, getScores } from '../utils/game-utils'
import { 
  timerSound,
  keyboardSound,
  wrongSound,
  correctSequenceSound,
  successSound  
} from '../utils/sound-manager'

const MAX_SEQUENCES = 3 // Total de sequencias por game
const SEQUENCE_LENGTH = 8 // Total de teclas por sequência
export const TIME_PER_SEQUENCE = 6 // Total de tempo por sequência

export const useGameLogic = () => {
  const [sequences, setSequences] = useState<string[][]>([])
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_SEQUENCE)
  const [isPlaying, setIsPlaying] = useState(false)
  const [message, setMessage] = useState('')
  const [score, setScore] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [result, setResult] = useState<null | 'correct' | 'wrong'>(null)
  const [showRanking, setShowRanking] = useState(false)
  const [sequenceTimerKey, setSequenceTimerKey] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isPlaying && timeLeft > 0) {
      timerSound.rate(timeLeft <= TIME_PER_SEQUENCE / 1.5 ? 2.5 : 1.5)
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    } else if (timeLeft <= 0) {
      setMessage('O tempo acabou, você falhou!')
      setIsPlaying(false)
      timerSound.stop()
    }

    return () => clearInterval(timer)
  }, [isPlaying, timeLeft])

  const startGame = () => {
    const generatedSequences = Array.from({ length: MAX_SEQUENCES }, () => generateSequence(SEQUENCE_LENGTH))
    setSequences(generatedSequences)
    setCurrentSequenceIndex(0)
    setCurrentIndex(0)
    setTimeLeft(TIME_PER_SEQUENCE)
    setIsPlaying(true)
    setMessage('')
    setScore(0)
    setTotalTime(0)
    setResult(null)
    setShowRanking(false)
    setSequenceTimerKey(prev => prev + 1)
    timerSound.play()
  }

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isPlaying) return

    const key = event.key.toUpperCase()

    if (key === sequences[currentSequenceIndex][currentIndex]) {
      keyboardSound.play()
      setCurrentIndex(prev => prev + 1)
      setScore(prev => prev + 1)
      setResult('correct')

      if (currentIndex + 1 === sequences[currentSequenceIndex].length) {
        const timeTaken = TIME_PER_SEQUENCE - timeLeft
        setTotalTime(prev => prev + timeTaken)
        correctSequenceSound.play()

        if (currentSequenceIndex + 1 === sequences.length) {
          setMessage(`Sucesso! Você completou todas as sequências em ${totalTime + timeTaken} segundos!`)
          setIsPlaying(false)
          timerSound.stop()
          successSound.play()
          saveScore(totalTime + timeTaken)
        } else {
          setCurrentSequenceIndex(prev => prev + 1)
          setCurrentIndex(0)
          setTimeLeft(TIME_PER_SEQUENCE)
          setSequenceTimerKey(prev => prev + 1)
          timerSound.stop()
          timerSound.play()
        }
      } else {
        setResult(null)
      }
    } else {
      wrongSound.play()
      setResult('wrong')
      setMessage('Você falhou! Tente novamente')
      setSequences(prevSequences => {
        const newSequences = [...prevSequences]
        newSequences[currentSequenceIndex] = generateSequence(SEQUENCE_LENGTH)

        return newSequences
      })
      setCurrentIndex(0)
    }
  }, [isPlaying, sequences, currentSequenceIndex, currentIndex, timeLeft, totalTime])

  return {
    sequences,
    currentSequenceIndex,
    currentIndex,
    timeLeft,
    isPlaying,
    message,
    score,
    totalTime,
    result,
    showRanking,
    sequenceTimerKey,
    startGame,
    handleKeyPress,
    setShowRanking,
    getScores,
  }
}
