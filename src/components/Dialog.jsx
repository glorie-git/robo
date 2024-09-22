import PropTypes from "prop-types";

const DialogBox = ({ id, dialogContent }) => {
  return (
    <dialog id={id}>
      <form method="dialog">{dialogContent}</form>
    </dialog>
  );
};

DialogBox.propTypes = {
  id: PropTypes.string,
  dialogContent: PropTypes.object.isRequired,
};

export default DialogBox;
