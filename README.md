# Pokédex Next.js

Una aplicación Pokédex moderna construida con **Next.js 15**, **TypeScript**, **Tailwind CSS** y **Axios** que consume la API de Pokémon para crear una experiencia interactiva y responsive.
<img width="1309" height="647" alt="imagen" src="https://github.com/user-attachments/assets/1fd55013-24fb-40c0-b52d-233460cac5e8" />

## 🚀 Características

- ⚡ **Next.js 15** con App Router
- 🔍 **Búsqueda en tiempo real** de Pokémon
- 📱 **Diseño completamente responsive**
- 🎨 **Interfaz moderna** con Tailwind CSS
- 🔄 **Paginación** para navegar entre Pokémon
- 📊 **Modal detallado** con estadísticas completas
- 🎯 **TypeScript** para type safety
- ⚡ **Axios** para consumo de API
- 🎭 **Animaciones suaves** y transiciones

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utility-first
- **Axios** - Cliente HTTP para consumir APIs
- **React Hooks** - Estado y efectos
- **PokéAPI** - API gratuita de Pokémon

## 📦 Instalación

1. **Clona el repositorio:**
```bash
git clone https://github.com/ISAACVARGAS6/PokedexInteractivo.git 
cd PokedexInteractivo
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Ejecuta el servidor de desarrollo:**
```bash
npm run dev
```

4. **Abre tu navegador en:** `http://localhost:3000`

## 🎮 Funcionalidades

### 🔍 Búsqueda Inteligente
- Búsqueda en tiempo real con debounce
- Autocompletado con imágenes
- Resultados instantáneos

### 📄 Paginación
- Navegación entre páginas
- 20 Pokémon por página
- Controles intuitivos

### 📊 Información Detallada
- Modal con estadísticas completas
- Tipos con colores distintivos
- Barras de progreso para stats
- Información básica (altura, peso, habilidades)

### 🎨 Diseño Moderno
- Gradientes atractivos
- Efectos glassmorphism
- Animaciones suaves
- Diseño responsive

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css          # Estilos globales
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal
├── components/
│   ├── PokemonCard.tsx      # Tarjeta de Pokémon
│   ├── PokemonModal.tsx     # Modal de detalles
│   └── SearchBar.tsx        # Barra de búsqueda
├── hooks/
│   └── usePokemon.ts        # Hooks personalizados
├── lib/
│   └── pokemonApi.ts        # Cliente API
└── types/
    └── pokemon.ts           # Tipos TypeScript
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint
```

## 🌐 API Utilizada

Esta aplicación utiliza la [PokéAPI](https://pokeapi.co/api/v2/pokemon), una API REST gratuita que proporciona información detallada sobre Pokémon.

### Endpoints utilizados:
- `GET /api/v2/pokemon` - Lista paginada de Pokémon
- `GET /api/v2/pokemon/{id}` - Detalles específicos de un Pokémon

## 🎨 Personalización

### Colores de Tipos
Los colores de los tipos de Pokémon están definidos en los componentes y pueden ser personalizados fácilmente.

### Estilos
Utiliza Tailwind CSS para estilos. Puedes modificar los colores, espaciados y efectos en los archivos de componentes.

### Configuración
- **Pokémon por página**: Modifica `pokemonPerPage` en `page.tsx`
- **Debounce de búsqueda**: Ajusta el timeout en `usePokemon.ts`

## 🚀 Despliegue

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

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1440px+)

## 🔮 Próximas Características

- [ ] Filtros por tipo
- [ ] Favoritos
- [ ] Comparador de Pokémon
- [ ] Modo oscuro
- [ ] PWA support
- [ ] Tests unitarios

## 📄 Licencia

MIT License - Libre para uso personal y comercial.

## 👨‍💻 Autor

Desarrollado por **Isaac** como proyecto de aprendizaje con Next.js y TypeScript.

---

¡Disfruta explorando el mundo de los Pokémon! 🎮✨
