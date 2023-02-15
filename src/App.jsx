import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";



function App() {
  const [sort,setSort] = useState(false)
  const {search,updateSearch,error} = useSearch() 
  const { movies,loading,getMovies } = useMovies({search,sort});
  
  const debounceGetMovies = useCallback( debounce(search => {    
    getMovies({search})
  },500)
  ,[getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({search})
  }

  const handleChange = (event) => {   
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
    
  }

  const handleSort = () =>{
    setSort(!sort)
  }
  
  

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            autoComplete="off"
            name="query"
            placeholder="Ragnarok, Mushoku Tensei, SAO..."
          />
          <input type="checkbox" onChange={handleSort
          } checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }        
      </main>
    </div>
  );
}
export default App;
