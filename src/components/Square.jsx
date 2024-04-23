function Square({ value, id, rotate }) {
  return (
    <div className="square">
      <div
        className="container"
        id={id}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        {value}
      </div>
    </div>
  );
}

export default Square;
