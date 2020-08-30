import { exit } from "process";

var readlineSync = require('readline-sync');
console.log('Welcome To Tic Tac Toe Game');

const ROWS = 3;
const COLUMNS = 3;
const PLAYER = 0;
const TOTAL_MOVE = (ROWS * COLUMNS);

let boardOfGame: any[][] = [];
let RandomValue = Math.round(Math.random()) % 2;
var PLAYER_SYMBOL;
let counter = 0;
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

    assignedSymbol = () => {
        if (RandomValue == 1) {
            PLAYER_SYMBOL = "X";
        }
        else {
            PLAYER_SYMBOL = "O";
        }

        console.log("Assigned Player Symbol : " + PLAYER_SYMBOL);
       
    }

    whoWillPlayFirst = () => {
        if (RandomValue == PLAYER) {
            
            console.log("Player Play First");
        } else {
            
            console.log("Computer Paly First");
        }
    }

    displayGameBoard = () => {
        console.log("===============");
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                process.stdout.write('| ' + boardOfGame[i][j] + ' |');
            }
            console.log();
            console.log("===============");
        }
    }

    playGame = () => {
        console.log("count : " + counter)
        while (counter < TOTAL_MOVE) {
            let row = readlineSync.question('Enter Player Row');
            let col = readlineSync.question('Enter Player Col');
            if (boardOfGame[row][col] != PLAYER_SYMBOL) {
                boardOfGame[row][col] = PLAYER_SYMBOL
                this.displayGameBoard();
                this.winAtRowPosition(PLAYER_SYMBOL);
                this.winAtColPosition(PLAYER_SYMBOL);
                this.winAtDia(PLAYER_SYMBOL);
                counter++;
            }
            else {
                console.log("Invalid");
            }

        }
    }

    winAtRowPosition = (symbol) => {
        console.log("Row: " + symbol)
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLUMNS; c++) {
                if (boardOfGame[r][c] == boardOfGame[r][c + 1] && boardOfGame[r][c + 1] == boardOfGame[r][c + 2] && boardOfGame[r][c] == symbol) {
                    console.log(symbol + "Win");
                    exit();
                }
            }
        }
    }

    winAtColPosition = (symbol) => {
        if (boardOfGame[0][0] == boardOfGame[1][0] && boardOfGame[1][0] == boardOfGame[2][0] && boardOfGame[0][0] == symbol) {
            console.log(symbol + "Win");
            exit();
        } else if (boardOfGame[0][1] == boardOfGame[1][1] && boardOfGame[1][1] == boardOfGame[2][1] && boardOfGame[0][1] == symbol) {
            console.log(symbol + "Win");
            exit();
        } else if (boardOfGame[0][2] == boardOfGame[1][2] && boardOfGame[1][2] == boardOfGame[2][2] && boardOfGame[0][2] == symbol) {
            console.log(symbol + "Win");
            exit();
        }
    }

    winAtDia = (symbol) => {
        if ((boardOfGame[0][0] == boardOfGame[1][1]) && (boardOfGame[1][1] == boardOfGame[2][2]) && boardOfGame[0][0] == symbol) {
            console.log(symbol + "Win")
            exit();
        }
        else if ((boardOfGame[0][2] == boardOfGame[1][1]) && (boardOfGame[1][1] == boardOfGame[2][0]) && boardOfGame[0][2] == symbol) {
            console.log(symbol + "Win")
            exit();
        }
    }

}

new TicTacToeGame().resettingBoard();
new TicTacToeGame().assignedSymbol();
new TicTacToeGame().whoWillPlayFirst();
new TicTacToeGame().displayGameBoard();
new TicTacToeGame().playGame();



