import PropTypes from "prop-types";

// Component to display the countdown
function Timer({ time }) {
  return <div id="timer">Timer: {time}</div>;
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
};

export default Timer;
