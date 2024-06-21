export const generateSequence = (length: number): string[] => {
  const chars = 'QWEASD'
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)])
}

export const saveScore = (time: number): void => {
  const scores = JSON.parse(localStorage.getItem('scores') || '[]')
  scores.push(time)
  scores.sort((a: number, b: number) => a - b)
  if (scores.length > 5) {
    scores.pop()
  }
  localStorage.setItem('scores', JSON.stringify(scores))
}

export const getScores = (): number[] => {
  return JSON.parse(localStorage.getItem('scores') || '[]')
}
