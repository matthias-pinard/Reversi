enum State {
  Empty = 0,
  Black = 1,
  White = 2
}

enum Color {
  Black,
  White
}

interface IPoint {
  x: number;
  y: number;
}

interface INeighbourg {
  coord: IPoint;
  direction: IPoint;
}

const directions: IPoint[] = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },

  { x: 0, y: -1 },
  { x: 0, y: 1 },

  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 }
];

class Reversi {
  board: State[][];
  size: number;

  constructor(size: number) {
    this.size = size;
    this.board = [];
    for (let i = 0; i < size; i++) {
      this.board.push([]);
      for (let j = 0; j < size; j++) {
        this.board[i].push(State.Empty);
      }
    }
    this.board[size / 2 - 1][size / 2 - 1] = State.White;
    this.board[size / 2][size / 2] = State.White;
    this.board[size / 2 - 1][size / 2] = State.Black;
    this.board[size / 2][size / 2 - 1] = State.Black;
  }

  get_possible_movement(color: State): IPoint[] {
    let possible_move: IPoint[] = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let neighbourgs = this.get_neighbourg(i, j);
        neighbourgs.map((n: INeighbourg) => {
          if (
            this.check_in_board(n.coord) &&
            this.board[n.coord.x][n.coord.y] == 0 &&
            this.check_lines(color, n.coord)
          ) {
            possible_move.push({
              x: n.coord.x,
              y: n.coord.y
            });
          }
        });
      }
    }

    return possible_move;
  }

  check_in_board(point: IPoint): boolean {
    return (
      point.x < this.size && point.x >= 0 && point.y < this.size && point.y >= 0
    );
  }

  get_neighbourg(i: number, j: number): INeighbourg[] {
    let neighbourgs: INeighbourg[] = [];
    directions.map(direction => {
      const point = { x: i + direction.x, y: j + direction.y };
      if (this.check_in_board(point)) {
        const n = { coord: point, direction: direction };
        neighbourgs.push(n);
      }
    });
    return neighbourgs;
  }

  check_line(color: State, neighbourg: INeighbourg): boolean {
    const direction = neighbourg.direction;
    const point = neighbourg.coord;
    if (!this.check_in_board(point)) {
      return false;
    }

    let nextPoint = { x: point.x + direction.x, y: point.y + direction.y };
    // The first token is of the opposite color
    if (
      this.check_in_board(nextPoint) &&
      this.board[nextPoint.x][nextPoint.y] !== this.get_opposite_color(color)
    ) {
      return false;
    }

    nextPoint.x += direction.x;
    nextPoint.y += direction.y;

    if (!this.check_in_board(nextPoint)) {
      return false;
    }

    // any number of token can be of the opposite color
    while (
      this.board[nextPoint.x][nextPoint.y] == this.get_opposite_color(color)
    ) {
      nextPoint.x += direction.x;
      nextPoint.y += direction.y;
      if (!this.check_in_board(nextPoint)) {
        return false;
      }
    }
    // the last token is of the player color
    if (this.board[nextPoint.x][nextPoint.y] === color) {
      console.log("checked")
      return true;
    }
    return false;
  }

  check_lines(color: State, point: IPoint): boolean {
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      const neigbourg = { coord: point, direction: direction };
      if (this.check_line(color, neigbourg)) {
        return true;
      }
    }
    return false;
  }

  get_opposite_color(color: State): State {
    if (color === State.Black) {
      return State.White;
    } else if (color === State.White) {
      return State.Black;
    }
    return State.Empty;
  }

  play(point: IPoint, color: State) {
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      const neighbourg = { coord: point, direction: direction };
      this.check_and_capture(neighbourg, color);
    }
    this.board[point.x][point.y] = color;
  }

  check_and_capture(neigbourg: INeighbourg, color: State) {
    const point = neigbourg.coord;
    let nextX = point.x + neigbourg.direction.x;
    let nextY = point.y + neigbourg.direction.y;
    if (this.check_line(color, neigbourg)) {
      while (this.board[nextX][nextY] == this.get_opposite_color(color)) {
        this.board[nextX][nextY] = color;
        nextX += neigbourg.direction.x;
        nextY += neigbourg.direction.y;
      }
    }
  }
}

// let n: INeighbourg = { coord: { x: 2, y: 3 }, direction: { x: 1, y: 0 } };
const game = new Reversi(8);
// console.log(game.get_possible_movement(State.Black));

// console.log(game.board);
// // console.log(game.get_possible_movement(State.White));
// console.log(game.check_line(State.Black, n))

export { Reversi };
