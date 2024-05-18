import React from "react";
import Board from "../assets/board.png";

const Landing = () => {
  return (
    <div>
      <div className="mt-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img src={Board} alt="Chessboard" className="max-w-96" />
          </div>
          <div className="">
            <h1 className="flex justify-center text-white text-4xl font-bold">
              Play Chess Online on the #2 Site!
            </h1>
            <div className="mt-4 flex justify-center">
              <button className="p-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Play Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
