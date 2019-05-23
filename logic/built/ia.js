"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function nextPlay(board, playable) {
    var rand = playable[Math.floor(Math.random() * playable.length)];
    return rand;
}
exports.nextPlay = nextPlay;
