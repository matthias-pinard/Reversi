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
  branchs: Tree<T>[];
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
    let next_game = new Reversi(board)
    next_game.play(next, color)
    let nextBoard = next_game.board
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

function create_board_tree_recur(
  board_tree: Tree<Board>,
  color: State,
  depth: number
): Tree<Board> {
  //let tree: Tree<Board> = {value: board, branchs: []}
  if (depth != 0) {
    let board = board_tree.value;
    let game = new Reversi(board);
    let playables = game.get_possible_movement(color);
    let new_board = copy_board(board);
    playables.forEach(play => {
      new_board[play.x][play.y] = color;
      board_tree.branchs.push({ value: new_board, branchs: [] });
    });
    let opp_color = color == State.Black ? State.White : State.Black;
    board_tree.branchs.forEach(tree => {
      create_board_tree_recur(tree, opp_color, depth - 1);
    });
  }
  return board_tree;
}

function evaluate_tree_recur(
  board_tree: Tree<Board>,
  score_tree: Tree<number>,
  color: State
): Tree<Number> {
  let h = new Heuristic();
  let score = h.evaluate(board_tree.value, color);
  score_tree = { value: score, branchs: [] };

  board_tree.branchs.forEach((tree, i) => {
    if (tree.branchs.length !== 0) {
      let opp_color = color == State.Black ? State.White : State.Black;
      evaluate_tree_recur(tree, score_tree.branchs[i], opp_color);
    }
  });
  return score_tree;
}

function evaluate_score_tree(
  board_tree: Tree<Board>,
  color: State
): Tree<number> {
  let tree = { value: 0, branchs: [] };
  let score_tree = evaluate_tree_recur(board_tree, tree, color);
  return tree;
}

function evaluate_board(board: Board, color: State): Tree<number> {
  let board_tree = create_board_tree_recur(
    { value: board, branchs: [] },
    color,
    4
  );
  let score_tree = evaluate_score_tree(board_tree, color);
  return score_tree;
}
export { nextPlay };

let game = new Reversi(8);
console.log(game.board)
let board_tree = {value: game.board, branchs: []};
create_board_tree_recur(board_tree, State.Black, 4)
//let board_tree = evaluate_board(game.board, State.Black);
console.log(board_tree);
