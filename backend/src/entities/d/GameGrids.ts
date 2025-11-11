import type { GameSize } from './GameSize.js'

export const GameGrids: Record<GameSize, { x: number, y: number }> = {
  "tiny": {
    x: 3,
    y: 2
  },
  "small": {
    x: 6,
    y: 4
  },
  "medium": {
    x: 15,
    y: 10
  },
  "large": {
    x: 30,
    y: 20,
  },
  "huge": {
    x: 45,
    y: 30,
  }
}