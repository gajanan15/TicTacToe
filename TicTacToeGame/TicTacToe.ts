
console.log('Welcome To Tic Tac Toe Game');

const ROWS = 3;
const COLUMNS = 3;
const PLAYER = 0;
const TOTAL_MOVE = 9;

let boardOfGame: any[][] = [];
let i;
let j;

class TicTacToeGame {
    resettingBoard = () => {
        for (i = 0; i < ROWS; i++) {
            boardOfGame[i] = [];
            for (j = 0; j < COLUMNS; j++) {
                boardOfGame[i][j] = "-";
            }
        }
    }
}

new TicTacToeGame().resettingBoard();
