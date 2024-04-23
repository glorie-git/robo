import Square from "./Square.jsx";

// Function to create tabletop using a double for loop
// Paramter: rows and cols
// Return: A 2D array
function generateTabletop(
  rows,
  cols,
  roboLocation,
  getTargetLocation,
  setTargetLocation,
) {
  let row = [];
  let rowIndex = 0;

  console.log(getTargetLocation());

  if (getTargetLocation() === null) {
    setTargetLocation();
  }

  for (let r = 0; r < rows; r++) {
    let col = [];
    // create squares
    for (let c = 0; c < cols; c++) {
      const index = rows * r + c;
      let value;

      if (index === roboLocation) {
        value = "R";
      } else if (index === getTargetLocation()) {
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

function Tabletop({
  rows,
  cols,
  roboLocation,
  getTargetLocation,
  setTargetLocation,
}) {
  return generateTabletop(
    rows,
    cols,
    roboLocation,
    getTargetLocation,
    setTargetLocation,
  );
}

export default Tabletop;
