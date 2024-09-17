import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div id="home-container">
      <h1>Ready to Play?</h1>
      <p>
        Use the gamepad to help <b>Robo</b> move across the table. But watch out
        — it is a long way down.
      </p>
      <button>
        <Link to="/game">Start</Link>
      </button>
    </div>
  );
};

export default Home;
