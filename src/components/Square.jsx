function Square({ value, id, rotate }) {
  return (
    <div className="square">
      <div
        className="container"
        id={id}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        {value ? <img src={value} /> : null}
      </div>
    </div>
  );
}

export default Square;
