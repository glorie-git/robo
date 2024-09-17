// Component to display the end of game screen.
function EndGame({
  points,
  submitPoints,
  input,
  handleChange,
  handlePlayClick,
}) {
  return (
    <>
      <h2>Game Over</h2>
      <p>You scored {points}</p>
      <form id="points-form" onSubmit={submitPoints}>
        <p>Enter a name below to save your score.</p>
        <input
          value={input}
          placeholder="Enter a name"
          onChange={handleChange}
        />
        <button
          disabled={true}
          className="disabled-btn"
          style={{ cursor: `not-allowed` }}
          id="submit-btn"
          type="submit"
        >
          Save
        </button>
      </form>
      <button onClick={handlePlayClick}>Play Again</button>
    </>
  );
}

export default EndGame;
