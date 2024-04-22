import { useState, useEffect } from "react";
import "./App.css";
import Square from "./components/Square";
import Controller from "./components/Controller";

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
  console.log("In tabletop.");
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
  const [rotate, setRotate] = useState(0);
  const startingLocation = 12;
  // TODO: Does not need to be a state variable
  // let roboLocation = startingLocation;
  const [roboLocation, setRoboLocation] = useState(startingLocation);
  const [points, setPoints] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [leaderboard, setLeaderboard] = useState([
    ["player4", "100"],
    ["player6", "105"],
    ["player9", "101"],
  ]);

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
  const [time, setTime] = useState(60);

  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     setTime((time) => {
  //       if (time === 0) {
  //         clearInterval(timer);
  //         console.log("Time is up!");
  //         setTimeUp(true);
  //         return 0;
  //       } else return time - 1;
  //     });
  //   }, 1000);

  //   // Cleanup function to clear the interval
  //   return () => clearInterval(timer);
  // }, []); // Empty dependency array to run only once when the component mounts

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

      element.innerText = "";
      element.style.transform = "rotate(0deg)";
      const newElement = document.getElementById(newLocation);
      newElement.innerText = "R";
      newElement.style.transform = `rotate(${rotate}deg)`;

      setRoboLocation(newLocation);
    }
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
              <h1>Game Over</h1>
            ) : (
              <div>
                <div className="tabletop">
                  {createTabletop(5, 5, roboLocation)}
                </div>
                <div className="controls"></div>
                <Controller
                  handleClick={handleClick}
                  buttons={["left", "forward", "right"]}
                />
              </div>
            )}
          </div>
        </div>

        <div id="board">
          <h2>Leaderboard</h2>
          <ul>
            {leaderboard
              .sort((a, b) => {
                if (a[1] < b[1]) {
                  return 1;
                } else if (a[1] > b[1]) {
                  return -1;
                }

                return 0;
              })
              .map((leader) => {
                return (
                  <li key={leader}>
                    {leader[0]} {leader[1]}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
