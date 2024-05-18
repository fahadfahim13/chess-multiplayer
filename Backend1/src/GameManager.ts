import { WebSocket } from "ws";
import { MESSAGE_TYPES } from "./Message";
import { Game } from "./Game";

export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter((val) => val!== socket);
    }

    private addHandler(socket: WebSocket) {
        socket.on('message', (data) => {
            
            const msg = JSON.parse(data.toString());
            if(msg.type === MESSAGE_TYPES.INIT_GAME) {
                if(this.pendingUser) {
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                } else{
                    this.pendingUser = socket;
                }
            }
            if(msg.type === MESSAGE_TYPES.MOVE) {
                const foundGame = this.games.find((gm) => (gm.getPlayer1() === socket || gm.getPlayer2() === socket));
                if (foundGame) {
                    foundGame.makeMove(socket, msg.move)
                }
            }
        })
    }
}