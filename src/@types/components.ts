export interface GameBoardProps {
  sequences: string[][];
  currentSequenceIndex: number;
  currentIndex: number;
  result: 'correct' | 'wrong' | null;
}

export interface ScoreBoardProps {
  score: number;
  showRanking: boolean;
  getScores: () => number[];
}

export interface GameControlsProps {
  isPlaying: boolean;
  startGame: () => void;
  message: string;
  sequences: string[][];
  showRanking: boolean;
  setShowRanking: (show: boolean) => void;
}
