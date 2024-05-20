"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8088 });
const gameManager = new GameManager_1.GameManager();
wss.on('connection', function connection(ws) {
    console.log('Connection started');
    gameManager.addUser(ws);
    ws.on('disconnect', () => gameManager.removeUser(ws));
    ws.on('error', console.error);
    // ws.on('message', function message(data) {
    //   console.log('received: %s', data);
    //   gameManager
    // });
    // ws.send('e4 e5');
});
