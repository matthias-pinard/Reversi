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
  x: number,
  y: number
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
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.board[i][j] = State.Empty;
      }
    }
    this.board[size / 2][size] = State.White;
    this.board[size / 2 + 1][size / 2 + 1] = State.White;
    this.board[size / 2][size / 2 + 1] = State.Black;
    this.board[size / 2 + 1][size / 2] = State.Black;
  }

  get_possible_movement(color: State): IPoint[]{
    let possible_move: IPoint[] = [];
    this.board.map((row, i) => {
      row.map((tile: State, j) => {
        let neighbourgs = this.get_neighbourg(i, j);
        neighbourgs.map((n: INeighbourg) => {
          if(this.check_line(color, n)) {
            possible_move.push({x: n.coord[0], y: n.coord[1]});
          };
        })
      });
    });
  }

  get_neighbourg(i: number, j: number): INeighbourg[] {
    let neighbourgs: INeighbourg[];
    if (i - 1 > 0 && j - 1 > 0) {
      neighbourgs.push({ coord: [i - 1, j - 1], direction: [-1, -1] });
    }
    if (i - 1 > 0) {
      neighbourgs.push({ coord: [i - 1, j], direction: [-1, 0] });
    }
    if (i - 1 > 0 && j + 1 < this.size) {
      neighbourgs.push({ coord: [i - 1, j + 1], direction: [-1, 1] });
    }
    if (j - 1 > 0) {
      neighbourgs.push({ coord: [i, j - 1], direction: [0, 1] });
    }
    if (i + 1 < this.size && j - 1 > 0) {
      neighbourgs.push({ coord: [i + 1, j - 1], direction: [1, -1] });
    }
    if (i + 1 < this.size) {
      neighbourgs.push({ coord: [i + 1, j], direction: [1, 0] });
    }
    if (i + 1 < this.size && j + 1 < this.size) {
      neighbourgs.push({ coord: [i + 1, j + 1], direction: [1, 1] });
    }
    if (j + 1 < this.size) {
      neighbourgs.push({ coord: [i, j + 1], direction: [0, 1] });
    }
    return neighbourgs;
  }

  check_line(color: State, point: INeighbourg){
    let done = false;
    const direction = point.direction;
    let coord = [point.coord[0] + direction[0], point.coord[1] + direction[1]];
    if(this.board[coord[0]][coord[1]] !== this.get_opposite_color(color)) {
      return false;
    }
    coord[0] += direction[0];
    coord[1] += direction[1];

    while(this.board[coord[0]][coord[1]] !== this.get_opposite_color(color)) {
      coord[0] += direction[0];
      coord[1] += direction[1];
    }
    if(this.board[coord[0]][coord[1]] === color) {
      return true
    }
    return false;
  }

  get_opposite_color(color: State): State {
    if (State.Black) {
      return State.White;
    } else if (State.White) {
      return State.Black;
    }
    return State.Empty;
  }
}
