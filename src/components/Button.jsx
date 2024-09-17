import PropTypes from "prop-types";

function Button({ handleClick, button }) {
  return (
    <button className="control-btn" onClick={() => handleClick(button)}>
      {button.toUpperCase()}
    </button>
  );
}

Button.propTypes = {
  button: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Button;
