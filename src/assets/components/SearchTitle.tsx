function SearchTitle({name = "Countries"}: {name?: string}) {
  return (
    <h1 className="text-2xl font-bold">Search {name}</h1>
  )
}

export default SearchTitle;