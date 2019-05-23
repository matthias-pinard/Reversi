interface IPoint {
  x: number;
  y: number;
}

export default function nextPlay(board: Number[][], playable: IPoint[]): IPoint {

  let rand = playable[Math.floor(Math.random() * playable.length)];
  return rand;
}

