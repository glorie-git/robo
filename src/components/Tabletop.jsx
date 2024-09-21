import Square from "./Square.jsx";
import Robo from "./../assets/robot-svgrepo-com.svg";
import Target from "./../assets/bug-svgrepo-com.svg";

function Tabletop({ grids, targetLocation, roboLocation }) {
  const newTableTop = grids[0].map((grid, index) => (
    <Square
      key={index}
      id={index}
      value={
        index === roboLocation ? Robo : index === targetLocation ? Target : grid
      }
    />
  ));
  return newTableTop;
}

export default Tabletop;
