import { useState, useEffect } from "react";
import "./App.css";

function Square({ value, id }) {
  return (
    <div className="square">
      <div className="container" id={id} style={{ transform: `rotate(0deg)` }}>
        {value}
      </div>
    </div>
  );
}

function App() {
  const startingLocation = 12;
  const [rotate, setRotate] = useState(0);
  const [location, setLocation] = useState(startingLocation);

  function getTargetLocation() {
    const newTargetLocation = Math.floor(Math.random() * 25);
    // setTargetLocation(newTargetLocation);

    if (newTargetLocation !== location) {
      return newTargetLocation;
    } else {
      return getTargetLocation();
    }
  }

  const [targetLocation, setTargetLocation] = useState(getTargetLocation());
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (location === targetLocation) {
      console.log("Target found.");
      // increment points
      setPoints(points + 1);

      // generate new target location
      // const
    }
  }, [location]);

  function handleClick(value) {
    console.log(value);

    const element = document.getElementById(location);
    if (value === "left") {
      const rotation = (rotate - 90) % 360;
      element.style.transform = `rotate(${rotation}deg)`;

      setRotate(rotation);
    } else if (value === "right") {
      const rotation = (rotate + 90) % 360;
      element.style.transform = `rotate(${rotation}deg)`;

      setRotate(rotation);
    } else if (value === "forward") {
      // Move forward

      let newLocation;
      if (rotate === 0) {
        newLocation = location - 5;
      } else if (rotate === 90) {
        newLocation = location + 1;
      } else if (rotate === -90) {
        newLocation = location - 1;
      } else if (rotate === 180 || rotate === -180) {
        newLocation = location + 5;
      }

      element.innerText = "";
      element.style.transform = "rotate(0deg)";
      // console.log("New location: " + newLocation);
      const newElement = document.getElementById(newLocation);
      // console.log(newElement);
      newElement.innerText = "R";
      newElement.style.transform = `rotate(${rotate}deg)`;

      // console.log("New location: " + newLocation);

      setLocation(newLocation);
    }
  }

  // Function to create tabletop using a double for loop
  // Paramter: rows and cols
  // Retun: A 2D array
  function createTabletop(rows, cols) {
    let row = [];
    let rowIndex = 0;
    for (let r = 0; r < rows; r++) {
      let col = [];
      // create squares
      for (let c = 0; c < cols; c++) {
        const index = rows * r + c;
        let value;

        if (index === 12) {
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

  return (
    <>
      <div>Score: {points}</div>
      <div className="tabletop">
        <div>{createTabletop(5, 5)}</div>
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
