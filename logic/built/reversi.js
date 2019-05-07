"use strict";
var State;
(function (State) {
    State[State["Empty"] = 0] = "Empty";
    State[State["Black"] = 1] = "Black";
    State[State["White"] = 2] = "White";
})(State || (State = {}));
var Color;
(function (Color) {
    Color[Color["Black"] = 0] = "Black";
    Color[Color["White"] = 1] = "White";
})(Color || (Color = {}));
var Reversi = /** @class */ (function () {
    function Reversi(size) {
        this.size = size;
        this.board = [];
        for (var i = 0; i < size; i++) {
            this.board.push([]);
            for (var j = 0; j < size; j++) {
                this.board[i].push(State.Empty);
            }
        }
        this.board[size / 2 - 1][size / 2 - 1] = State.White;
        this.board[size / 2][size / 2] = State.White;
        this.board[size / 2 - 1][size / 2] = State.Black;
        this.board[size / 2][size / 2 - 1] = State.Black;
    }
    Reversi.prototype.get_possible_movement = function (color) {
        var _this = this;
        var possible_move = [];
        this.board.map(function (row, i) {
            row.map(function (tile, j) {
                var neighbourgs = _this.get_neighbourg(i, j);
                neighbourgs.map(function (n) {
                    if (_this.check_line(color, n)) {
                        possible_move.push({ x: n.coord[0], y: n.coord[1] });
                    }
                });
            });
        });
        return possible_move;
    };
    Reversi.prototype.get_neighbourg = function (i, j) {
        var neighbourgs = [];
        if (i - 1 > 0 || j - 1 > 0) {
            neighbourgs.push({ coord: [i - 1, j - 1], direction: [-1, -1] });
        }
        if (i - 1 > 0) {
            neighbourgs.push({ coord: [i - 1, j], direction: [-1, 0] });
        }
        if (i - 1 > 0 || j + 1 < this.size) {
            neighbourgs.push({ coord: [i - 1, j + 1], direction: [-1, 1] });
        }
        if (j - 1 > 0) {
            neighbourgs.push({ coord: [i, j - 1], direction: [0, 1] });
        }
        if (i + 1 < this.size || j - 1 > 0) {
            neighbourgs.push({ coord: [i + 1, j - 1], direction: [1, -1] });
        }
        if (i + 1 < this.size) {
            neighbourgs.push({ coord: [i + 1, j], direction: [1, 0] });
        }
        if (i + 1 < this.size || j + 1 < this.size) {
            neighbourgs.push({ coord: [i + 1, j + 1], direction: [1, 1] });
        }
        if (j + 1 < this.size) {
            neighbourgs.push({ coord: [i, j + 1], direction: [0, 1] });
        }
        return neighbourgs;
    };
    Reversi.prototype.check_line = function (color, point) {
        var direction = point.direction;
        var coord = [
            point.coord[0] + direction[0],
            point.coord[1] + direction[1]
        ];
        if (coord[0] > this.size ||
            coord[0] < 0 ||
            coord[1] > this.size ||
            coord[1] < 0) {
            return false;
        }
        if (this.board[coord[0]][coord[1]] !== this.get_opposite_color(color)) {
            return false;
        }
        coord[0] += direction[0];
        coord[1] += direction[1];
        if (coord[0] > this.size ||
            coord[0] < 0 ||
            coord[1] > this.size ||
            coord[1] < 0) {
            return false;
        }
        while (this.board[coord[0]][coord[1]] !== this.get_opposite_color(color)) {
            coord[0] += direction[0];
            coord[1] += direction[1];
            if (coord[0] > this.size ||
                coord[0] < 0 ||
                coord[1] > this.size ||
                coord[1] < 0) {
                return false;
            }
        }
        if (this.board[coord[0]][coord[1]] === color) {
            return true;
        }
        return false;
    };
    Reversi.prototype.get_opposite_color = function (color) {
        if (color === State.Black) {
            return State.White;
        }
        else if (color === State.White) {
            return State.Black;
        }
        return State.Empty;
    };
    return Reversi;
}());
var n = { coord: [2, 3], direction: [1, 0] };
var game = new Reversi(8);
game.board[2][3] = State.Black;
console.log(game.board);
console.log(game.check_line(State.Black, n));
