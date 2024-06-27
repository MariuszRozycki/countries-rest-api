
type Mode = 'search' | 'guess';

type ModeSelectorProps = {
  mode: Mode;
  setMode: (arg: Mode) => void;
}

function ModeSelector({mode, setMode}: ModeSelectorProps) {
  return (
      <div className="flex gap-2 justify-center my-2">
        <div className="element-wrapper flex gap-1">
          <input
            type="radio"
            id="search"
            name="mode"
            value="search"
            checked={mode === 'search'}
          onChange={() => setMode('search')}
          />
          <label htmlFor="search">Search Mode</label>
        </div>
        <div className="element-wrapper flex gap-1">
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
      </div>
  )
}

export default ModeSelector;