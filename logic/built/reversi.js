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
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 }
];
var Reversi = /** @class */ (function () {
    function Reversi(size) {
        if (typeof size == "number") {
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
        else if (typeof size == "object") {
            this.board = [];
            for (var i = 0; i < size.length; i++) {
                this.board.push(size[i].slice());
                this.size = size.length;
            }
        }
    }
    Reversi.prototype.get_possible_movement = function (color) {
        var _this = this;
        var possible_move = [];
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                var neighbourgs = this.get_neighbourg(i, j);
                neighbourgs.map(function (n) {
                    if (_this.check_in_board(n.coord) &&
                        _this.board[n.coord.x][n.coord.y] == 0 &&
                        _this.check_lines(color, n.coord)) {
                        possible_move.push({
                            x: n.coord.x,
                            y: n.coord.y
                        });
                    }
                });
            }
        }
        var filtered_moves = [];
        var _loop_1 = function (i) {
            var move = possible_move[i];
            if (!filtered_moves.some(function (elem) { return elem.x === move.x && elem.y === move.y; })) {
                filtered_moves.push(move);
            }
        };
        for (var i = 0; i < possible_move.length; i++) {
            _loop_1(i);
        }
        return filtered_moves;
    };
    Reversi.prototype.check_in_board = function (point) {
        return (point.x < this.size && point.x >= 0 && point.y < this.size && point.y >= 0);
    };
    Reversi.prototype.get_neighbourg = function (i, j) {
        var _this = this;
        var neighbourgs = [];
        directions.map(function (direction) {
            var point = { x: i + direction.x, y: j + direction.y };
            if (_this.check_in_board(point)) {
                var n = { coord: point, direction: direction };
                neighbourgs.push(n);
            }
        });
        return neighbourgs;
    };
    Reversi.prototype.check_line = function (color, neighbourg) {
        var direction = neighbourg.direction;
        var point = neighbourg.coord;
        if (!this.check_in_board(point)) {
            return false;
        }
        var nextPoint = { x: point.x + direction.x, y: point.y + direction.y };
        // The first token is of the opposite color
        if (this.check_in_board(nextPoint) &&
            this.board[nextPoint.x][nextPoint.y] !== this.get_opposite_color(color)) {
            return false;
        }
        nextPoint.x += direction.x;
        nextPoint.y += direction.y;
        if (!this.check_in_board(nextPoint)) {
            return false;
        }
        // any number of token can be of the opposite color
        while (this.board[nextPoint.x][nextPoint.y] == this.get_opposite_color(color)) {
            nextPoint.x += direction.x;
            nextPoint.y += direction.y;
            if (!this.check_in_board(nextPoint)) {
                return false;
            }
        }
        // the last token is of the player color
        if (this.board[nextPoint.x][nextPoint.y] === color) {
            return true;
        }
        return false;
    };
    Reversi.prototype.check_lines = function (color, point) {
        for (var i = 0; i < directions.length; i++) {
            var direction = directions[i];
            var neigbourg = { coord: point, direction: direction };
            if (this.check_line(color, neigbourg)) {
                return true;
            }
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
        for (var i = 0; i < directions.length; i++) {
            var direction = directions[i];
            var neighbourg = { coord: point, direction: direction };
            this.check_and_capture(neighbourg, color);
        }
        this.board[point.x][point.y] = color;
    };
    Reversi.prototype.check_and_capture = function (neigbourg, color) {
        var point = neigbourg.coord;
        var nextX = point.x + neigbourg.direction.x;
        var nextY = point.y + neigbourg.direction.y;
        if (this.check_line(color, neigbourg)) {
            while (this.board[nextX][nextY] == this.get_opposite_color(color)) {
                this.board[nextX][nextY] = color;
                nextX += neigbourg.direction.x;
                nextY += neigbourg.direction.y;
            }
        }
    };
    Reversi.prototype.get_score = function (color) {
        var score = 0;
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                if (this.board[i][j] == color) {
                    score++;
                }
            }
        }
        return score;
    };
    return Reversi;
}());
exports.Reversi = Reversi;
