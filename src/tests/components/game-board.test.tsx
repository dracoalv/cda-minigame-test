import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GameBoard } from '../../components/game-board'

test('renders GameBoard with sequences', () => {
  const sequences = [['A', 'B', 'C'], ['D', 'E', 'F']]

  render(
    <GameBoard 
      sequences={sequences} 
      currentSequenceIndex={0} 
      currentIndex={1} 
      result={null} 
    />
  )

  expect(screen.getByText('A')).toBeDefined()
  expect(screen.getByText('B')).toBeDefined()
  expect(screen.getByText('C')).toBeDefined()
})