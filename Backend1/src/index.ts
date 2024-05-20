import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8088 });

const gameManager = new GameManager();

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