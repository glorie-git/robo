import { Link } from "react-router-dom";

const DialogBox = ({ dialogElement }) => {
  return (
    <dialog id="home-dialog">
      <form method="dialog">
        <p>Are you sure you want go to the home screen?</p>
        <div style={{ textAlign: "center" }}>
          <button type="reset">
            <Link to="/">Confirm</Link>
          </button>
          <button
            type="submit"
            onClick={() => {
              dialogElement.close();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default DialogBox;
