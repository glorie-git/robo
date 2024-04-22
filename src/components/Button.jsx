function Button({ handleClick, button }) {
  return (
    <button onClick={() => handleClick(button)}>{button.toUpperCase()}</button>
  );
}

export default Button;
