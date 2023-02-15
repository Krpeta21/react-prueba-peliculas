import { useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";




function App() {
  const [sort,setSort] = useState(false)
  const {search,updateSearch,error} = useSearch() 
  const { movies,loading,getMovies } = useMovies({search,sort});
  

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies()
  }

  const handleChange = (event) => {   
    updateSearch(event.target.value)
    
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
