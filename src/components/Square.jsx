function Square({ value, id }) {
  return (
    <div className="square">
      <div className="container" id={id}>
        {value ? <img src={value} /> : null}
      </div>
    </div>
  );
}

export default Square;
