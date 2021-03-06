"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
];
exports.moves = (board1, board2) => board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length;
exports.colors = [
    'red',
    'blue',
    'green',
    'magenta',
    'yellow'
];
exports.getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * exports.colors.length);
    return exports.colors[randomColor];
};
//# sourceMappingURL=lib.js.map