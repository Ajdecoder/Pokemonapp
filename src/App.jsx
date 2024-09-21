import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch the Pokémon data from PokeAPI
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        const fetchDetails = response.data.results.map((pokemon) =>
          axios.get(pokemon.url).then((res) => res.data)
        );
        // Resolve all promises and set Pokémon data
        Promise.all(fetchDetails).then((data) => setPokemonList(data));
      })
      .catch((error) => console.error("Error fetching the data", error));
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Pokémon List</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
