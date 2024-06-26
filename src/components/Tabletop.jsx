import Square from "./Square.jsx";
import Robo from "./../assets/robot-svgrepo-com.svg";
import Target from "./../assets/bug-svgrepo-com.svg";

// Function to create tabletop using a double for loop
// Paramter: rows and cols
// Return: A 2D array
function generateTabletop(
  rows,
  cols,
  roboLocation,
  getTargetLocation,
  setTargetLocation,
  rotate,
) {
  let row = [];
  let rowIndex = 0;

  if (getTargetLocation() === null) {
    setTargetLocation();
  }

  for (let r = 0; r < rows; r++) {
    let col = [];
    // create squares
    for (let c = 0; c < cols; c++) {
      const index = rows * r + c;
      let value;
      let rotation = 0;

      if (index === roboLocation) {
        value = Robo;
        rotation = rotate;
      } else if (index === getTargetLocation()) {
        value = Target;
      }

      col.push(
        <Square key={index} value={value} id={index} rotate={rotation} />,
      );
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

function Tabletop({
  rows,
  cols,
  roboLocation,
  getTargetLocation,
  setTargetLocation,
  rotate,
}) {
  return generateTabletop(
    rows,
    cols,
    roboLocation,
    getTargetLocation,
    setTargetLocation,
    rotate,
  );
}

export default Tabletop;
