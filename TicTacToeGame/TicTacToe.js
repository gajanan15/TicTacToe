"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TicTacToeOperation_1 = require("./Service/TicTacToeOperation");
console.log('Welcome To Tic Tac Toe Game');
var game = new TicTacToeOperation_1.TicTacToeOperations();
class TicTacToeGame {
    constructor() {
        this.gameStart = () => {
            game.resettingBoard();
            game.assignedSymbol();
            game.whoWillPlayFirst();
            game.displayGameBoard();
            game.playGame();
        };
    }
}
new TicTacToeGame().gameStart();
//# sourceMappingURL=TicTacToe.js.map