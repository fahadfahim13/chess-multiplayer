"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Message_1 = require("./Message");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter((val) => val !== socket);
    }
    addHandler(socket) {
        socket.on('message', (data) => {
            const msg = JSON.parse(data.toString());
            if (msg.type === Message_1.MESSAGE_TYPES.INIT_GAME) {
                if (this.pendingUser) {
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (msg.type === Message_1.MESSAGE_TYPES.MOVE) {
                const foundGame = this.games.find((gm) => (gm.getPlayer1() === socket || gm.getPlayer2() === socket));
                if (foundGame) {
                    foundGame.makeMove(socket, msg.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
