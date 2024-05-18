import { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Landing from './pages/Landing';
import Game from './pages/Game';


function App() {

  return (
    <div className="h-screen bg-slate-800">
      <BrowserRouter>
      <Routes>
        <Route path="/" Component={Landing} /> {/* 👈 Renders at /app/ */}
        <Route path="/game" Component={Game} /> {/* 👈 Renders at /app/ */}
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
