import { expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { GameControls } from '../../components/game-controls'

test('renders GameControls and triggers start game', () => {
  const startGame = vi.fn()

  render(
    <GameControls 
      isPlaying={false} 
      startGame={startGame} 
      message="" 
      sequences={[]} 
      showRanking={false} 
      setShowRanking={() => {}} 
    />
  )
  
  fireEvent.click(screen.getByText('Iniciar'))
  expect(startGame).toHaveBeenCalled()
})
