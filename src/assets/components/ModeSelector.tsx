import React from "react";

type Mode = 'search' | 'guess';

type ModeSelectorProps = {
  mode: Mode;
  setMode: (arg: Mode) => void;
}

function ModeSelector({mode, setMode}: ModeSelectorProps) {
  return (
      <div>
        <input
          type="radio"
          id="search"
          name="mode"
          value="search"
          checked={mode === 'search'}
        onChange={() => setMode('search')}
        />
        <label htmlFor="search">Search Mode</label>
        <input
          type="radio"
          id="guess"
          name="mode"
          value="guess"
          checked={mode === 'guess'}
          onChange={() => setMode('guess')}
        />
        <label htmlFor="guess">Guessing Mode</label>
      </div>
  )
}

export default ModeSelector;