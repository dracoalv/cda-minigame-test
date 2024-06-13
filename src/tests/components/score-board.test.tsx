import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScoreBoard } from '../../components/score-board'

test('renders ScoreBoard with scores', () => {
  const getScores = vi.fn().mockReturnValue([10, 20, 30])
  render(<ScoreBoard score={8} showRanking={true} getScores={getScores} />)

  expect(screen.getByText('Score: 8')).toBeDefined()
  expect(screen.getByText('10 segundos')).toBeDefined()
  expect(screen.getByText('20 segundos')).toBeDefined()
  expect(screen.getByText('30 segundos')).toBeDefined()
})