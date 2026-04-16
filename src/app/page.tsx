'use client';

import { useState } from 'react';
import { Pokemon } from '@/types/pokemon';
import { usePokemonList } from '@/hooks/usePokemon';
import { usePokemonFilters } from '@/hooks/usePokemonFilters';
import { PokemonCard } from '@/components/PokemonCard';
import { SearchBar } from '@/components/SearchBar';
import { PokemonModal } from '@/components/PokemonModal';
import { FilterBar, SortOption, SortDirection } from '@/components/FilterBar';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  const pokemonPerPage = 20;
  const { pokemonList, loading, error, totalCount } = usePokemonList(
    currentPage * pokemonPerPage, 
    pokemonPerPage
  );

  const filteredPokemon = usePokemonFilters(
    pokemonList,
    typeFilter,
    sortBy,
    sortDirection
  );

  const totalPages = Math.ceil(totalCount / pokemonPerPage);

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleSearchSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  const handleTypeFilter = (type: string | null) => {
    setTypeFilter(type);
    setCurrentPage(0);
  };

  const handleSortChange = (newSortBy: SortOption, newDirection: SortDirection) => {
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <span className="text-3xl">⚡</span>
              </div>
              <h1 className="text-6xl font-black text-white mb-4 drop-shadow-2xl tracking-tight">
                Pokédex
              </h1>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                <span className="text-3xl">🎮</span>
              </div>
            </div>
          </div>
          <p className="text-2xl text-white/90 mb-2 font-medium">
            Descubre el mundo de los Pokémon
          </p>
          <p className="text-white/70">
            Explora, filtra y encuentra tu Pokémon favorito
          </p>
          
          <div className="mt-8">
            <SearchBar onPokemonSelect={handleSearchSelect} />
          </div>
        </header>

        <FilterBar
          onTypeFilter={handleTypeFilter}
          onSortChange={handleSortChange}
          selectedType={typeFilter}
          currentSort={sortBy}
          currentDirection={sortDirection}
        />

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-white/20 rounded-full animate-pulse mx-auto mb-4" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl animate-spin">⚡</span>
                </div>
              </div>
              <p className="text-white text-xl font-semibold animate-pulse">Cargando Pokémon...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center max-w-md mx-auto mb-8">
            <svg className="h-16 w-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-white text-lg font-semibold mb-2">¡Ups! Algo salió mal</p>
            <p className="text-white/80">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6 text-center">
              <p className="text-white/90 text-lg font-medium">
                Mostrando <span className="font-bold">{filteredPokemon.length}</span> Pokémon
                {typeFilter && (
                  <span> de tipo <span className="font-bold capitalize">{typeFilter}</span></span>
                )}
              </p>
            </div>

            {filteredPokemon.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 text-center max-w-md mx-auto">
                <svg className="h-20 w-20 mx-auto mb-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-white text-xl font-semibold mb-2">No hay Pokémon</p>
                <p className="text-white/80 mb-4">No se encontraron Pokémon con los filtros seleccionados</p>
                <button
                  onClick={() => setTypeFilter(null)}
                  className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
                {filteredPokemon.map((pokemon, index) => (
                  <div
                    key={pokemon.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <PokemonCard
                      pokemon={pokemon}
                      onClick={handlePokemonClick}
                    />
                  </div>
                ))}
              </div>
            )}

            {filteredPokemon.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Anterior
                </button>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-8 py-4 shadow-xl">
                  <span className="text-white font-bold text-lg">
                    <span className="text-2xl">{currentPage + 1}</span> / {totalPages}
                  </span>
                </div>
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 shadow-xl"
                >
                  Siguiente
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            <div className="mt-12 text-center text-white/60 text-sm">
              <p>Total de Pokémon disponibles: {totalCount}</p>
            </div>
          </>
        )}

        <PokemonModal
          pokemon={selectedPokemon}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
