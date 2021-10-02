export const TETROMINOS = {
    0: { shape: [[0]], color: '0, 0, 0'},
    I: {
        shape: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
        ],
        color: '80, 227, 230'
    },
    S: {
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0],
        ],
        color: '0, 255, 0'
    },
    Z: {
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0],
        ],
        color: '255, 0, 0'
    },
    L: {
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L'],
        ],
        color: '223, 173, 36'
    },
    J: {
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0],
        ],
        color: '0, 255, 255'
    },
    T: {
        shape: [
            ['T', 'T', 'T'],
            [0, 'T', 0],
            [0, 0, 0],
        ],
        color: '128, 0, 128'
    },
    O: {
        shape: [
            ['O', 'O'],
            ['O', 'O']
        ],
        color: '223, 217, 36'
    }
}

// function to return random tetris shape
export const randomTetromino = () => {
    // store all shapes as a string
    const tetrominos = 'IJLOSTZ'; 
    // the Math.floor() function returns the largest integer less than or equal to a given number
    // Math.random() function returns a random number between 0 (inclusive) and 1 (exclusive)
    // randTetromino is the variable that stores the randomly chosen index of the tetrominos string
    const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    // returns the shape object with the corresponding letter
    return TETROMINOS[randTetromino];
}