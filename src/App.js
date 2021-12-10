import './App.css';

const DAYS_COMPLETED_SO_FAR = 5;
const DAYS = Array.from({length: DAYS_COMPLETED_SO_FAR}, (_, i) => i + 1);
function App() {
  return (
    <div className="App">
      <header className="App-header">Advent of Code 2021</header>
      <div className='App-container'>
          <div className="day-selector">
              {DAYS.map((day) => (
                  <div className="button-big" key={day}>
                      <div>{`Day ${day}`}</div>
                      <div>
                          <button onClick={() => { onClick(day, 1) }}>{`1`}</button>
                          <button onClick={() => { onClick(day, 2) }}>{`2`}</button>
                      </div>
                  </div>
              ))}
          </div>
          <div className="results">
              <div className="column">1</div>
              <div className="column">2</div>
          </div>
      </div>
    </div>
  );
}

 const onClick = (day, part) => {
    console.log({ day, part });
     const inputFilePath = `${window.location.origin}/inputs/day${day}.txt`;
     const functionToRun = require(`./solutions/day${day}.js`)[`part${part}`];
     fetch(inputFilePath)
         .then(response => response.text())
         .then(data => functionToRun(data));
 }

export default App;
