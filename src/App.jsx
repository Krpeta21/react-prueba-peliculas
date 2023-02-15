import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";




function App() {
  const {search,updateSearch,error} = useSearch() 
  const { movies,loading,getMovies } = useMovies({search});
  

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies()
  }

  const handleChange = (event) => {   
    updateSearch(event.target.value)
    
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
