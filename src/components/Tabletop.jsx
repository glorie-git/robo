import Square from "./Square.jsx";
import Robo from "./../assets/robot-svgrepo-com.svg";
import Target from "./../assets/bug-svgrepo-com.svg";
import PropTypes from "prop-types";

const Tabletop = ({ grids, targetLocation, roboLocation }) => {
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
};

Tabletop.propTypes = {
  grids: PropTypes.array.isRequired,
  targetLocation: PropTypes.number.isRequired,
  roboLocation: PropTypes.number.isRequired,
};

export default Tabletop;
