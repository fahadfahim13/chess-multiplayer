import React, { Dispatch, SetStateAction, useState } from "react";
import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { MESSAGE_TYPES } from "../utils/constants";

interface Board {
  square: Square;
  type: PieceSymbol;
  color: Color;
}

const ChessBoard = ({
  game,
  setBoard,
  board,
  socket,
}: {
  game: Chess;
  setBoard: Dispatch<SetStateAction<(Board | null)[][]>>;
  board: (Board | null)[][];
  socket: WebSocket | null;
}) => {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  const handleColClick = (col: string) => {
    console.log(col);
    if (!from) {
      setFrom(col);
    } else {
      // setTo(col?.square ?? null);
      socket?.send(
        JSON.stringify({
          type: MESSAGE_TYPES.MOVE,
          move: {
            from: from,
            to: col,
          },
        })
      );
      game.move({
        from: from,
        to: col,
      });
      setBoard(game.board());
      setFrom(null);
    }
  };

  return (
    <div className="text-white-200">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((col, j) => {
              const sqr = `${col?.type ? col.type : ""}${String.fromCodePoint(97 + (j % 8))}${8 - i}`;
              return (
                <div
                  key={sqr}
                  className={`w-16 h-16 ${
                    (i + j) % 2 === 0 ? "bg-green-100" : "bg-green-800"
                  }`}
                  onClick={() => handleColClick(sqr)}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col">
                      {col?.type ? col.type : ""}
                      {/* {`${sqr}${8-i}`} */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
