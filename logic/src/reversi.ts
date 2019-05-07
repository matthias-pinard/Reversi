enum State {
  Empty,
  Black,
  White
}

enum Color {
  Black,
  White
}

interface IPoint {
  x: number;
  y: number;
  direction: {
    x: number;
    y: number;
  };
}

interface INeighbourg {
  coord: [number, number];
  direction: [number, number];
}

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
              y: n.coord[1],
              direction: { x: n.direction[0], y: n.direction[1] }
            });
          }
        });
      }
    }

    return possible_move;
  }

  get_neighbourg(i: number, j: number): INeighbourg[] {
    let neighbourgs: INeighbourg[] = [];
    //1
    if (i - 1 > 0 && j - 1 > 0) {
      neighbourgs.push({ coord: [i - 1, j - 1], direction: [-1, -1] });
    }
    //2
    if (i - 1 > 0) {
      neighbourgs.push({ coord: [i - 1, j], direction: [-1, 0] });
    }
    //3
    if (i - 1 > 0 && j + 1 < this.size) {
      neighbourgs.push({ coord: [i - 1, j + 1], direction: [-1, 1] });
    }
    //4
    if (j - 1 > 0) {
      neighbourgs.push({ coord: [i, j - 1], direction: [0, -1] });
    }
    //5
    if (i + 1 < this.size && j - 1 > 0) {
      neighbourgs.push({ coord: [i + 1, j - 1], direction: [1, -1] });
    }
    //6
    if (i + 1 < this.size) {
      neighbourgs.push({ coord: [i + 1, j], direction: [1, 0] });
    }
    //7
    if (i + 1 < this.size && j + 1 < this.size) {
      neighbourgs.push({ coord: [i + 1, j + 1], direction: [1, 1] });
    }
    if (j + 1 < this.size) {
      neighbourgs.push({ coord: [i, j + 1], direction: [0, 1] });
    }
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
    const direction: [number, number] = point.direction;
    let coord: [number, number] = [
      point.coord[0] + direction[0],
      point.coord[1] + direction[1]
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
    let nextX = point.x + point.direction.x;
    let nextY = point.y + point.direction.y;
    while(this.board[nextX][nextY] == this.get_opposite_color(color)) {
      this.board[nextX][nextY] = color;
      nextX += point.direction.x;
      nextY += point.direction.y;
    }
  }
}

let n: INeighbourg = { coord: [3, 2], direction: [0, 1] };
const game = new Reversi(8);
game.play({x: 2, y:4, direction: {x:1, y:0}}, State.White)
console.log(game.board);
console.log(game.get_possible_movement(State.White));

export { Reversi };
