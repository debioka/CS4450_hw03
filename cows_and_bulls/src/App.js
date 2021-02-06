import './App.css';
import { gen_code, check_guess, max_guesses} from './game';
import { useState } from 'react';

function GameOver({reset}) {
    return(
	    <div className="App">
	      <h1>Game Over!</h1>
	      <p>
	        <button onClick={reset}>
	          Reset
	        </button>
	      </p>
	    </div>
  );
}

function Victory({reset, attempts}) {
    return(
	    <div className="App">
	      <h1>Correct !</h1>
        <p>It took {attempts} tries</p>
	      <p>
	        <button onClick={reset}>
	          Reset
	        </button>
	      </p>
	    </div>
  );
}

function GuessesTable(guesses, code) {
  let rows = [];
  for (const [i, guess] of guesses.entries()) {
    const {cows, bulls} = check_guess(guess, code)
    rows.push(
      <tr>
        <td>{i + 1}</td>
        <td>{guess.join("")}</td>
        <td>{cows}</td>
        <td>{bulls}</td>
      </tr>
    )
  }
  for (let i = guesses.length + 1; i <= max_guesses; i++) {
    rows.push(<tr><td>{i}</td></tr>);
  }
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Guess</th>
          <th>Cows</th>
          <th>Bulls</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

function App() {
  const [secret, setSecret] = useState(gen_code());
  const [guesses, setGuesses] = useState([]);
  const [text, setText] = useState("");
  const [valid, setValid] = useState(true);

  function updateText(ev) {
    let value = ev.target.value;
    setText(value);
  }

  function reset() {
      setGuesses([]);
      setSecret(gen_code())
      setText("")
  }

  function guess() {
    let digits = text.split("").map( x => parseInt(x, 10))
    if (digits.length == 4 && !digits.includes(NaN)) {
      setGuesses(guesses.concat([digits]));
      setValid(true)
      setText("");
    } else {
      setValid(false);
      setText("");
    }
  }

  function keyPress(ev) {
    if (ev.key == "Enter") {
      guess();
    }
  }

  if (guesses.length >= max_guesses) {
    return <GameOver reset={reset} />;
  }
  if (guesses.length > 1 &&
      check_guess(guesses[guesses.length - 1], secret).bulls == 4) {
    return <Victory reset={reset} attempts={guesses.length}/>
  }
  let table = GuessesTable(guesses, secret)
  return (
    <div className="App">
      <h1> Cows and Bulls </h1>
      <p>
        <input type='text'
               value={text}
               onChange={updateText}
               onKeyPress={keyPress} />
        <button onClick={guess}>Guess</button>
        <button onClick={reset}>Reset</button>
      </p>
      {!valid &&
        <h2>Malformed Guess</h2>
      }
      {table}
    </div>
  );
}

export default App;
