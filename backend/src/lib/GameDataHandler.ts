import { Puzzle } from '../entities/Puzzle'

export const handleGetPuzzle = (data: any) => {
  const puzzle = new Puzzle('medium', 'me');
  return {
    type: 'game-data',
    data: puzzle.getForPlayer(),
  };
};
