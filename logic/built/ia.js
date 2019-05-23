"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State;
(function (State) {
    State[State["Empty"] = 0] = "Empty";
    State[State["Black"] = 1] = "Black";
    State[State["White"] = 2] = "White";
})(State || (State = {}));
var Heuristic_1 = require("./Heuristic");
// function nextPlay(board: Number[][], playable: IPoint[]): IPoint {
//   let rand = playable[Math.floor(Math.random() * playable.length)];
//   return rand;
// }
function nextPlay(board, playable, color) {
    var heuristic = new Heuristic_1.Heuristic();
    var bestPlay = { score: -100, play: null };
    for (var i = 0; i < playable.length; i++) {
        var next = playable[i];
        console.log(next);
        var nextBoard = [];
        for (var j = 0; j < board.length; j++) {
            nextBoard.push(board[j].slice());
        }
        nextBoard[next.x][next.y] = color;
        var score = heuristic.evaluate(board, color);
        if (score >= bestPlay.score) {
            bestPlay = { score: score, play: next };
        }
    }
    return bestPlay.play;
}
exports.nextPlay = nextPlay;
var reversi_1 = require("./reversi");
var game = new reversi_1.Reversi(8);
nextPlay(game.board, game.get_possible_movement(State.Black), State.Black);
