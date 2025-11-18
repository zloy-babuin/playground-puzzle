import type { GameSize } from './d/GameSize'
import { Piece }  from './Piece'
import { GameGrids } from './d/GameGrids'
import { randomUUID } from 'node:crypto'
import type { PieceKind } from './d/PieceKind'

export class Puzzle {
  id: string;
  type: GameSize;
  startedAt: number;
  owner: string;
  pieces: Piece[];

  private _IMAGE_WIDTH = 1500;
  private _IMAGE_HEIGHT = 1000;

  constructor(type: GameSize, ownerUuid: string) {
    this.id = randomUUID();
    this.type = type;
    this.owner = ownerUuid;
    this.startedAt = Date.now();
    this.pieces = this.genPieces(type);
  }

  private genPieces(gameSize: GameSize) {
    const size = GameGrids[gameSize];
    const stepX = Math.round(this._IMAGE_WIDTH / size.x);
    const stepY = Math.round(this._IMAGE_HEIGHT / size.y);
    let currentX = 0;
    let currentY = 0;

    const pieces: Piece[] = [];

    // Определяем границы сетки
    const lastRow = size.y - 1;
    const lastCol = size.x - 1;

    for (let i = 0; i < size.y; i ++) { // Цикл по строкам (Y)
      currentX = 0; // Сбрасываем X в начале каждой новой строки
      for (let y = 0; y < size.x; y++) { // Цикл по столбцам (X)

        let type: PieceKind = "regular";

        // 1. Углы
        if (i === 0 && y === 0) {
          type = "topLeft";
        } else if (i === 0 && y === lastCol) {
          type = "topRight";
        } else if (i === lastRow && y === lastCol) {
          type = "bottomRight";
        } else if (i === lastRow && y === 0) {
          type = "bottomLeft";
        }
        // 2. Края (не углы)
        else if (i === 0) {
          type = "top";
        } else if (i === lastRow) {
          type = "bottom";
        } else if (y === 0) {
          type = "left";
        } else if (y === lastCol) {
          type = "right";
        }

        const piece = new Piece(
          {x: currentX, y: currentY},
          {
            x: Math.round(Math.random() * 500 - 250),
            y: Math.round(Math.random() * 500 - 250)
          },
          type
        )

        pieces.push(piece);
        currentX += stepX;
      }
      currentY += stepY;
    }
    return pieces;
  }

  public getForPlayer() {
    const pieces: any[] = [];
    this.pieces.forEach(_piece => {
      pieces.push(_piece.getForPlayer());
    });
    return {
      id: this.id,
      startedAt: this.startedAt,
      type: this.type,
      pieces
    }
  }
}
