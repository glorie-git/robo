import Button from "./Button";

function Controller({ handleClick, buttons }) {
  const gamepad = buttons.map((button, index) => {
    return <Button key={index} handleClick={handleClick} button={button} />;
  });
  return gamepad;
}

export default Controller;
