import { useState, useEffect } from "react";
import "./App.css";
import Square from "./components/Square";
import Controller from "./components/Controller";
import Leaderboard from "./components/Leaderboard";

function generateTargetLocation(roboLocation) {
  const newTargetLocation = Math.floor(Math.random() * 25);
  if (newTargetLocation !== roboLocation) {
    return newTargetLocation;
  } else {
    return generateTargetLocation(roboLocation);
  }
}

let targetLocation = null;

// Function to create tabletop using a double for loop
// Paramter: rows and cols
// Retun: A 2D array
function createTabletop(rows, cols, roboLocation) {
  let row = [];
  let rowIndex = 0;

  if (targetLocation === null) {
    targetLocation = generateTargetLocation(roboLocation);
  }

  for (let r = 0; r < rows; r++) {
    let col = [];
    // create squares
    for (let c = 0; c < cols; c++) {
      const index = rows * r + c;
      let value;

      if (index === roboLocation) {
        value = "R";
      } else if (index === targetLocation) {
        value = "T";
      }

      col.push(<Square key={index} value={value} id={index} />);
    }
    row.push(
      <div key={rowIndex} className="grid-row">
        {col}
      </div>,
    );
    rowIndex++;
  }

  return row;
}

function App() {
  const startingLocation = 12;
  const gameLength = 60;

  const [rotate, setRotate] = useState(0);
  const [roboLocation, setRoboLocation] = useState(startingLocation);
  const [points, setPoints] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(true);

  // PRELOAD DATA TO LOCALSTORAGE
  // const data = [
  //   ["player12", "21"],
  //   ["player24", "59"],
  //   ["player2", "31"],
  // ];

  // localStorage.setItem("games", JSON.stringify(data));

  const [leaderboard, setLeaderboard] = useState(
    JSON.parse(localStorage.getItem("games")),
  );

  useEffect(() => {
    if (roboLocation === targetLocation) {
      console.log("Target found.");
      // increment points
      setPoints(points + 1);

      // generate new target roboLocation
      const newTargetLocation = generateTargetLocation(roboLocation);

      // // setTargetLocation(newTargetLocation);
      targetLocation = newTargetLocation;
    }
  }, [roboLocation]);

  // Game timer
  // Thanks to https://codesandbox.io/p/sandbox/simple-react-countdown-timer-forked-ztxcnx?file=%2Fsrc%2FApp.js%3A5%2C3-19%2C79
  const [time, setTime] = useState(gameLength);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          console.log("Time is up!");
          setIsRunning(false);
          setTimeUp(true);
          return 0;
        } else return time - 1;
      });
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(timer);
  }, [isRunning]); // Empty dependency array to run only once when the component mounts

  // Stop timer when game is over
  useEffect(() => {
    if (timeUp) {
      setTime(0);
    }
  }, [timeUp]);

  function handleClick(value) {
    console.log(value);

    const element = document.getElementById(roboLocation);
    if (value === "left") {
      const rotation = (rotate - 90) % 360;
      element.style.transform = `rotate(${rotation}deg)`;

      setRotate(rotation);
    } else if (value === "right") {
      const rotation = (rotate + 90) % 360;
      element.style.transform = `rotate(${rotation}deg)`;

      setRotate(rotation);
    } else if (value === "forward") {
      let newLocation;

      if (rotate === 0) {
        newLocation = roboLocation - 5;
      } else if (rotate === 90 || rotate === -270) {
        newLocation = roboLocation + 1;
      } else if (rotate === -90 || rotate === 270) {
        newLocation = roboLocation - 1;
      } else if (rotate === 180 || rotate === -180) {
        newLocation = roboLocation + 5;
      }

      let isTimeUp = false;

      if (newLocation < 0) {
        // Robo has fallen off the top edge
        console.log("Fallen off the top.");
        isTimeUp = true;
        setTimeUp(isTimeUp);
      } else if (newLocation > 25) {
        // Robo has fallen off the bottom edge
        console.log("Fallen off the bottom.");
        isTimeUp = true;
        setTimeUp(isTimeUp);
      } else if (roboLocation % 5 === 0) {
        // Robo is at the left edge
        if (rotate === -90 || rotate === 270) {
          // Falls off on left edge
          console.log("Fallen off left edge.");
          isTimeUp = true;
          setTimeUp(isTimeUp);
        }
      } else if (roboLocation % 5 === 4) {
        // Robo is at the right edge
        if (rotate === 90 || rotate === -270) {
          // Falls off on right edge
          console.log("Fallen off right edge.");
          isTimeUp = true;
          setTimeUp(isTimeUp);
        }
      }

      if (!timeUp) {
        element.innerText = "";
        element.style.transform = "rotate(0deg)";
        const newElement = document.getElementById(newLocation);

        if (newElement) {
          newElement.innerText = "R";
          newElement.style.transform = `rotate(${rotate}deg)`;
          setRoboLocation(newLocation);
        }
      }
    }
  }

  function submitPoints(e) {
    e.preventDefault();

    let games = JSON.parse(localStorage.getItem("games"));
    games.push([input, `${points}`]);
    localStorage.setItem("games", JSON.stringify(games));
    console.log(JSON.parse(localStorage.getItem("games")));

    setLeaderboard(games);
    console.log("Game submitted.");
    setInput("");

    const element = document.getElementById("points-form");
    element.style.display = "none";
  }

  function handleChange(e) {
    const input = e.target.value;
    setInput(input);
  }

  function handlePlayClick() {
    // RESET GAME
    setPoints(0);
    setTimeUp(false);
    setRoboLocation(startingLocation);
    setTime(gameLength);
    setRotate(0);
    setIsRunning(true);
  }

  return (
    <>
      <div id="game">
        <div>
          <div className="grid-row space">
            <div>Score: {points}</div>
            <div>Timer: {time}</div>
          </div>
          <div>
            {timeUp ? (
              <div>
                <h1>Game Over</h1>
                <form id="points-form" onSubmit={submitPoints}>
                  <p>Enter a name below to save your score.</p>
                  <input
                    value={input}
                    placeholder="Enter a name"
                    onChange={handleChange}
                  />
                  <button type="submit">Save</button>
                </form>
                <button onClick={handlePlayClick}>Play</button>
              </div>
            ) : (
              <div>
                <div className="tabletop">
                  {createTabletop(5, 5, roboLocation)}
                </div>
                <div className="controls">
                  <Controller
                    handleClick={handleClick}
                    buttons={["left", "forward", "right"]}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="board">
          <Leaderboard leaderboard={leaderboard} />
        </div>
      </div>
    </>
  );
}

export default App;
