import { useMemo } from 'react';
import { Pokemon } from '@/types/pokemon';
import { SortOption, SortDirection } from '@/components/FilterBar';

export const usePokemonFilters = (
  pokemonList: Pokemon[],
  typeFilter: string | null,
  sortBy: SortOption,
  sortDirection: SortDirection
) => {
  return useMemo(() => {
    let filtered = [...pokemonList];

    if (typeFilter) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.includes(typeFilter)
      );
    }

    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'id':
          comparison = a.id - b.id;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'weight':
          comparison = a.weight - b.weight;
          break;
        case 'height':
          comparison = a.height - b.height;
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [pokemonList, typeFilter, sortBy, sortDirection]);
};
