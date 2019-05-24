"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State;
(function (State) {
    State[State["Empty"] = 0] = "Empty";
    State[State["Black"] = 1] = "Black";
    State[State["White"] = 2] = "White";
})(State || (State = {}));
var Heuristic_1 = require("./Heuristic");
var reversi_1 = require("./reversi");
// function nextPlay(board: Number[][], playable: IPoint[]): IPoint {
//   let rand = playable[Math.floor(Math.random() * playable.length)];
//   return rand;
// }
function nextPlay(board, color) {
    var game = new reversi_1.Reversi(board);
    var playable = game.get_possible_movement(color);
    var heuristic = new Heuristic_1.Heuristic();
    var bestPlay = { score: null, play: null };
    for (var i = 0; i < playable.length; i++) {
        var next = playable[i];
        var next_game = new reversi_1.Reversi(board);
        next_game.play(next, color);
        var nextBoard = next_game.board;
        var score = heuristic.evaluate(nextBoard, color);
        // console.log(`${i} ${score}`);
        if (bestPlay.score === null || score > bestPlay.score) {
            bestPlay = { score: score, play: next };
        }
    }
    return bestPlay.play;
}
exports.nextPlay = nextPlay;
function copy_board(board) {
    var nextBoard = [];
    for (var j = 0; j < board.length; j++) {
        nextBoard.push(board[j].slice());
    }
    return board;
}
function anticipate(board, color) {
    var game = new reversi_1.Reversi(board);
    var playables = nextPlay(board, color);
}
function create_board_tree_recur(board_tree, color, depth) {
    //let tree: Tree<Board> = {value: board, branchs: []}
    if (depth != 0) {
        var board = board_tree.value;
        var game_1 = new reversi_1.Reversi(board);
        var playables = game_1.get_possible_movement(color);
        var new_board_1 = copy_board(board);
        playables.forEach(function (play) {
            new_board_1[play.x][play.y] = color;
            board_tree.branchs.push({ value: new_board_1, branchs: [] });
        });
        var opp_color_1 = color == State.Black ? State.White : State.Black;
        board_tree.branchs.forEach(function (tree) {
            create_board_tree_recur(tree, opp_color_1, depth - 1);
        });
    }
    return board_tree;
}
function evaluate_tree_recur(board_tree, score_tree, color) {
    var h = new Heuristic_1.Heuristic();
    var score = h.evaluate(board_tree.value, color);
    score_tree = { value: score, branchs: [] };
    board_tree.branchs.forEach(function (tree, i) {
        if (tree.branchs.length !== 0) {
            var opp_color = color == State.Black ? State.White : State.Black;
            evaluate_tree_recur(tree, score_tree.branchs[i], opp_color);
        }
    });
    return score_tree;
}
function evaluate_score_tree(board_tree, color) {
    var tree = { value: 0, branchs: [] };
    var score_tree = evaluate_tree_recur(board_tree, tree, color);
    return tree;
}
function evaluate_board(board, color) {
    var board_tree = create_board_tree_recur({ value: board, branchs: [] }, color, 4);
    var score_tree = evaluate_score_tree(board_tree, color);
    return score_tree;
}
var game = new reversi_1.Reversi(8);
console.log(game.board);
var board_tree = { value: game.board, branchs: [] };
create_board_tree_recur(board_tree, State.Black, 4);
//let board_tree = evaluate_board(game.board, State.Black);
console.log(board_tree);
