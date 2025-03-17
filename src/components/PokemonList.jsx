"use client";

import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard.jsx";
import "./PokemonList.css";

function PokemonList() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }

        const data = await response.json();

        const processedData = data.results.map((pokemon) => {

          const id = Number.parseInt(pokemon.url.split("/")[6]);

          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return {
            ...pokemon,
            id,
            imageUrl,
          };
        });

        setAllPokemon(processedData);
        setFilteredPokemon(processedData);
      } catch (err) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {

    const filtered = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [searchTerm, allPokemon]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return <div className="loading">Loading Pokémon...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="pokemon-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {filteredPokemon.length === 0 ? (
        <div className="no-results">
          Pokemon not found "{searchTerm}"
        </div>
      ) : (
        <div className="pokemon-grid">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              id={pokemon.id}
              imageUrl={pokemon.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonList;
