import type { GameLevel } from '../../../../../src/entities/game/game-level.js'

export interface GameDefinition {
  id: string;
  startedAt: string;
  type: GameLevel
}
