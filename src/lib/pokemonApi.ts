import axios from 'axios';
import { Pokemon, PokemonApiResponse } from '@/types/pokemon';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = {
  // Obtener lista de Pokémon con paginación
  async getPokemonList(offset: number = 0, limit: number = 20): Promise<PokemonApiResponse> {
    try {
      const response = await axios.get(`${POKE_API_BASE_URL}/pokemon`, {
        params: { offset, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching pokemon list:', error);
      throw new Error('Error al cargar la lista de Pokémon');
    }
  },

  // Obtener detalles de un Pokémon específico
  async getPokemonDetails(idOrName: string | number): Promise<Pokemon> {
    try {
      const response = await axios.get(`${POKE_API_BASE_URL}/pokemon/${idOrName}`);
      const pokemon = response.data;
      
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork']?.front_default || 
               pokemon.sprites.front_default || 
               '/pokemon-placeholder.png',
        types: pokemon.types.map((type: any) => type.type.name),
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: pokemon.abilities.map((ability: any) => ability.ability.name),
        stats: {
          hp: pokemon.stats[0]?.base_stat || 0,
          attack: pokemon.stats[1]?.base_stat || 0,
          defense: pokemon.stats[2]?.base_stat || 0,
          specialAttack: pokemon.stats[3]?.base_stat || 0,
          specialDefense: pokemon.stats[4]?.base_stat || 0,
          speed: pokemon.stats[5]?.base_stat || 0,
        }
      };
    } catch (error) {
      console.error(`Error fetching pokemon details for ${idOrName}:`, error);
      throw new Error(`Error al cargar los detalles de ${idOrName}`);
    }
  },

  // Buscar Pokémon por nombre
  async searchPokemon(query: string): Promise<Pokemon[]> {
    try {
      // Primero obtenemos una lista más grande para buscar
      const response = await axios.get(`${POKE_API_BASE_URL}/pokemon?limit=1000`);
      const pokemonList = response.data.results;
      
      // Filtramos por nombre
      const filteredList = pokemonList.filter((pokemon: any) => 
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      
      // Obtenemos detalles de los primeros 20 resultados
      const limitedResults = filteredList.slice(0, 20);
      const pokemonDetails = await Promise.all(
        limitedResults.map((pokemon: any) => 
          this.getPokemonDetails(pokemon.name)
        )
      );
      
      return pokemonDetails;
    } catch (error) {
      console.error('Error searching pokemon:', error);
      throw new Error('Error al buscar Pokémon');
    }
  }
};
