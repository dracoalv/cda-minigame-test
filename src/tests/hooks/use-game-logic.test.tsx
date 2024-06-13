import { render, act } from '@testing-library/react'
import { vi, describe, beforeEach, test, expect } from 'vitest'
import { useGameLogic, TIME_PER_SEQUENCE } from '../../hooks/use-game-logic'
import { generateSequence } from '../../utils/game-utils'
import { timerSound, keyboardSound } from '../../utils/sound-manager'

vi.mock('../../utils/game-utils', () => ({
  generateSequence: vi.fn(),
  getScores: vi.fn()
}))

vi.mock('../../utils/sound-manager', () => ({
  timerSound: { rate: vi.fn(), stop: vi.fn(), play: vi.fn() },
  keyboardSound: { play: vi.fn() },
}))

interface TestComponentProps {
  onInit: (res: ReturnType<typeof useGameLogic>) => void
}

function TestComponent({ onInit }: TestComponentProps) {
  const gameLogic = useGameLogic()
  onInit(gameLogic)
  return null
}

describe('useGameLogic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('initializes with correct default values', () => {
    let result: ReturnType<typeof useGameLogic> | undefined
    
    render(<TestComponent onInit={(res) => { result = res }} />)

    expect(result!.sequences).toEqual([])
    expect(result!.currentSequenceIndex).toBe(0)
    expect(result!.currentIndex).toBe(0)
    expect(result!.timeLeft).toBe(TIME_PER_SEQUENCE)
    expect(result!.isPlaying).toBe(false)
    expect(result!.message).toBe('')
    expect(result!.score).toBe(0)
    expect(result!.totalTime).toBe(0)
    expect(result!.result).toBeNull()
    expect(result!.showRanking).toBe(false)
    expect(result!.sequenceTimerKey).toBe(0)
  })

  test('starts the game correctly', () => {
    (generateSequence as ReturnType<typeof vi.fn>).mockReturnValue(['A', 'B', 'C'])
    let result: ReturnType<typeof useGameLogic> | undefined

    render(<TestComponent onInit={(res) => { result = res }} />)

    act(() => {
      result!.startGame()
    })

    expect(result!.sequences.length).toBe(3)
    expect(result!.sequences[0]).toEqual(['A', 'B', 'C'])
    expect(result!.isPlaying).toBe(true)
    expect(result!.message).toBe('')
    expect(result!.score).toBe(0)
    expect(result!.totalTime).toBe(0)
    expect(result!.result).toBeNull()
    expect(timerSound.play).toHaveBeenCalled()
  })

  test('handles key press correctly', () => {
    (generateSequence as ReturnType<typeof vi.fn>).mockReturnValue(['A', 'B', 'C'])
    let result: ReturnType<typeof useGameLogic> | undefined

    render(<TestComponent onInit={(res) => { result = res }} />)

    act(() => {
      result!.startGame()
    })

    act(() => {
      result!.handleKeyPress({ key: 'A' } as KeyboardEvent)
    })

    setTimeout(() => {
      expect(result!.currentIndex).toBe(1)
      expect(result!.score).toBe(1)
      expect(result!.result).toBe('correct')
      expect(keyboardSound.play).toHaveBeenCalled()
    }, 1)
  })
})
