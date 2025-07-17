"use client";
import { useTranslation } from "react-i18next";

import AuthButtons from "@/components/AuthButtons";
import GenreSelector from "@/components/GenreSelector";

export default function Home() {
  const { t } = useTranslation();
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', gap: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>¡Bienvenido a tu plataforma de recomendaciones!</h1>
      <p>Selecciona el tipo de contenido y los géneros de tu interés:</p>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <a href="/movies" className="main-btn">Películas</a>
        <a href="/series" className="main-btn">Series</a>
        <a href="/games" className="main-btn">Videojuegos</a>
      </div>
      <GenreSelector />
      <AuthButtons />
    </main>
  );
}
