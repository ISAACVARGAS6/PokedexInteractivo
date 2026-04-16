# Pokédex Interactivo

Una aplicación web moderna y elegante para explorar el mundo de los Pokémon, construida con Next.js, React y Tailwind CSS.
<img width="1902" height="896" alt="image" src="https://github.com/user-attachments/assets/c90a30a4-ae46-47a4-adb8-f6b932e89336" />


## Características

### 🔍 Búsqueda Inteligente
- Búsqueda en tiempo real por nombre de Pokémon
- Navegación con teclado (↑ ↓ Enter)
- Sugerencias con imágenes y tipos de Pokémon
- Autocompletado con debounce de 300ms

### 🎨 Filtros Avanzados
- **Filtrado por tipo**: 18 tipos de Pokémon disponibles
- **Ordenamiento**:
  - Por número de Pokédex
  - Por nombre (A-Z / Z-A)
  - Por peso
  - Por altura
- Dirección ascendente/descendente

### 🎴 Tarjetas de Pokémon
- Gradientes de colores según el tipo primario
- Animaciones suaves al hover
- Información rápida: altura, peso
- Indicadores de tipo visuales

### 📋 Modal Detallado
- Información completa del Pokémon
- Barras de estadísticas con colores animados
- Estadísticas totales
- Altura, peso y habilidades

### 📱 Diseño Responsivo
- Grid adaptativo: 1-5 columnas según pantalla
- Optimizado para móvil, tablet y desktop
- Animaciones fluidas

## Tecnologías

- **Framework**: Next.js 15.5.5
- **UI**: React 18
- **Estilos**: Tailwind CSS 3.4
- **HTTP Client**: Axios
- **Lenguaje**: TypeScript

## Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout de la aplicación
│   └── globals.css       # Estilos globales
├── components/
│   ├── PokemonCard.tsx   # Tarjeta de Pokémon
│   ├── PokemonModal.tsx  # Modal con detalles
│   ├── SearchBar.tsx     # Barra de búsqueda
│   └── FilterBar.tsx     # Filtros y ordenamiento
├── hooks/
│   ├── usePokemon.ts     # Hook para lista y búsqueda
│   └── usePokemonFilters.ts # Hook para filtrado
├── lib/
│   └── pokemonApi.ts     # Cliente de PokeAPI
└── types/
    └── pokemon.ts        # Tipos TypeScript
```

## API

Este proyecto utiliza la [PokeAPI](https://pokeapi.co/) para obtener datos de Pokémon.

### Endpoints utilizados
- `GET /pokemon` - Lista paginada de Pokémon
- `GET /pokemon/{id}` - Detalles de un Pokémon específico

## Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd PokedexInteractivo
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
Visita [http://localhost:3000](http://localhost:3000)

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta el linter de código |

## Tipos de Pokémon

| Tipo | Color | Gradiente |
|------|-------|-----------|
| Normal | #A8A878 | gray |
| Fire | #F08030 | red-orange |
| Water | #6890F0 | blue-cyan |
| Electric | #F8D030 | yellow-amber |
| Grass | #78C850 | green-emerald |
| Ice | #98D8D8 | cyan-blue |
| Fighting | #C03028 | red |
| Poison | #A040A0 | purple |
| Ground | #E0C068 | yellow-amber |
| Flying | #A890F0 | indigo-sky |
| Psychic | #F85888 | pink-rose |
| Bug | #A8B820 | lime-green |
| Rock | #B8A038 | yellow-amber |
| Ghost | #705898 | purple |
| Dragon | #7038F8 | indigo-blue |
| Dark | #705848 | gray |
| Steel | #B8B8D0 | gray-slate |
| Fairy | #EE99AC | pink-rose |

## Características de Accesibilidad

- Navegación completa por teclado
- Soporte para lectores de pantalla
- Alto contraste en elementos interactivos
- Animaciones respetuosas con `prefers-reduced-motion`

## Despliegue

### Vercel (Recomendado)
```bash
npm run build
# Despliega en Vercel
```

### Netlify
```bash
npm run build
# Despliega en Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Responsive Design

La aplicación está optimizada para:
- Móviles (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Pantallas grandes (1440px+)

## Créditos

- [PokeAPI](https://pokeapi.co/) - API de datos de Pokémon
- [Tailwind CSS](https://tailwindcss.com/) - Framework de estilos
- [Next.js](https://nextjs.org/) - Framework de React

---

Hecho con ⚡ y 🎮
