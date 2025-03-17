import PokemonList from "./components/PokemonList.jsx"
import "./App.css"

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokemon Application</h1>
        <p>Search Pokemon</p>
      </header>
      <main>
        <PokemonList />
      </main>
      <footer className="app-footer">
        <p>
          {/* Data provided by{" "}
          <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
            PokéAPI
          </a> */}
          Site made by <a href="http://github.com/falakrana" target="_blank">Falak Rana</a>
        </p>
      </footer>
    </div>
  )
}

export default App

