function Square({ value, id }) {
  return (
    <div className="square">
      <div className="container" id={id} style={{ transform: `rotate(0deg)` }}>
        {value}
      </div>
    </div>
  );
}

export default Square;
