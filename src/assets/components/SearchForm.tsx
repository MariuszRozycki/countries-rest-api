import SelectFilter from './SelectFilter';
import InputFormValue from './InputFormValue';
import SelectSortBy from './SelectSortBy';

type SearchFormProps = {
  filter: string;
  setFilter: (filter: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
};

function SearchForm({
  filter,
  setFilter,
  inputValue,
  setInputValue,
  sortOption,
  setSortOption,
}: SearchFormProps) {
  return (
    <form className="flex flex-col items-center gap-2 flex items-end justify-center">
      <SelectFilter filter={filter} setFilter={setFilter} />
      <InputFormValue inputValue={inputValue} setInputValue={setInputValue}/>
      <SelectSortBy sortOption={sortOption} setSortOption={setSortOption}/>
    </form>
  );
} 

export default SearchForm;
