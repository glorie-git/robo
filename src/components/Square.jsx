import PropTypes from "prop-types";

const Square = ({ value, id }) => {
  return (
    <div className="square">
      <div className="container" id={id}>
        {value ? <img src={value} /> : null}
      </div>
    </div>
  );
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
