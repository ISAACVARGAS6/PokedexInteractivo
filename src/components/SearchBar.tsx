'use client';

import { useState } from 'react';
import { Pokemon } from '@/types/pokemon';
import { usePokemonSearch } from '@/hooks/usePokemon';

interface SearchBarProps {
  onPokemonSelect?: (pokemon: Pokemon) => void;
}

export const SearchBar = ({ onPokemonSelect }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const { searchResults, loading, error } = usePokemonSearch(query);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  const handlePokemonClick = (pokemon: Pokemon) => {
    onPokemonSelect?.(pokemon);
    setQuery('');
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Buscar Pokémon..."
          className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {error && (
            <div className="p-4 text-red-600 text-center">
              {error}
            </div>
          )}
          
          {!loading && !error && searchResults.length === 0 && query.length > 0 && (
            <div className="p-4 text-gray-500 text-center">
              No se encontraron Pokémon
            </div>
          )}
          
          {searchResults.map((pokemon) => (
            <div
              key={pokemon.id}
              onClick={() => handlePokemonClick(pokemon)}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center gap-3"
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                }}
              />
              <div>
                <p className="font-semibold text-gray-800 capitalize">{pokemon.name}</p>
                <p className="text-sm text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
