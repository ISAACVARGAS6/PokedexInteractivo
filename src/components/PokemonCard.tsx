'use client';

import { Pokemon } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
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
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
      onClick={() => onClick?.(pokemon)}
    >
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
            <img 
              src={pokemon.image} 
              alt={pokemon.name}
              className="w-20 h-20 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
              }}
            />
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 capitalize mb-1">
            {pokemon.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            #{pokemon.id.toString().padStart(3, '0')}
          </p>
          
          <div className="flex justify-center gap-2 flex-wrap">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(type)}`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
