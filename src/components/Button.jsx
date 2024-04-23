function Button({ handleClick, button }) {
  return (
    <button className="control-btn" onClick={() => handleClick(button)}>
      {button.toUpperCase()}
    </button>
  );
}

export default Button;
