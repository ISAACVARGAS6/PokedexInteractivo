'use client';

import { useState } from 'react';
import { Pokemon } from '@/types/pokemon';
import { usePokemonList } from '@/hooks/usePokemon';
import { PokemonCard } from '@/components/PokemonCard';
import { SearchBar } from '@/components/SearchBar';
import { PokemonModal } from '@/components/PokemonModal';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const pokemonPerPage = 20;
  const { pokemonList, loading, error, totalCount } = usePokemonList(
    currentPage * pokemonPerPage, 
    pokemonPerPage
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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Pokédex
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Descubre el mundo de los Pokémon
          </p>
          
          <SearchBar onPokemonSelect={handleSearchSelect} />
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white text-lg">Cargando Pokémon...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center max-w-md mx-auto">
            {error}
          </div>
        )}

        {/* Pokemon Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
              {pokemonList.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={handlePokemonClick}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Anterior
              </button>
              
              <span className="text-white font-semibold text-lg">
                Página {currentPage + 1} de {totalPages}
              </span>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Siguiente
              </button>
            </div>
          </>
        )}

        {/* Pokemon Modal */}
        <PokemonModal
          pokemon={selectedPokemon}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}