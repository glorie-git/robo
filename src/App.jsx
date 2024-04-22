import { useState } from "react";
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
      element.style.transform = `rotate(0deg)`;

      const newElement = document.getElementById(newLocation);
      newElement.innerText = "R";
      newElement.style.transform = `rotate(${rotate}deg)`;

      console.log("New location: " + newLocation);

      setLocation(newLocation);
    }
  }

  return (
    <>
      <div className="tabletop">
        <div className="grid-row">
          <Square value="" id="0" />
          <Square value="" id="1" />
          <Square value="" id="2" />
          <Square value="" id="3" />
          <Square value="" id="4" />
        </div>
        <div className="grid-row">
          <Square value="" id="5" />
          <Square value="" id="6" />
          <Square value="" id="7" />
          <Square value="" id="8" />
          <Square value="" id="9" />
        </div>
        <div className="grid-row">
          <Square value="" id="10" />
          <Square value="" id="11" />
          <Square value="R" id="12" />
          <Square value="" id="13" />
          <Square value="" id="14" />
        </div>
        <div className="grid-row">
          <Square value="" id="15" />
          <Square value="" id="16" />
          <Square value="" id="17" />
          <Square value="" id="18" />
          <Square value="T" id="19" />
        </div>
        <div className="grid-row">
          <Square value="" id="20" />
          <Square value="" id="21" />
          <Square value="" id="22" />
          <Square value="" id="23" />
          <Square value="" id="24" />
        </div>
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
