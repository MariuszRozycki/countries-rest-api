import { useState } from 'react';
import { Country } from '../types/Country';

type GuessingFormProps = {
  country: Country;
  fetchRandomCountry: () => void;
  hint: string;
  setHint: (value: string) => void;
  message: string; 
  setMessage: (value: string) => void;
  guess: string;
  setGuess: (value: string) => void;
};

function GuessingForm({ country, fetchRandomCountry, hint, setHint, message, setMessage, guess, setGuess }: GuessingFormProps) {
  console.log(message);
  
  const [btnHintValue, setBtnHintValue] = useState('Give a hint');

  const checkGuess = () => {
    if (guess.toLowerCase() === country.name.common.toLowerCase()) {
      setMessage('Correct!');
    } else if (guess === '') {
      setMessage('');
    } else {
      setMessage('Incorrect, try again.');
    }
  };

  const giveHint = () => {
    if (hint === '') {
      setHint(country.name.common);
      setBtnHintValue('Hide a hint');
    } else {
      setBtnHintValue('Give a hint');
      setHint('');
    }
    
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
        <input
          className="d-block, my-2 p-2"
          type="text"
          placeholder="Guess the country"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
      </div>
      <button
        className="my-2"
        onClick={checkGuess}>Check</button>
      <button
        className="my-2"
        onClick={giveHint}>{btnHintValue}</button>
      <p className="my-2 font-bold rounded-md">{hint}</p>  
      <button onClick={fetchRandomCountry}>Randomize Again</button>
      <p className="my-2 font-bold">{message}</p>
    </div>
  );
}

export default GuessingForm;
