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

const directions = [
  {x: -1, y: -1},
  {x: 0, y: 1},
  {x: 1, y: 1},
  {x: 1, y: 0},
  {x: 1, y: -1},
  {x: 0, y: 1},
  {x: -1, y: -1},
  {x: -1, y: 0},
  {x: -1, y: 1}
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
          if (this.check_line(color, n)) {
            possible_move.push({
              x: n.coord[0],
              y: n.coord[1]
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
      const point = {x: i + direction[0], y: j + direction[1]};
      if(this.check_in_board(point)) {
        const n = {coord: point, direction: direction};
        neighbourgs.push(n)
      }

    });
    return neighbourgs;
  }

  is_in_board(coord: [number, number]): boolean {
    if (
      coord[0] >= this.size ||
      coord[0] < 0 ||
      coord[1] >= this.size ||
      coord[1] < 0
    ) {
      return false;
    }
    return true;
  }

  check_line(color: State, point: INeighbourg) {
    const direction = point.direction;
    let coord: [number, number] = [
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
    this.board[point.x][point.y] = color;
  
  }

  check_and_capture(neigbourg: INeighbourg, color: State) {
    const point = neigbourg.coord;
    this.board[point.x][point.y] = color;
    let nextX = point.x + neigbourg.direction.x;
    let nextY = point.y + neigbourg.direction.y;
    if (this.check_line(color, neigbourg)) {
      this.board[point.x][point.y] = color;
      let nextX = point.x + neigbourg.direction.x;
      let nextY = point.y + neigbourg.direction.y;
    }
  }
}

let n: INeighbourg = { coord: {x:3, y:2}, direction: {x:0, y:1} };
const game = new Reversi(8);
console.log(game.get_possible_movement(State.White));

game.play({ x: 3, y: 2}, State.White);
console.log(game.board);
console.log(game.get_possible_movement(State.White));

export { Reversi };
