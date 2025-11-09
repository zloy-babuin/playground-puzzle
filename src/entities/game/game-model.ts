import type { GameType } from '@/entities/game/game-type'
import type { GameLevel } from '@/entities/game/game-level'
import type { GamePlayer } from '@/entities/game/game-player'

export interface GameModel {
  id: string, // uuid
  active: boolean,
  name: string,
  type: GameType,
  start_time: number, // timestamp
  owner: string, // uuid
  level: GameLevel,
  players: GamePlayer[],
  image_url: string,
  finished_percent: number,
}
