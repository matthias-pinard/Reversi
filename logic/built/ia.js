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
    var board_tree = { board: board, play: null, branchs: [] };
    create_board_tree_recur(board_tree, color, 3);
    var play = minmax(board_tree, 10, true, color);
    return play.play;
}
exports.nextPlay = nextPlay;
function create_board_tree_recur(board_tree, color, depth) {
    //let tree: Tree<Board> = {value: board, branchs: []}
    if (depth != 0) {
        var board_1 = board_tree.board;
        var game = new reversi_1.Reversi(board_1);
        var playables = game.get_possible_movement(color);
        playables.forEach(function (play) {
            var game = new reversi_1.Reversi(board_1);
            game.play(play, color);
            board_tree.branchs.push({ board: game.board, play: play, branchs: [] });
        });
        var opp_color_1 = color == State.Black ? State.White : State.Black;
        board_tree.branchs.forEach(function (tree) {
            create_board_tree_recur(tree, opp_color_1, depth - 1);
        });
    }
    return board_tree;
}
function minmax(board_tree, depth, maximazingPlayer, color) {
    if (depth == 0 || board_tree.branchs.length == 0) {
        var h = new Heuristic_1.Heuristic();
        return { score: h.evaluate(board_tree.board, color), play: board_tree.play };
    }
    if (maximazingPlayer) {
        var value = { score: -1000000, play: null };
        for (var i = 0; i < board_tree.branchs.length; i++) {
            var subtree = board_tree.branchs[i];
            var mm = minmax(subtree, depth - 1, false, color);
            var nextValue = Math.max(value.score, mm.score);
            if (nextValue > value.score) {
                value = { score: nextValue, play: subtree.play };
            }
        }
        return value;
    }
    else {
        var value = { score: 1000000, play: null };
        for (var i = 0; i < board_tree.branchs.length; i++) {
            var subtree = board_tree.branchs[i];
            var mm = minmax(subtree, depth - 1, true, color);
            var nextValue = Math.min(value.score, mm.score);
            if (nextValue < value.score) {
                value = { score: nextValue, play: subtree.play };
            }
        }
        return value;
    }
}
function print_game(board_tree) {
    while (board_tree.branchs.length != 0) {
        console.log(board_tree.board);
        board_tree = board_tree.branchs[0];
    }
    console.log(board_tree.board);
}
