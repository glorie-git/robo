import "./App.css";

function Square({ value, id }) {
  return (
    <div className="square">
      <div className="container" id={id}>
        {value}
      </div>
    </div>
  );
}
function App() {
  return (
    <>
      <div className="tabletop">
        <div className="grid-row">
          <Square value="" id="0" />
          <Square value="" id="1" />
          <Square value="" id="2" />
          <Square value="" id="3" />
          <Square value="" id="4" />
        </div>
        <div className="grid-row">
          <Square value="" id="5" />
          <Square value="" id="6" />
          <Square value="" id="7" />
          <Square value="" id="8" />
          <Square value="" id="9" />
        </div>
        <div className="grid-row">
          <Square value="" id="10" />
          <Square value="" id="11" />
          <Square value="R" id="12" />
          <Square value="" id="13" />
          <Square value="" id="14" />
        </div>
        <div className="grid-row">
          <Square value="" id="15" />
          <Square value="" id="16" />
          <Square value="" id="17" />
          <Square value="" id="18" />
          <Square value="T" id="19" />
        </div>
        <div className="grid-row">
          <Square value="" id="20" />
          <Square value="" id="21" />
          <Square value="" id="22" />
          <Square value="" id="23" />
          <Square value="" id="24" />
        </div>
      </div>
      <div className="controls"></div>
    </>
  );
}

export default App;
