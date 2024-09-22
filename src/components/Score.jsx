import PropTypes from "prop-types";

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
