"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reversi_1 = require("./reversi");
var State;
(function (State) {
    State[State["Empty"] = 0] = "Empty";
    State[State["Black"] = 1] = "Black";
    State[State["White"] = 2] = "White";
})(State || (State = {}));
var Heuristic = /** @class */ (function () {
    function Heuristic() {
        this.NO_MOVES_PENALTY = 20;
        this.CORNERS_WEIGHT = 8010.724;
        this.NEAR_CORNERS_WEIGHT = 382.026;
        this.STABILITY_WEIGHT = 10;
        this.PARITY_WEIGHT = 10;
        this.MOBILITY_WEIGHT = 78.922;
        this.staticStabilityMap = [
            [20, -3, 11, 8, 8, 11, -3, 20],
            [-3, -7, -4, 1, 1, -4, -7, -3],
            [11, -4, 2, 2, 2, 2, -4, 11],
            [8, 1, 2, -3, -3, 2, 1, 8],
            [8, 1, 2, -3, -3, 2, 1, 8],
            [11, -4, 2, 2, 2, 2, -4, 11],
            [-3, -7, -4, 1, 1, -4, -7, -3],
            [20, -3, 11, 8, 8, 11, -3, 20]
        ];
    }
    Heuristic.prototype.evaluate = function (board, color) {
        return (this.parity(board, color) +
            this.mobility(board, color) +
            this.stability(board, color) +
            this.countCorners(board, color));
    };
    Heuristic.prototype.parity = function (board, color) {
        var game = new reversi_1.Reversi(board);
        var cCurr = game.get_score(color);
        var oppColor = color == State.Black ? State.White : State.Black;
        var cOpp = game.get_score(oppColor);
        var score = ((100 * (cCurr - cOpp)) / (cCurr + cOpp)) * this.PARITY_WEIGHT;
        if (cCurr > cOpp) {
            return score;
        }
        return -score;
    };
    Heuristic.prototype.mobility = function (board, color) {
        var game = new reversi_1.Reversi(board);
        var moCurr = game.get_possible_movement(color).length;
        var oppColor = color == State.Black ? State.White : State.Black;
        var moOpp = game.get_possible_movement(oppColor).length;
        if (moCurr + moOpp !== 0)
            return (((100 * (moCurr - moOpp)) / (moCurr + moOpp)) * this.MOBILITY_WEIGHT);
        else
            return 0;
    };
    Heuristic.prototype.countCorners = function (board, color) {
        var corCurr = 0;
        var corOpp = 0;
        var size = board.length - 1;
        var corners = [
            { x: 0, y: 0 },
            { x: size, y: 0 },
            { x: 0, y: size },
            { x: size, y: size }
        ];
        corners.forEach(function (corner) {
            var oppColor = color == State.Black ? State.White : State.Black;
            if (board[corner.x][corner.y] == color) {
                corCurr++;
            }
            else if (board[corner.x][corner.y] == oppColor) {
                corOpp++;
            }
            // console.log(`oppopent corner: ${corOpp}`);
            // console.log(`my corner: ${corCurr}`);
        });
        var score = 0;
        if (corCurr + corOpp !== 0) {
            score = 100 * ((corCurr - corOpp) / (corCurr + corOpp)) * this.CORNERS_WEIGHT;
        }
        console.log(score);
        return score;
    };
    Heuristic.prototype.stability = function (board, color) {
        var result = 0;
        var row = 0;
        var col = 0;
        for (var i = 0; i < board.length; i++) {
            {
                for (var j = 0; j < board.length; j++) {
                    {
                        if (board[i][j] != null) {
                            col = i;
                            row = j;
                            var temp = this.staticStabilityMap[i][j];
                            result += (board[i][j] === color ? 1 : -1) * temp;
                        }
                    }
                }
            }
        }
        return result * this.STABILITY_WEIGHT;
    };
    return Heuristic;
}());
exports.Heuristic = Heuristic;
var game = new reversi_1.Reversi(8);
var h = new Heuristic();
console.log(h.evaluate(game.board, State.Black));
