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
                    <div className="column" id="details-section" ></div>
                    <div className="column" id="results-section" ></div>
                </div>
            </div>
        </div>
    );
}

const isElement = (element) => {
    return element instanceof Element || element instanceof HTMLDocument;
}

const pushDetail = (content) => {
    const contentIsHTMLElement = isElement(content);
    let detail;
    if (contentIsHTMLElement) {
        detail = content;
    } else {
        detail = document.createElement('div');
        detail.className = 'detail';
        detail.innerHTML = content;
    }
    const detailsSection = document.getElementById('details-section');
    detailsSection.appendChild(detail);
}

const clearDetails = () => {
    const detailsSection = document.getElementById('details-section');
    detailsSection.innerHTML = '';
}

const pushResult = (content) => {
    const detailsSection = document.getElementById('results-section');
    const result = document.createElement('div');
    result.className = 'result';
    result.innerHTML = content;
    detailsSection.appendChild(result);
}

const onClick = (day, part) => {
    console.log({ day, part });
    const inputFilePath = `${window.location.origin}/inputs/day${day}.txt`;
    const functionToRun = require(`./solutions/day${day}.js`)[`part${part}`];
    const resultsSection = document.getElementById('results-section');
    fetch(inputFilePath)
        .then(response => response.text())
        .then(data => {
            functionToRun(data, {
                pushDetail,
                pushResult,
                clearDetails
            });
        });
}

export default App;
