'use client';

import { useState, useEffect } from 'react';
import { Pokemon } from '@/types/pokemon';
import { pokemonApi } from '@/lib/pokemonApi';

export const usePokemonList = (offset: number = 0, limit: number = 20) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await pokemonApi.getPokemonList(offset, limit);
        setTotalCount(response.count);
        
        // Obtener detalles de cada Pokémon
        const pokemonDetails = await Promise.all(
          response.results.map(pokemon => 
            pokemonApi.getPokemonDetails(pokemon.name)
          )
        );
        
        setPokemonList(pokemonDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [offset, limit]);

  return { pokemonList, loading, error, totalCount };
};

export const usePokemonSearch = (query: string) => {
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const searchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const results = await pokemonApi.searchPokemon(query);
        setSearchResults(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error en la búsqueda');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchPokemon, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { searchResults, loading, error };
};
