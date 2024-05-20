import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { COLOR, MESSAGE_TYPES, MOVE } from "./Message";

export class Game {
    private player1: WebSocket;
    private player2: WebSocket;
    private board: Chess;
    private startTime: Date;
    private moveCounter: number;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.moveCounter = 0;
        this.player1.send(JSON.stringify({
            type: MESSAGE_TYPES.INIT_GAME,
            payload: {
                color: COLOR.WHITE
            }
        }));
        this.player2.send(JSON.stringify({
            type: MESSAGE_TYPES.INIT_GAME,
            payload: {
                color: COLOR.BLACK
            }
        }));
    }

    getPlayer1() {
        return this.player1
    }

    getPlayer2() {
        return this.player2
    }

    makeMove(socket: WebSocket, move: MOVE) {
        console.log('Move: ');
        console.log(move);
        if(this.moveCounter % 2 === 0 && socket !== this.player1) {
            return;
        }
        if(this.moveCounter %2 === 1 && socket !== this.player2){
            return;
        }
        try {
            console.log('Move started');
            this.board.move(move);
            this.moveCounter++;
            console.log('Move done');
            if(this.board.isGameOver()) {
                this.player1.send(JSON.stringify({
                    type: MESSAGE_TYPES.GAME_OVER,
                    payload: {
                        result: this.board.isDraw() ? MESSAGE_TYPES.DRAW : (this.board.turn() === 'w' ? 'Black wins' : 'White wins'),
                        winner: this.board.isDraw() ? 'None' : (this.board.turn() === 'w' ? 'Black' : 'White')
                    }
                }));
                this.player2.send(JSON.stringify({
                    type: MESSAGE_TYPES.GAME_OVER,
                    payload: {
                        result: this.board.isDraw() ? MESSAGE_TYPES.DRAW : (this.board.turn() === 'w' ? 'Black wins' : 'White wins'),
                        winner: this.board.isDraw() ? 'None' : (this.board.turn() === 'w' ? 'Black' : 'White')
                    }
                }));
            }
            if(this.moveCounter % 2 === 0){
                this.player1.send(JSON.stringify({
                    type: MESSAGE_TYPES.MOVE,
                    payload: move
                }));
            } else{
                this.player2.send(JSON.stringify({
                    type: MESSAGE_TYPES.MOVE,
                    payload: move
                }))
            }
        } catch (error) {
            console.error(error);
            return;
        }
    }
}