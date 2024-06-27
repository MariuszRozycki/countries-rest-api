import './CountryList.css';
import { Country } from '../types/Country';

type CountryListProps = {
  countries: Country[];
};

function CountryList({ countries }: CountryListProps) {
  if (!Array.isArray(countries) || countries.length === 0) {
    return <p>No countries found.</p>;
  }
 
  return (
    <ol className="grid grid-cols-1 gap-4 list-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {countries.map((country, index) => (
        <li key={country.name.common} className="country-li-element flex flex-col items-center">
          <h3 className="self-start font-bold">{index + 1} {country.name.common}</h3>
          <div className="img-wrapper">
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
          </div>
        </li>
      ))}
    </ol>
  );
}

export default CountryList;
