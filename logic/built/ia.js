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
        var nextBoard = [];
        for (var j = 0; j < board.length; j++) {
            nextBoard.push(board[j].slice());
        }
        nextBoard[next.x][next.y] = color;
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
function create_board_tree(board, color) {
    var tree = { value: board, left: null, right: null };
    var _loop_1 = function (i) {
        var game = new reversi_1.Reversi(board);
        var playables = game.get_possible_movement(color);
        var new_board = this_1.copy_board(board);
        playables.forEach(function (play) {
            new_board[play.x][play.y] = color;
            var new_tree = null;
        });
    };
    var this_1 = this;
    for (var i = 0; i < 5; i++) {
        _loop_1(i);
    }
}
