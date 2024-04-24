function EndGame({ submitPoints, input, handleChange, handlePlayClick }) {
  return (
    <>
      <h1>Game Over</h1>
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
      <button onClick={handlePlayClick}>Play</button>
    </>
  );
}

export default EndGame;
