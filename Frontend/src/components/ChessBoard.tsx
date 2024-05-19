import React, { useState } from "react";
import { Color, PieceSymbol, Square } from "chess.js";
import { MESSAGE_TYPES } from "../utils/constants";

interface Board {
  square: Square;
  type: PieceSymbol;
  color: Color;
}

const ChessBoard = ({
  board,
  socket,
}: {
  board: (Board | null)[][];
  socket: WebSocket | null;
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  const [to, setTo] = useState<Square | null>(null);

  const handleColClick = (col: Board | null) => {
    console.log(col);
    if(!from) {
      setFrom(col?.square ?? null);
    } else{
      // setTo(col?.square ?? null);
      socket?.send(JSON.stringify({
        type: MESSAGE_TYPES.MOVE,
        move: {
          from: from,
          to: col?.square,
        }
      }))
      setFrom(null);
    }
  }

  return (
    <div className="text-white-200">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((col, j) => {
              return (
                <div
                  key={j}
                  className={`w-16 h-16 ${
                    (i + j) % 2 === 0 ? "bg-green-100" : "bg-green-800"
                  }`}
                  onClick={() => handleColClick(col)}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col">
                      {col?.type ? col.type : ""}
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
