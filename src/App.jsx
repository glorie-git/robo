import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";

function App() {
  return (
    <>
      <div id="game">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              Home
            </Route>
            <Route path="/game" element={<Game />}>
              Game
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
