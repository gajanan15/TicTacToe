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
var checkFlag: number;
var checkFlag1: number;
let counter = 0;
let checkCount;
let newLetterCount;
let tieCount = 0;
var row;
var col;
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
                row = readlineSync.question('Enter Player Row');
                col = readlineSync.question('Enter Player Col');
                if (row >= ROWS || col >= COLUMNS) {
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
                checkFlag = 0;
                console.log("Computer Play");
                if (checkFlag == 0) {
                    this.computerWinningBoard(COMPUTER_SYMBOL, COMPUTER_SYMBOL);
                }
                if (checkFlag == 0) {
                    this.computerWinningBoard(PLAYER_SYMBOL, COMPUTER_SYMBOL);
                }

                this.checkForWin(COMPUTER_SYMBOL);
                counter++;
                flag = 0;
            }
        }
    }

    computerWinningBoard = (symbol1, symbol2) => {
        var checkLetter = symbol1;
        var putLetter = symbol2;
        checkFlag = 0;
        checkFlag1 = 0;

        if (checkFlag1 == 0) {
            for (let i = 0; i < ROWS; i++) {
                checkCount = 0;
                newLetterCount = 0;
                for (let j = 0; j < COLUMNS; j++) {
                    this.computerWinChecking(i, j, checkLetter);
                }
                if (checkCount == 2 && newLetterCount == 1) {
                    boardOfGame[row][col] = putLetter;
                    checkFlag1 = 1;
                    checkFlag = 1;
                }
            }
        }

        if (checkFlag1 == 0) {
            for (let i = 0; i < ROWS; i++) {
                checkCount = 0;
                newLetterCount = 0;
                for (let j = 0; j < COLUMNS; j++) {
                    this.computerWinChecking(j, i, checkLetter);
                }
                if (checkCount == 2 && newLetterCount == 1) {
                    boardOfGame[row][col] = putLetter;
                    checkFlag1 = 1;
                    checkFlag = 1;
                }
            }
        }

        if (checkFlag1 == 0) {
            checkCount = 0
            newLetterCount = 0
            for (let i = 0; i < ROWS; i++) {
                for (let j = 0; j < COLUMNS; j++) {
                    if (i == j) {
                        this.computerWinChecking(i, j, checkLetter);
                    }
                }
            }

            if (checkCount == 2 && newLetterCount == 1) {
                boardOfGame[row][col] = putLetter;
                checkFlag1 = 1;
                checkFlag = 1;
            }
        }

        //diagonal right to left
        if (checkFlag1 == 0) {
            checkCount = 0
            newLetterCount = 0
            for (let i = 0; i < 3; i++) {
                for (let j = (2 - i); j < 3; j++) {
                    this.computerWinChecking(i, j, checkLetter);
                    break;
                }
            }
            if (checkCount == 2 && newLetterCount == 1) {
                boardOfGame[row][col] = putLetter;
                checkFlag1 = 1;
                checkFlag = 1;
            }
        }
    }

    playerOrComputerWon = (sysmbol) => {
        if (sysmbol == PLAYER_SYMBOL) {
            console.log("Player Won");
        } else {
            console.log("Computer Won");
        }
        exit();
    }

    computerWinChecking = (r, c, symbol) => {
        if (boardOfGame[r][c] == symbol) {
            checkCount++;
        } else if (boardOfGame[r][c] == "-") {
            newLetterCount++;
            row = r;
            col = c;
        }
    }

    checkForWin = (symbol) => {
        tieCount++;
        this.displayGameBoard();
        this.winAtRowPosition(symbol);
        this.winAtColPosition(symbol);
        this.winAtDiagonal(symbol);
        if (tieCount > 8) {
            console.log("It's a Tie");
            exit();
        }
    }

    winAtRowPosition = (symbol) => {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLUMNS; c++) {
                if (boardOfGame[r][c] == boardOfGame[r][c + 1] && boardOfGame[r][c + 1] == boardOfGame[r][c + 2] && boardOfGame[r][c] == symbol) {
                    this.playerOrComputerWon(symbol);
                }
            }
        }
    }

    winAtColPosition = (symbol) => {
        if (boardOfGame[0][0] == boardOfGame[1][0] && boardOfGame[1][0] == boardOfGame[2][0] && boardOfGame[0][0] == symbol) {
            this.playerOrComputerWon(symbol);
        } else if (boardOfGame[0][1] == boardOfGame[1][1] && boardOfGame[1][1] == boardOfGame[2][1] && boardOfGame[0][1] == symbol) {
            this.playerOrComputerWon(symbol);
        } else if (boardOfGame[0][2] == boardOfGame[1][2] && boardOfGame[1][2] == boardOfGame[2][2] && boardOfGame[0][2] == symbol) {
            this.playerOrComputerWon(symbol);
        }
    }

    winAtDiagonal = (symbol) => {
        if ((boardOfGame[0][0] == boardOfGame[1][1]) && (boardOfGame[1][1] == boardOfGame[2][2]) && boardOfGame[0][0] == symbol) {
            this.playerOrComputerWon(symbol);
        }
        else if ((boardOfGame[0][2] == boardOfGame[1][1]) && (boardOfGame[1][1] == boardOfGame[2][0]) && boardOfGame[0][2] == symbol) {
            this.playerOrComputerWon(symbol);
        }
    }
}