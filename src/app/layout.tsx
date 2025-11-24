import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokédex - Descubre el mundo de los Pokémon',
  description: 'Una aplicación Pokédex moderna construida con Next.js que utiliza la API de Pokémon para mostrar información detallada de todos los Pokémon.',
  keywords: ['pokemon', 'pokedex', 'nextjs', 'react', 'typescript'],
  authors: [{ name: 'Isaac' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}