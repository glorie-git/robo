import PropTypes from "prop-types";

// Component to display the points
const Score = ({ points }) => {
  return (
    <div id="score">
      <span>Score: {points}</span>
    </div>
  );
};

Score.propTypes = {
  points: PropTypes.number.isRequired,
};

export default Score;
