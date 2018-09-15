export const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]

export const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

export const colors = [
    'red', 
    'blue',
    'green',
    'magenta',
    'yellow'
]

export const getRandomColor = () =>{
    const randomColor = Math.floor(Math.random() * colors.length)
    return colors[randomColor]
}

