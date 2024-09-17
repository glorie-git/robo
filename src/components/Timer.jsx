import PropTypes from "prop-types";

// Component to display the countdown
function Timer({ time }) {
  return <>Timer: {time}</>;
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
};

export default Timer;
