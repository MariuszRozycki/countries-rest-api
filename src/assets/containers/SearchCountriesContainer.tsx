import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import CountryList from '../components/CountryList';
import { Country } from '../types/Country';
import SearchTitle from '../components/SearchTitle';
import GuessingForm from '../components/GuessingForm';
import ModeSelector from '../components/ModeSelector';

function SearchCountriesContainer() {
  const [filter, setFilter] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [sortOption, setSortOption] = useState('');
  const [mode, setMode] = useState<'search' | 'guess'>('search');
  const [message, setMessage] = useState('');
  const [hint, setHint] = useState('');
  const [randomCountry, setRandomCountry] = useState<Country | null>(null);
  const [guess, setGuess] = useState('');

  const baseUrl = `https://restcountries.com/v3.1/`;
  
  useEffect(() => {
    if (filter === '') {
      setInputValue('');
    }
  }, [filter]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const urlAll = `${baseUrl}all`;
        const response = await fetch(urlAll);
        const data = await response.json();
        setCountries(data);

        if (mode === 'guess') {
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomCountry(data[randomIndex]);
        }

        if (mode === 'search' && filter && inputValue) {
          let endpoint = '';
          switch (filter) {
            case 'currency':
              endpoint = `${baseUrl}currency/${inputValue}`;
              break;
            case 'language':
              endpoint = `${baseUrl}lang/${inputValue}`;
              break;
            case 'capital':
              endpoint = `${baseUrl}capital/${inputValue}`;
              break;
            case 'name':
              endpoint = `${baseUrl}name/${inputValue}`;
              break;
            default:
              return;
          }

          const filteredResponse = await fetch(endpoint);
          const filteredData = await filteredResponse.json();
          if (Array.isArray(filteredData)) {
            setCountries(filteredData);
          } else {
            setCountries([]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCountries();
  }, [baseUrl, mode, filter, inputValue]);

  const sortedCountries = [...countries].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.common.localeCompare(b.name.common);
    } else if (sortOption === 'population') {
      return b.population - a.population;
    }
    return 0;
  });

  const fetchRandomCountry = async () => {
    try {
      const response = await fetch(`${baseUrl}all`);
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      console.log(data[randomIndex]);
      
      setRandomCountry(data[randomIndex]);
      setMessage('');
      setHint('');
      setInputValue('');
      setGuess('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="SearchCountriesContainer">
      <SearchTitle />
      <ModeSelector mode={mode} setMode={setMode} />
      {mode === 'search' ? (
        <>
          <SearchForm
            filter={filter}
            setFilter={setFilter}
            inputValue={inputValue}
            setInputValue={setInputValue}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          <CountryList countries={sortedCountries} />
        </>
      ) : randomCountry ? (
        <GuessingForm
          country={randomCountry}
          hint={hint}
          setHint={setHint}
          fetchRandomCountry={fetchRandomCountry}
          message={message}
          setMessage={setMessage}
          guess={guess}
          setGuess={setGuess}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SearchCountriesContainer;
