'use client';

import { Pokemon } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

const typeColors: Record<string, { bg: string; text: string; from: string; to: string }> = {
  normal: { bg: 'bg-gray-500', text: 'text-gray-700', from: 'from-gray-100', to: 'to-gray-200' },
  fire: { bg: 'bg-red-500', text: 'text-red-700', from: 'from-red-100', to: 'to-orange-200' },
  water: { bg: 'bg-blue-500', text: 'text-blue-700', from: 'from-blue-100', to: 'to-cyan-200' },
  electric: { bg: 'bg-yellow-500', text: 'text-yellow-700', from: 'from-yellow-100', to: 'to-amber-200' },
  grass: { bg: 'bg-green-500', text: 'text-green-700', from: 'from-green-100', to: 'to-emerald-200' },
  ice: { bg: 'bg-cyan-300', text: 'text-cyan-700', from: 'from-cyan-100', to: 'to-blue-200' },
  fighting: { bg: 'bg-red-700', text: 'text-red-800', from: 'from-red-100', to: 'to-red-200' },
  poison: { bg: 'bg-purple-500', text: 'text-purple-700', from: 'from-purple-100', to: 'to-violet-200' },
  ground: { bg: 'bg-yellow-600', text: 'text-yellow-800', from: 'from-yellow-100', to: 'to-amber-200' },
  flying: { bg: 'bg-indigo-400', text: 'text-indigo-700', from: 'from-indigo-100', to: 'to-sky-200' },
  psychic: { bg: 'bg-pink-500', text: 'text-pink-700', from: 'from-pink-100', to: 'to-rose-200' },
  bug: { bg: 'bg-lime-500', text: 'text-lime-700', from: 'from-lime-100', to: 'to-green-200' },
  rock: { bg: 'bg-yellow-800', text: 'text-yellow-900', from: 'from-yellow-100', to: 'to-amber-200' },
  ghost: { bg: 'bg-purple-700', text: 'text-purple-800', from: 'from-purple-100', to: 'to-violet-200' },
  dragon: { bg: 'bg-indigo-600', text: 'text-indigo-800', from: 'from-indigo-100', to: 'to-blue-200' },
  dark: { bg: 'bg-gray-800', text: 'text-gray-800', from: 'from-gray-300', to: 'to-gray-400' },
  steel: { bg: 'bg-gray-400', text: 'text-gray-700', from: 'from-gray-200', to: 'to-slate-300' },
  fairy: { bg: 'bg-pink-300', text: 'text-pink-700', from: 'from-pink-100', to: 'to-rose-200' },
};

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  const primaryType = pokemon.types[0];
  const colors = typeColors[primaryType] || typeColors.normal;

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
      onClick={() => onClick?.(pokemon)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} opacity-50`} />
      
      <div className="relative p-6">
        <div className="flex justify-between items-start mb-4">
          <p className={`text-sm font-bold ${colors.text} opacity-60`}>
            #{pokemon.id.toString().padStart(3, '0')}
          </p>
          <div className="flex gap-1">
            {pokemon.types.slice(0, 2).map((type) => (
              <span
                key={type}
                className={`w-2 h-2 rounded-full ${typeColors[type]?.bg || 'bg-gray-500'}`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity`} />
            <div className="relative w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <img 
                src={pokemon.image} 
                alt={pokemon.name}
                className="w-20 h-20 object-contain drop-shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 capitalize mb-2 drop-shadow-sm">
            {pokemon.name}
          </h3>
          
          <div className="flex justify-center gap-2 flex-wrap">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${typeColors[type]?.bg || 'bg-gray-500'} shadow-md`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200/50">
          <div className="flex justify-around text-xs text-gray-600">
            <div className="text-center">
              <p className="font-semibold">{pokemon.height / 10}m</p>
              <p className="opacity-70">Altura</p>
            </div>
            <div className="w-px bg-gray-300" />
            <div className="text-center">
              <p className="font-semibold">{pokemon.weight / 10}kg</p>
              <p className="opacity-70">Peso</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.from} ${colors.to}`} />
    </div>
  );
};
