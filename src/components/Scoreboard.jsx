import PropTypes from "prop-types";

// Component to display the points
function Scoreboard({ points }) {
  return (
    <>
      <span>Score: {points}</span>
    </>
  );
}

Scoreboard.propTypes = {
  points: PropTypes.number.isRequired,
};

export default Scoreboard;
