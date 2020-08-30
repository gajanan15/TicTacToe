import { exit } from "process";

var readlineSync = require('readline-sync');

//Constants
const ROWS = 3;
const COLUMNS = 3;
const PLAYER = 0;
const TOTAL_MOVE = 9;

//Declare Array
let boardOfGame: any[][] = [];

//Variables
let RandomValue = Math.round(Math.random()) % 2;
var PLAYER_SYMBOL;
var COMPUTER_SYMBOL;
var flag: number = 0;
let counter = 0;
let i;
let j;

export class TicTacToeOperations {

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
            COMPUTER_SYMBOL = "O";
        }
        else {
            PLAYER_SYMBOL = "O";
            COMPUTER_SYMBOL = "X";
        }

        console.log("Assigned Player Symbol : " + PLAYER_SYMBOL);
        console.log("Assigned Computer Symbol : " + COMPUTER_SYMBOL);
    }

    whoWillPlayFirst = () => {
        if (RandomValue == PLAYER) {
            flag = 0;
            console.log("Player Play First");
        } else {
            flag = 1;
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
        while (counter < TOTAL_MOVE) {
            if (flag == 0) {
                console.log("Player Play");
                let row = readlineSync.question('Enter Player Row : ');
                let col = readlineSync.question('Enter Player Col : ');
                if (row >= ROWS && col >= COLUMNS) {
                    console.log("Invalid");
                }
                else if (boardOfGame[row][col] != PLAYER_SYMBOL) {
                    boardOfGame[row][col] = PLAYER_SYMBOL;
                    this.checkForWin(PLAYER_SYMBOL)
                    counter++;
                    flag = 1;
                }
                else {
                    console.log("Cell Is Not Empty");
                }
            } else if (flag == 1) {
                console.log("Computer Play");
                var row = Math.round(Math.random() * 10) % 3;
                var col = Math.round(Math.random() * 10) % 3;
                if (boardOfGame[row][col] != PLAYER_SYMBOL && boardOfGame[row][col] != COMPUTER_SYMBOL) {
                    boardOfGame[row][col] = COMPUTER_SYMBOL;
                    this.checkForWin(COMPUTER_SYMBOL);
                    counter++;
                    flag = 0;
                }
            }
        }
    }

    checkForWin = (symbol) => {
        this.displayGameBoard();
        this.winAtRowPosition(symbol);
        this.winAtColPosition(symbol);
        this.winAtDia(symbol);
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