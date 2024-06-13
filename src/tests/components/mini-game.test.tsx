import { expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { useGameLogic } from '../../hooks/use-game-logic';
import { MiniGame } from '../../components/mini-game';

vi.mock('../../hooks/use-game-logic', () => ({
  useGameLogic: vi.fn(),
}));

test('renders MiniGame and starts game', () => {
  const startGame = vi.fn();

  (useGameLogic as ReturnType<typeof vi.fn>).mockReturnValue({
    sequences: [['A', 'B', 'C']],
    currentSequenceIndex: 0,
    currentIndex: 0,
    timeLeft: 10,
    isPlaying: false,
    message: '',
    score: 0,
    result: null,
    showRanking: false,
    sequenceTimerKey: 0,
    startGame,
    handleKeyPress: vi.fn(),
    setShowRanking: vi.fn(),
    getScores: vi.fn().mockReturnValue([]),
  });

  render(<MiniGame />);
  
  fireEvent.click(screen.getByText('Iniciar'));  
  expect(startGame).toHaveBeenCalled();
});
