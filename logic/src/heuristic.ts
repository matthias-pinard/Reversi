import { Reversi } from "./reversi";

enum State {
  Empty = 0,
  Black = 1,
  White = 2
}

class Heuristic {
  NO_MOVES_PENALTY: number;
  CORNERS_WEIGHT: number;
  NEAR_CORNERS_WEIGHT: number;
  STABILITY_WEIGHT: number;
  MOBILITY_WEIGHT: number;
  staticStabilityMap: number[][];
  PARITY_WEIGHT: number;

  constructor() {
    this.NO_MOVES_PENALTY = 20;
    this.CORNERS_WEIGHT = 801.724;
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

  evaluate(board: State[][], color: State): number {
    return (
      this.parity(board, color) +
      this.mobility(board, color) +
      this.stability(board, color) +
      this.countCorners(board, color)
    );
  }

  noAvailableMovesEvaluation(currentBoard, playerColor) {
    return this.evaluate(currentBoard, playerColor);
  }

  parity(board, color) {
    let game = new Reversi(board);
    let cCurr = game.get_score(color);
    let oppColor = color == State.Black ? State.White : State.Black;
    let cOpp = game.get_score(oppColor);
    let score = ((100 * (cCurr - cOpp)) / (cCurr + cOpp)) * this.PARITY_WEIGHT;
    if (cCurr > cOpp) {
      return score;
    }
    return -score;
  }

  mobility(board, color) {
    let game = new Reversi(board);
    let moCurr = game.get_possible_movement(color).length;
    let oppColor = color == State.Black ? State.White : State.Black;
    let moOpp = game.get_possible_movement(oppColor).length;
    if (moCurr + moOpp !== 0)
      return (
        ((100 * (moCurr - moOpp)) / (moCurr + moOpp)) * this.MOBILITY_WEIGHT
      );
    else return 0;
  }

  countCorners(board, color) {
    let c=0;
    let corCurr = 0;
    let corOpp = 0;
    let size = board.length - 1;
    const corners = [
      { x: 0, y: 0 },
      { x: size, y: 0 },
      { x: 0, y: size },
      { x: size, y: size }
    ];
    corners.forEach(corner => {
      let oppColor = color == State.Black ? State.White : State.Black;
      if(board[corner.x][corner.y] == color) {
          corCurr++;
      } else if(board[corner.x][corner.y] == oppColor) {
          corOpp++;
      }
      console.log(`oppopent corner: ${corOpp}`);
      console.log(`my corner: ${corCurr}`);

    });
    let corCurr1=0;
    let corOpp1=0;
    let oppColor = color == State.Black ? State.White : State.Black;
    
    if(board[0][0] == '-'){
        if(board[0][1] == color) {
            corCurr1++;
        } else if(board[0][1] == oppColor) {
            corOpp1++;
        }else if(board[1][1] == color) {
            corCurr1++;
        } else if(board[1][1] == oppColor) {
            corOpp1++;
        } else if(board[1][0] == color) {
            corCurr1++;
        } else if(board[1][0] == oppColor) {
            corOpp1++;
        }

    }
    if(board[0][size] == '-'){
        if(board[0][size-1] == color) {
            corCurr1++;
        } else if(board[0][size-1] == oppColor) {
            corOpp1++;
        }else if(board[1][size-1] == color) {
            corCurr1++;
        } else if(board[1][size-1] == oppColor) {
            corOpp1++;
        } else if(board[1][size] == color) {
            corCurr1++;
        } else if(board[1][size] == oppColor) {
            corOpp1++;
        }

    }
    if(board[size][0] == '-'){
        if(board[size][1] == color) {
            corCurr1++;
        } else if(board[size][1] == oppColor) {
            corOpp1++;
        }else if(board[size-1][1] == color) {
            corCurr1++;
        } else if(board[size-1][1] == oppColor) {
            corOpp1++;
        } else if(board[size-1][0] == color) {
            corCurr1++;
        } else if(board[size-1][0] == oppColor) {
            corOpp1++;
        }

    }

    if(board[size][size] == '-'){
        if(board[size-1][size] == color) {
            corCurr1++;
        } else if(board[size-1][size] == oppColor) {
            corOpp1++;
        }else if(board[size-1][size-1] == color) {
            corCurr1++;
        } else if(board[size-1][size-1] == oppColor) {
            corOpp1++;
        } else if(board[size][size-1] == color) {
            corCurr1++;
        } else if(board[size][size-1] == oppColor) {
            corOpp1++;
        }

    }

    let l = (-12.5)*(corCurr1 - corOpp1);

    let score = 0;
    c= 25 *(corCurr - corOpp)
    if (corCurr + corOpp !== 0){
      score =  c*this.CORNERS_WEIGHT + l * this.NEAR_CORNERS_WEIGHT}
      console.log(score)
     return score;
  }

  stability(board, color) {
    let result = 0;
    let row = 0;
    let col = 0;
    for (let i = 0; i < board.length; i++) {
      {
        for (let j = 0; j < board.length; j++) {
          {
            if (board[i][j] != null) {
              col = i;
              row = j;
              let temp = this.staticStabilityMap[i][j];
              result += (board[i][j] === color ? 1 : -1) * temp;
            }
          }
        }
      }
    }
    return result * this.STABILITY_WEIGHT;
  }
}
export { Heuristic };

let game = new Reversi(8);
let h = new Heuristic();
console.log(h.evaluate(game.board, State.Black));
