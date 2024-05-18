"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Message_1 = require("./Message");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.moveCounter = 0;
        this.player1.send(JSON.stringify({
            type: Message_1.MESSAGE_TYPES.INIT_GAME,
            payload: {
                color: Message_1.COLOR.WHITE
            }
        }));
        this.player2.send(JSON.stringify({
            type: Message_1.MESSAGE_TYPES.INIT_GAME,
            payload: {
                color: Message_1.COLOR.BLACK
            }
        }));
    }
    getPlayer1() {
        return this.player1;
    }
    getPlayer2() {
        return this.player2;
    }
    makeMove(socket, move) {
        console.log('Move number: ');
        console.log(this.moveCounter);
        if (this.moveCounter % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.moveCounter % 2 === 1 && socket !== this.player2) {
            return;
        }
        try {
            console.log('Move started');
            this.board.move(move);
            this.moveCounter++;
            console.log('Move done');
            if (this.board.isGameOver()) {
                this.player1.send(JSON.stringify({
                    type: Message_1.MESSAGE_TYPES.GAME_OVER,
                    payload: {
                        result: this.board.isDraw() ? Message_1.MESSAGE_TYPES.DRAW : (this.board.turn() === 'w' ? 'Black wins' : 'White wins'),
                        winner: this.board.isDraw() ? 'None' : (this.board.turn() === 'w' ? 'Black' : 'White')
                    }
                }));
                this.player2.send(JSON.stringify({
                    type: Message_1.MESSAGE_TYPES.GAME_OVER,
                    payload: {
                        result: this.board.isDraw() ? Message_1.MESSAGE_TYPES.DRAW : (this.board.turn() === 'w' ? 'Black wins' : 'White wins'),
                        winner: this.board.isDraw() ? 'None' : (this.board.turn() === 'w' ? 'Black' : 'White')
                    }
                }));
            }
            console.log('Moves length');
            console.log(this.moveCounter);
            if (this.moveCounter % 2 === 0) {
                this.player1.send(JSON.stringify({
                    type: Message_1.MESSAGE_TYPES.MOVE,
                    payload: move
                }));
            }
            else {
                this.player2.send(JSON.stringify({
                    type: Message_1.MESSAGE_TYPES.MOVE,
                    payload: move
                }));
            }
        }
        catch (error) {
            console.error(error);
            return;
        }
    }
}
exports.Game = Game;
