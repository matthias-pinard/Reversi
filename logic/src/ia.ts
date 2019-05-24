interface IPoint {
  x: number;
  y: number;
}

enum State {
  Empty = 0,
  Black = 1,
  White = 2
}

type Board = State[][];

type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
};

import { Heuristic } from "./Heuristic";
import { Reversi } from "./reversi";
// function nextPlay(board: Number[][], playable: IPoint[]): IPoint {
//   let rand = playable[Math.floor(Math.random() * playable.length)];
//   return rand;
// }

function nextPlay(board: Board, color: State) {
  let game = new Reversi(board);
  let playable = game.get_possible_movement(color);

  let heuristic = new Heuristic();
  let bestPlay = { score: null, play: null };

  for (let i = 0; i < playable.length; i++) {
    let next = playable[i];
    var nextBoard = [];
    for (var j = 0; j < board.length; j++) {
      nextBoard.push(board[j].slice());
    }
    nextBoard[next.x][next.y] = color;

    let score = heuristic.evaluate(nextBoard, color);
    // console.log(`${i} ${score}`);
    if (bestPlay.score === null || score > bestPlay.score) {
      bestPlay = { score: score, play: next };
    }
  }
  return bestPlay.play;
}

function copy_board(board: Board): Board {
  var nextBoard = [];
  for (var j = 0; j < board.length; j++) {
    nextBoard.push(board[j].slice());
  }
  return board;
}

function anticipate(board: Board, color: State) {
  let game = new Reversi(board);
  let playables = nextPlay(board, color);
}

function create_board_tree(board: Board, color: State) {
  let tree: Tree<Board> = {value: board, left: null, right: null}
  for (let i = 0; i < 5; i++) {
    let game = new Reversi(board);
    let playables = game.get_possible_movement(color);
    let new_board = this.copy_board(board);
    playables.forEach(play => {
      new_board[play.x][play.y] = color;
      let new_tree = null


    });
  }
}
export { nextPlay };
