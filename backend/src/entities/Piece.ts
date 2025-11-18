import type { PiecePosition } from './d/PiecePosition.js'
import { randomUUID} from 'node:crypto';
import type { PieceKind } from './d/PieceKind.js'

export class Piece {
  id: string = "";
  homePosition: PiecePosition;
  position: PiecePosition;
  atHome: boolean;
  type: PieceKind;

  constructor(home: PiecePosition, position: PiecePosition, type: PieceKind) {
    this.id = randomUUID();
    this.type = type;
    this.atHome = false;
    this.position = position;
    this.homePosition = home;
  }

  public getForPlayer = (): Partial<Piece> => {
  // public getForPlayer = (): Omit<Piece, "homePosition" | "getForPlayer"> => {
    return {
      id: this.id,
      type: this.type,
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      atHome: this.atHome,
    }
  }
}
