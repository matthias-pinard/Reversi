interface IPoint {
  x: number;
  y: number;
}

enum State {
  Empty = 0,
  Black = 1,
  White = 2
}

import { Heuristic } from "./Heuristic";

// function nextPlay(board: Number[][], playable: IPoint[]): IPoint {
//   let rand = playable[Math.floor(Math.random() * playable.length)];
//   return rand;
// }

function nextPlay(board: State[][], playable: IPoint[], color: State) {
  let heuristic = new Heuristic();
  let bestPlay = { score: -100, play: null };
  for (let i = 0; i < playable.length; i++) {
    let next = playable[i];
    console.log(next)
    var nextBoard = [];

    for (var j = 0; j < board.length; j++) {
      nextBoard.push(board[j].slice())
    }
    nextBoard[next.x][next.y] = color;
    let score = heuristic.evaluate(board, color);
    if (score >= bestPlay.score) {
      bestPlay = { score: score, play: next };
    }
  }
  return bestPlay.play;
}
export { nextPlay };

import {Reversi} from "./reversi"

let game = new Reversi(8);
nextPlay(game.board, game.get_possible_movement(State.Black), State.Black);