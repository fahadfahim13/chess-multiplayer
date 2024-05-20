import React, { useEffect, useState } from "react";
import ChessBoard from "../components/ChessBoard";
import Button from "../components/Button";
import useSocket from "../hooks/useSocket";
import { MESSAGE_TYPES } from "../utils/constants";
import { Chess } from "chess.js";

const Game = () => {
  const socket = useSocket();
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(game.board());

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      console.log(msg);
      switch (msg.type) {
        case MESSAGE_TYPES.INIT_GAME:
          setBoard(game.board());
          console.log("Game Initialized!!");
          break;
        case MESSAGE_TYPES.MOVE:
          const move = msg.payload;
          game.move(move);
          setBoard(game.board());
          console.log("Move from opponent: " + JSON.stringify(msg.payload));
          break;
        case MESSAGE_TYPES.MOVE:
          console.log("Game Over");
          game.clear();
          setBoard(game.board());
          break;

        default:
          break;
      }
    };
  }, [socket]);

  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4 bg-red-200 w-full flex justify-center">
            <ChessBoard game={game} setBoard={setBoard} board={board} socket={socket} />
          </div>
          <div className="col-span-2 bg-slate-600 w-full flex justify-center">
            <div className="pt-12">
              <Button
                onClick={() => {
                  console.log('Play clicked')
                  socket?.send(
                    JSON.stringify({
                      type: MESSAGE_TYPES.INIT_GAME,
                    })
                  );
                }}
              >
                Play
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
