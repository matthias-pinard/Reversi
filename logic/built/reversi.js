"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var directions = [
    { x: -1, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 }
];
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
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                var neighbourgs = this.get_neighbourg(i, j);
                neighbourgs.map(function (n) {
                    if (_this.check_line(color, n)) {
                        possible_move.push({
                            x: n.coord[0],
                            y: n.coord[1]
                        });
                    }
                });
            }
        }
        return possible_move;
    };
    Reversi.prototype.check_in_board = function (point) {
        return (point.x < this.size && point.x >= 0 && point.y < this.size && point.y >= 0);
    };
    Reversi.prototype.get_neighbourg = function (i, j) {
        var _this = this;
        var neighbourgs = [];
        directions.map(function (direction) {
            var point = { x: i + direction[0], y: j + direction[1] };
            if (_this.check_in_board(point)) {
                var n_1 = { coord: point, direction: direction };
                neighbourgs.push(n_1);
            }
        });
        return neighbourgs;
    };
    Reversi.prototype.is_in_board = function (coord) {
        if (coord[0] >= this.size ||
            coord[0] < 0 ||
            coord[1] >= this.size ||
            coord[1] < 0) {
            return false;
        }
        return true;
    };
    Reversi.prototype.check_line = function (color, point) {
        var direction = point.direction;
        var coord = [
            point.coord.x + direction.x,
            point.coord.y + direction.y
        ];
        if (!this.is_in_board([coord[0], coord[1]])) {
            return false;
        }
        // The first token is of the opposite color
        if (this.board[coord[0]][coord[1]] !== this.get_opposite_color(color)) {
            return false;
        }
        coord[0] += direction[0];
        coord[1] += direction[1];
        if (!this.is_in_board([coord[0], coord[1]])) {
            return false;
        }
        // any number of token can be of the opposite color
        while (this.board[coord[0]][coord[1]] == this.get_opposite_color(color)) {
            coord[0] += direction[0];
            coord[1] += direction[1];
            if (!this.is_in_board([coord[0], coord[1]])) {
                return false;
            }
        }
        // the last token is of the player color
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
    Reversi.prototype.play = function (point, color) {
        this.board[point.x][point.y] = color;
    };
    Reversi.prototype.check_and_capture = function (neigbourg, color) {
        var point = neigbourg.coord;
        this.board[point.x][point.y] = color;
        var nextX = point.x + neigbourg.direction.x;
        var nextY = point.y + neigbourg.direction.y;
        if (this.check_line(color, neigbourg)) {
            this.board[point.x][point.y] = color;
            var nextX_1 = point.x + neigbourg.direction.x;
            var nextY_1 = point.y + neigbourg.direction.y;
        }
    };
    return Reversi;
}());
exports.Reversi = Reversi;
var n = { coord: { x: 3, y: 2 }, direction: { x: 0, y: 1 } };
var game = new Reversi(8);
console.log(game.get_possible_movement(State.White));
game.play({ x: 3, y: 2 }, State.White);
console.log(game.board);
console.log(game.get_possible_movement(State.White));
