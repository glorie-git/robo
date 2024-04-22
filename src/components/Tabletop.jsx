import Square from "./Square.jsx";

// Function to create tabletop using a double for loop
// Paramter: rows and cols
// Retun: A 2D array
function Tabletop({
  rows,
  cols,
  setTargetLocation,
  getTargetLocation,
  generateTargetLocation,
}) {
  let row = [];
  let rowIndex = 0;

  console.log("In createTabletop component.");
  let targetLocation = getTargetLocation();
  console.log("Target Location: " + targetLocation);

  if (targetLocation === null) {
    targetLocation = generateTargetLocation();
    setTargetLocation(targetLocation);
    console.log("Initial target location: " + targetLocation);
  }
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

  // console.log("Done.");
  // console.log(row);
  return row;
}

//   const targetLocation = generateTargetLocation();
//   setTargetLocation(targetLocation);

export default Tabletop;
