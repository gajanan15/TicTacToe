console.log('Welcome To Tic Tac Toe Game');
const ROWS = 3;
const COLUMNS = 3;
const PLAYER = 0;
const TOTAL_MOVE = 9;
let boardOfGame = [];
let RandomValue = Math.round(Math.random()) % 2;
var PLAYER_SYMBOL;
let i;
let j;
class TicTacToeGame {
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
            }
            else {
                PLAYER_SYMBOL = "O";
            }
            console.log("Assigned Player Symbol : " + PLAYER_SYMBOL);
        };
        this.whoWillPlayFirst = () => {
            if (RandomValue == PLAYER) {
                console.log("Player Play First");
            }
            else {
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
    }
}
new TicTacToeGame().resettingBoard();
new TicTacToeGame().assignedSymbol();
new TicTacToeGame().whoWillPlayFirst();
new TicTacToeGame().displayGameBoard();
//# sourceMappingURL=TicTacToe.js.map