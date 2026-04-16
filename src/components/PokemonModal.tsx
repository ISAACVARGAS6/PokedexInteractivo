'use client';

import { useEffect } from 'react';
import { Pokemon } from '@/types/pokemon';

interface PokemonModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

const typeColors: Record<string, { bg: string; from: string; to: string; text: string }> = {
  normal: { bg: 'bg-gray-500', from: 'from-gray-400', to: 'to-gray-600', text: 'text-gray-700' },
  fire: { bg: 'bg-red-500', from: 'from-red-400', to: 'to-orange-600', text: 'text-red-700' },
  water: { bg: 'bg-blue-500', from: 'from-blue-400', to: 'to-cyan-600', text: 'text-blue-700' },
  electric: { bg: 'bg-yellow-500', from: 'from-yellow-400', to: 'to-amber-600', text: 'text-yellow-700' },
  grass: { bg: 'bg-green-500', from: 'from-green-400', to: 'to-emerald-600', text: 'text-green-700' },
  ice: { bg: 'bg-cyan-300', from: 'from-cyan-300', to: 'to-blue-500', text: 'text-cyan-700' },
  fighting: { bg: 'bg-red-700', from: 'from-red-600', to: 'to-red-800', text: 'text-red-800' },
  poison: { bg: 'bg-purple-500', from: 'from-purple-400', to: 'to-violet-600', text: 'text-purple-700' },
  ground: { bg: 'bg-yellow-600', from: 'from-yellow-500', to: 'to-amber-700', text: 'text-yellow-800' },
  flying: { bg: 'bg-indigo-400', from: 'from-indigo-400', to: 'to-sky-600', text: 'text-indigo-700' },
  psychic: { bg: 'bg-pink-500', from: 'from-pink-400', to: 'to-rose-600', text: 'text-pink-700' },
  bug: { bg: 'bg-lime-500', from: 'from-lime-400', to: 'to-green-600', text: 'text-lime-700' },
  rock: { bg: 'bg-yellow-800', from: 'from-yellow-700', to: 'to-amber-800', text: 'text-yellow-900' },
  ghost: { bg: 'bg-purple-700', from: 'from-purple-600', to: 'to-violet-800', text: 'text-purple-800' },
  dragon: { bg: 'bg-indigo-600', from: 'from-indigo-500', to: 'to-blue-700', text: 'text-indigo-800' },
  dark: { bg: 'bg-gray-800', from: 'from-gray-700', to: 'to-gray-900', text: 'text-gray-800' },
  steel: { bg: 'bg-gray-400', from: 'from-gray-400', to: 'to-slate-500', text: 'text-gray-700' },
  fairy: { bg: 'bg-pink-300', from: 'from-pink-300', to: 'to-rose-400', text: 'text-pink-700' },
};

const getStatColor = (stat: number) => {
  if (stat >= 120) return 'bg-gradient-to-r from-green-400 to-emerald-500';
  if (stat >= 90) return 'bg-gradient-to-r from-yellow-400 to-amber-500';
  if (stat >= 60) return 'bg-gradient-to-r from-orange-400 to-orange-500';
  return 'bg-gradient-to-r from-red-400 to-red-500';
};

const statLabels: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  specialAttack: 'Atq. Esp.',
  specialDefense: 'Def. Esp.',
  speed: 'Velocidad',
};

export const PokemonModal = ({ pokemon, isOpen, onClose }: PokemonModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !pokemon) return null;

  const primaryType = pokemon.types[0];
  const colors = typeColors[primaryType] || typeColors.normal;
  const totalStats = Object.values(pokemon.stats).reduce((sum, stat) => sum + stat, 0);

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scaleIn">
        <div className={`relative bg-gradient-to-br ${colors.from} ${colors.to} p-8 pb-16`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-32 h-32 object-contain drop-shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                }}
              />
            </div>
          </div>
        </div>

        <div className="pt-12 pb-8 px-8">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-gray-800 capitalize mb-2">
              {pokemon.name}
            </h2>
            <p className="text-lg text-gray-500 font-medium">
              #{pokemon.id.toString().padStart(3, '0')}
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-8">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`px-5 py-2 rounded-full text-sm font-bold text-white ${typeColors[type]?.bg || 'bg-gray-500'} shadow-lg`}
              >
                {type}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-inner">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Información
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">Altura</span>
                  <span className="font-bold text-gray-800">{pokemon.height / 10}m</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">Peso</span>
                  <span className="font-bold text-gray-800">{pokemon.weight / 10}kg</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">Habilidades</span>
                  <span className="font-bold text-gray-800 capitalize text-right max-w-xs">{pokemon.abilities.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-inner">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Estadísticas
              </h3>
              <div className="space-y-3">
                {Object.entries(pokemon.stats).map(([stat, value]) => (
                  <div key={stat} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">{statLabels[stat] || stat}:</span>
                      <span className="font-bold text-gray-800">{value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-2.5 rounded-full ${getStatColor(value)} transition-all duration-500`}
                        style={{ width: `${Math.min((value / 150) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center shadow-lg">
            <p className="text-sm font-medium opacity-90 mb-1">Estadísticas Totales</p>
            <p className="text-4xl font-bold">{totalStats}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
