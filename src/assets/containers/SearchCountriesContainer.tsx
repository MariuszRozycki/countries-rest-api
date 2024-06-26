import { api } from '../api/api';
import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import CountryList from '../components/CountryList';
import { Country } from '../types/Country';
import SearchTitle from '../components/SearchTitle';
import GuessingForm from '../components/GuessingForm';
import ModeSelector from '../components/ModeSelector';

function SearchCountriesContainer() {
  const [filter, setFilter] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [sortOption, setSortOption] = useState('');
  const [mode, setMode] = useState<'search' | 'guess'>('search');
  const [randomCountry, setRandomCountry] = useState<Country | null>(null);

  

  useEffect(() => {
    if (mode === 'search') {
      if (filterValue === '') {
        setCountries([]);
        return;
      }

      if (filter && filterValue) {
        let endpoint = '';
        switch (filter) {
          case 'currency':
            endpoint = `${api}currency/${filterValue}`;
            break;
          case 'language':
            endpoint = `${api}lang/${filterValue}`;
            break;
          case 'capital':
            endpoint = `${api}capital/${filterValue}`;
            break;
          case 'name':
            endpoint = `${api}name/${filterValue}`;
            break;
          default:
            return;
        }

        fetch(endpoint)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            if (Array.isArray(data)) {
              setCountries(data);
            } else {
              setCountries([]);
            }
          })
          .catch((error) => console.error('Error fetching data:', error));
      } else {
        setCountries([]);
      }
    } else if (mode === 'guess') {
      fetch(`${api}all`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomCountry(data[randomIndex]);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [filter, filterValue, mode]);

  const sortedCountries = [...countries].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.common.localeCompare(b.name.common);
    } else if (sortOption === 'population') {
      return b.population - a.population;
    }
    return 0;
  });

  console.log(sortedCountries);

  const fetchRandomCountry = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomCountry(data[randomIndex]);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  return (
    <div className="SearchCountriesContainer">
      <SearchTitle />
      <ModeSelector mode={mode} setMode={setMode}/>
      {mode === 'search' ? (
        <>
          <SearchForm
            filter={filter}
            setFilter={setFilter}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          <CountryList countries={sortedCountries} />
        </>
      ) : randomCountry ? (
        <GuessingForm country={randomCountry} fetchRandomCountry={fetchRandomCountry} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SearchCountriesContainer;
