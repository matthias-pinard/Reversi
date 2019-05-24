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

type BoardTree = {
  board: Board,
  play:  IPoint,
  branchs: BoardTree[];
};

type mmVal = {
  score: number,
  play: IPoint
}

import { Heuristic } from "./Heuristic";
import { Reversi } from "./reversi";
// function nextPlay(board: Number[][], playable: IPoint[]): IPoint {
//   let rand = playable[Math.floor(Math.random() * playable.length)];
//   return rand;
// }

function nextPlay(board: Board, color: State): IPoint {
  let  board_tree = { board: board, play:null, branchs: [] };
  create_board_tree_recur(board_tree, color, 3);
  let play = minmax(board_tree, 10, true, color)
  return play.play;
}

function create_board_tree_recur(
  board_tree: BoardTree,
  color: State,
  depth: number
): BoardTree {
  //let tree: Tree<Board> = {value: board, branchs: []}
  if (depth != 0) {
    let board = board_tree.board;
    let game = new Reversi(board);
    let playables = game.get_possible_movement(color);
    playables.forEach(play => {
      let game = new Reversi(board);
      game.play(play, color);
      board_tree.branchs.push({ board: game.board, play: play, branchs: [] });
    });
    let opp_color = color == State.Black ? State.White : State.Black;
    board_tree.branchs.forEach(tree => {
      create_board_tree_recur(tree, opp_color, depth - 1);
    });
  }
  return board_tree;
}

function minmax(
  board_tree: BoardTree,
  depth: number,
  maximazingPlayer: boolean,
  color: State
): mmVal {
  if (depth == 0 || board_tree.branchs.length == 0) {
    let h = new Heuristic();
    return {score: h.evaluate(board_tree.board, color), play: board_tree.play};
  }
  if (maximazingPlayer) {
    let value: mmVal = {score: -1000000, play: null};
    for(let i = 0; i < board_tree.branchs.length; i++) {
      let subtree = board_tree.branchs[i];
      let mm = minmax(subtree, depth - 1, false, color)
      let nextValue = Math.max(value.score, mm.score) 
        if(nextValue > value.score) {
          value = {score: nextValue, play:subtree.play}
        }
      }
    return value;
    
  } else {
    let value: mmVal = {score: 1000000, play: null};
    for(let i = 0; i < board_tree.branchs.length; i++) {
      let subtree = board_tree.branchs[i];
      let mm = minmax(subtree, depth - 1, true, color)
      let nextValue = Math.min(value.score, mm.score) 
        if(nextValue < value.score) {
          value = {score: nextValue, play:subtree.play}
        }
      }
    return value;
    }
  }

  function print_game(board_tree: BoardTree) {
    while(board_tree.branchs.length != 0) {
      console.log(board_tree.board);
      board_tree = board_tree.branchs[0]
    }
    console.log(board_tree.board);

  }
export { nextPlay };