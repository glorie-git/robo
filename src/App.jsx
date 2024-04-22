import { useState, useEffect } from "react";
import "./App.css";
import Square from "./components/Square";

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
  const [rotate, setRotate] = useState(0);
  const startingLocation = 12;
  // TODO: Does not need to be a state variable
  let roboLocation = startingLocation;
  const [points, setPoints] = useState(0);

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

      roboLocation = newLocation;
    }
  }

  return (
    <>
      <div>Score: {points}</div>
      <div className="tabletop">
        <div>{createTabletop(5, 5, roboLocation)}</div>
      </div>
      <div className="controls">
        <button onClick={() => handleClick("left")}>Rotate Left</button>
        <button onClick={() => handleClick("forward")}>Forward</button>
        <button onClick={() => handleClick("right")}>Rotate Right</button>
      </div>
    </>
  );
}

export default App;
