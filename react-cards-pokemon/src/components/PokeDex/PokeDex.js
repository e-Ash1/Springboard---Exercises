import { useAxios } from '../../hooks';
import { PokemonCard, PokemonSelect } from '../components';
import "./PokeDex.css";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const [pokemon, fetchPokemon, releasePokemon] = useAxios(`https://pokeapi.co/api/v2/pokemon/`);

  const addPokemon = async(name) =>{
    fetchPokemon(name);
  }

  //Reassigns the setData state-variable to an empty array, within the useAxios() hook:
  const clearPokemon = () =>{
    releasePokemon([])
  };


  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect 
        add={addPokemon} 
        clear={clearPokemon}
        />
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.sprites.front_default}
            back={cardData.sprites.back_default}
            name={cardData.name}
            stats={cardData.stats.map(stat => ({
              value: stat.base_stat,
              name: stat.stat.name
            }))}
          />
        ))}
      </div>
    </div>
  );
};
          

export default PokeDex;
