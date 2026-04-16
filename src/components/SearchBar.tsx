'use client';

import { useState, useRef, useEffect } from 'react';
import { Pokemon } from '@/types/pokemon';
import { usePokemonSearch } from '@/hooks/usePokemon';

interface SearchBarProps {
  onPokemonSelect?: (pokemon: Pokemon) => void;
}

const typeColors: Record<string, string> = {
  normal: 'bg-gray-500',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-500',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
};

export const SearchBar = ({ onPokemonSelect }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const { searchResults, loading, error } = usePokemonSearch(query);
  const [showResults, setShowResults] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(e.target.value.length > 0);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && searchResults[highlightedIndex]) {
          handlePokemonClick(searchResults[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handlePokemonClick = (pokemon: Pokemon) => {
    onPokemonSelect?.(pokemon);
    setQuery('');
    setShowResults(false);
    setHighlightedIndex(-1);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={containerRef}>
      <div className="relative group">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setShowResults(true)}
          placeholder="Buscar Pokémon por nombre..."
          className="w-full px-6 py-4 pl-14 pr-14 text-gray-700 bg-white border-2 border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-400/30 focus:border-blue-400 shadow-xl transition-all duration-300 group-hover:shadow-2xl"
        />
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-5 flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-3 border-blue-500 border-t-transparent"></div>
          </div>
        )}
        {!loading && query && (
          <button
            onClick={() => {
              setQuery('');
              setShowResults(false);
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-5 flex items-center hover:text-gray-600 transition-colors"
          >
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto overflow-x-hidden">
          {error && (
            <div className="p-6 text-red-600 text-center">
              {error}
            </div>
          )}
          
          {!loading && !error && searchResults.length === 0 && query.length > 0 && (
            <div className="p-6 text-gray-500 text-center">
              <svg className="h-12 w-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-medium">No se encontraron Pokémon</p>
              <p className="text-sm">Intenta con otro nombre</p>
            </div>
          )}
          
          {searchResults.map((pokemon, index) => (
            <div
              key={pokemon.id}
              onClick={() => handlePokemonClick(pokemon)}
              className={`p-4 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center gap-4 transition-colors ${
                index === highlightedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                    }}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 capitalize truncate">{pokemon.name}</p>
                <p className="text-sm text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
              </div>
              <div className="flex gap-1.5">
                {pokemon.types.slice(0, 2).map((type) => (
                  <span
                    key={type}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white ${typeColors[type] || 'bg-gray-500'}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 text-center text-white/80 text-sm">
        Usa las teclas <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono">↑</kbd> <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono">↓</kbd> para navegar y <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono">Enter</kbd> para seleccionar
      </div>
    </div>
  );
};
