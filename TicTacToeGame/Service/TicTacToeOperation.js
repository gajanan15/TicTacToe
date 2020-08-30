"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToeOperations = void 0;
const process_1 = require("process");
var readlineSync = require('readline-sync');
//Constants
const ROWS = 3;
const COLUMNS = 3;
const PLAYER = 0;
const TOTAL_MOVE = 9;
//Declare Array
let boardOfGame = [];
//Variables
let RandomValue = Math.round(Math.random()) % 2;
var PLAYER_SYMBOL;
var COMPUTER_SYMBOL;
var flag = 0;
var checkFlag;
var checkFlag1;
let counter = 0;
let checkCount;
let newLetterCount;
let tieCount = 0;
var putLetter;
var row;
var col;
let i;
let j;
class TicTacToeOperations {
    constructor() {
        this.resettingBoard = () => {
            for (i = 0; i < ROWS; i++) {
                boardOfGame[i] = [];
                for (j = 0; j < COLUMNS; j++) {
                    boardOfGame[i][j] = "-";
                }
            }
        };
        this.assignedSymbol = () => {
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
        };
        this.whoWillPlayFirst = () => {
            if (RandomValue == PLAYER) {
                flag = 0;
                console.log("Player Play First");
            }
            else {
                flag = 1;
                console.log("Computer Paly First");
            }
        };
        this.displayGameBoard = () => {
            console.log("===============");
            for (let i = 0; i < ROWS; i++) {
                for (let j = 0; j < COLUMNS; j++) {
                    process.stdout.write('| ' + boardOfGame[i][j] + ' |');
                }
                console.log();
                console.log("===============");
            }
        };
        this.playGame = () => {
            while (counter < TOTAL_MOVE) {
                if (flag == 0) {
                    console.log("Player Play");
                    row = readlineSync.question('Enter Player Row');
                    col = readlineSync.question('Enter Player Col');
                    if (row >= ROWS || col >= COLUMNS) {
                        console.log("Invalid");
                    }
                    else if (boardOfGame[row][col] != PLAYER_SYMBOL && boardOfGame[row][col] != COMPUTER_SYMBOL) {
                        boardOfGame[row][col] = PLAYER_SYMBOL;
                        this.checkForWin(PLAYER_SYMBOL);
                        counter++;
                        flag = 1;
                    }
                    else {
                        console.log("Cell Is Not Empty");
                    }
                }
                else if (flag == 1) {
                    checkFlag = 0;
                    console.log("Computer Play");
                    if (checkFlag == 0) {
                        this.computerWinningBoard(COMPUTER_SYMBOL, COMPUTER_SYMBOL);
                    }
                    if (checkFlag == 0) {
                        this.computerWinningBoard(PLAYER_SYMBOL, COMPUTER_SYMBOL);
                    }
                    if (checkFlag == 0) {
                        this.takingCornerPosition(COMPUTER_SYMBOL);
                    }
                    this.checkForWin(COMPUTER_SYMBOL);
                    counter++;
                    flag = 0;
                }
            }
        };
        this.checkForWin = (symbol) => {
            tieCount++;
            this.displayGameBoard();
            this.winAtRowPosition(symbol);
            //this.winAtColPosition(symbol);
            this.winAtDiagonalPosition(symbol);
            if (tieCount > 8) {
                console.log("It's a Tie");
                process_1.exit();
            }
        };
        this.computerWinChecking = (r, c, symbol) => {
            if (boardOfGame[r][c] == symbol) {
                checkCount++;
            }
            else if (boardOfGame[r][c] == "-") {
                newLetterCount++;
                row = r;
                col = c;
            }
        };
        this.reassignCounter = () => {
            checkCount = 0;
            newLetterCount = 0;
        };
        this.checkCounterAndChangeFlagValue = (r, c, letter) => {
            if (checkCount == 2 && newLetterCount == 1) {
                boardOfGame[r][c] = letter;
                checkFlag1 = 1;
                checkFlag = 1;
            }
        };
        this.computerWinningBoard = (symbol1, symbol2) => {
            var checkLetter = symbol1;
            putLetter = symbol2;
            checkFlag = 0;
            checkFlag1 = 0;
            if (checkFlag1 == 0) {
                for (let i = 0; i < ROWS; i++) {
                    this.reassignCounter();
                    for (let j = 0; j < COLUMNS; j++) {
                        this.computerWinChecking(i, j, checkLetter);
                    }
                    this.checkCounterAndChangeFlagValue(row, col, putLetter);
                }
            }
            if (checkFlag1 == 0) {
                for (let i = 0; i < ROWS; i++) {
                    this.reassignCounter();
                    for (let j = 0; j < COLUMNS; j++) {
                        this.computerWinChecking(j, i, checkLetter);
                    }
                    this.checkCounterAndChangeFlagValue(row, col, putLetter);
                }
            }
            if (checkFlag1 == 0) {
                this.reassignCounter();
                for (let i = 0; i < ROWS; i++) {
                    for (let j = 0; j < COLUMNS; j++) {
                        if (i == j) {
                            this.computerWinChecking(i, j, checkLetter);
                        }
                    }
                }
                this.checkCounterAndChangeFlagValue(row, col, putLetter);
            }
            //diagonal right to left
            if (checkFlag1 == 0) {
                this.reassignCounter();
                for (let i = 0; i < 3; i++) {
                    for (let j = (2 - i); j < 3; j++) {
                        this.computerWinChecking(i, j, checkLetter);
                        break;
                    }
                }
                this.checkCounterAndChangeFlagValue(row, col, putLetter);
            }
        };
        this.takingCornerPosition = (symbol) => {
            checkFlag = 0;
            for (let i = 0; i < ROWS; i = (i + 2)) {
                for (let j = 0; j < COLUMNS; j = (j + 2)) {
                    if (boardOfGame[i][j] == "-") {
                        boardOfGame[i][j] = symbol;
                        checkFlag = 1;
                        return;
                    }
                }
            }
        };
        this.playerOrComputerWon = (sysmbol) => {
            if (sysmbol == PLAYER_SYMBOL) {
                console.log("Player Won");
            }
            else {
                console.log("Computer Won");
            }
            process_1.exit();
        };
        this.winAtRowPosition = (symbol) => {
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLUMNS; c++) {
                    if (boardOfGame[r][c] == boardOfGame[r][c + 1] && boardOfGame[r][c + 1] == boardOfGame[r][c + 2] && boardOfGame[r][c] == symbol) {
                        this.playerOrComputerWon(symbol);
                    }
                }
            }
        };
        this.winAtColPosition = (symbol) => {
            if (boardOfGame[0][0] == boardOfGame[1][0] && boardOfGame[1][0] == boardOfGame[2][0] && boardOfGame[0][0] == symbol) {
                this.playerOrComputerWon(symbol);
            }
            else if (boardOfGame[0][1] == boardOfGame[1][1] && boardOfGame[1][1] == boardOfGame[2][1] && boardOfGame[0][1] == symbol) {
                this.playerOrComputerWon(symbol);
            }
            else if (boardOfGame[0][2] == boardOfGame[1][2] && boardOfGame[1][2] == boardOfGame[2][2] && boardOfGame[0][2] == symbol) {
                this.playerOrComputerWon(symbol);
            }
        };
        this.winAtDiagonalPosition = (symbol) => {
            if ((boardOfGame[0][0] == boardOfGame[1][1]) && (boardOfGame[1][1] == boardOfGame[2][2]) && boardOfGame[0][0] == symbol) {
                this.playerOrComputerWon(symbol);
            }
            else if ((boardOfGame[0][2] == boardOfGame[1][1]) && (boardOfGame[1][1] == boardOfGame[2][0]) && boardOfGame[0][2] == symbol) {
                this.playerOrComputerWon(symbol);
            }
        };
    }
}
exports.TicTacToeOperations = TicTacToeOperations;
//# sourceMappingURL=TicTacToeOperation.js.map