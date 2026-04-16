'use client';

import { useState } from 'react';

export type SortOption = 'id' | 'name' | 'weight' | 'height';
export type SortDirection = 'asc' | 'desc';

interface FilterBarProps {
  onTypeFilter: (type: string | null) => void;
  onSortChange: (sortBy: SortOption, direction: SortDirection) => void;
  selectedType: string | null;
  currentSort: SortOption;
  currentDirection: SortDirection;
}

const POKEMON_TYPES = [
  'all', 'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const typeColors: Record<string, string> = {
  all: 'bg-gray-500',
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

export const FilterBar = ({
  onTypeFilter,
  onSortChange,
  selectedType,
  currentSort,
  currentDirection
}: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleTypeClick = (type: string) => {
    onTypeFilter(type === 'all' ? null : type);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortOption;
    onSortChange(value, currentDirection);
  };

  const toggleDirection = () => {
    onSortChange(currentSort, currentDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtros
          <svg className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <select
            value={currentSort}
            onChange={handleSortChange}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg border-0 focus:ring-2 focus:ring-blue-400 shadow-lg"
          >
            <option value="id">Número</option>
            <option value="name">Nombre</option>
            <option value="weight">Peso</option>
            <option value="height">Altura</option>
          </select>
          
          <button
            onClick={toggleDirection}
            className="p-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 shadow-lg transition-colors"
            title={currentDirection === 'asc' ? 'Ascendente' : 'Descendente'}
          >
            {currentDirection === 'asc' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v8m0 0l4-4m-4 4l-4-4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
          <h3 className="text-white font-semibold mb-3">Filtrar por tipo</h3>
          <div className="flex flex-wrap gap-2">
            {POKEMON_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => handleTypeClick(type)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium text-white transition-all duration-200 ${
                  typeColors[type]
                } ${
                  (type === 'all' && !selectedType) || selectedType === type
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-105'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {type === 'all' ? 'Todos' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
