'use client';

import { Pokemon } from '@/types/pokemon';

interface PokemonModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PokemonModal = ({ pokemon, isOpen, onClose }: PokemonModalProps) => {
  if (!isOpen || !pokemon) return null;

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

  const getStatColor = (stat: number) => {
    if (stat >= 100) return 'bg-green-500';
    if (stat >= 80) return 'bg-yellow-500';
    if (stat >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-28 h-28 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                  }}
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 capitalize mb-2">
                {pokemon.name}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                #{pokemon.id.toString().padStart(3, '0')}
              </p>
              
              <div className="flex justify-center gap-3 mb-6">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${getTypeColor(type)}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Información Básica</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Altura:</span>
                    <span className="font-semibold">{pokemon.height / 10}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Peso:</span>
                    <span className="font-semibold">{pokemon.weight / 10}kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Habilidades:</span>
                    <span className="font-semibold capitalize">{pokemon.abilities.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Estadísticas</h3>
                <div className="space-y-3">
                  {Object.entries(pokemon.stats).map(([stat, value]) => (
                    <div key={stat} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{stat}:</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getStatColor(value)}`}
                          style={{ width: `${Math.min((value / 150) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
