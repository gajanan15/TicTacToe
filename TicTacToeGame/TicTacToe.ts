import { TicTacToeOperations } from "./Service/TicTacToeOperation";

console.log('Welcome To Tic Tac Toe Game');
var game = new TicTacToeOperations();

class TicTacToeGame {
    gameStart = () => {
        game.resettingBoard();
        game.assignedSymbol();
        game.whoWillPlayFirst();
        game.displayGameBoard();
        game.playGame();
    }
}

new TicTacToeGame().gameStart();



