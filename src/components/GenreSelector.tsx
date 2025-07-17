"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

const genres = [
  "Acción",
  "Aventura",
  "Comedia",
  "Drama",
  "Ciencia Ficción",
  "Fantasía",
  "Romance",
  "Terror",
  "Animación",
  "Documental",
];

const GenreSelector = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Detectar usuario autenticado
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, []);

  // Al abrir modal, cargar géneros guardados
  useEffect(() => {
    if (open && userId) {
      setLoading(true);
      supabase
        .from("user_preferences")
        .select("favorite_genres")
        .eq("user_id", userId)
        .single()
        .then(({ data, error }) => {
          if (data && data.favorite_genres) setSelected(data.favorite_genres);
          setLoading(false);
        });
    }
  }, [open, userId]);

  const toggleGenre = (genre: string) => {
    setSelected((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSave = async () => {
    if (!userId) {
      setMessage("Debes iniciar sesión para guardar tus géneros.");
      return;
    }
    setLoading(true);
    // UPSERT (insertar o actualizar)
    const { error } = await supabase
      .from("user_preferences")
      .upsert({ user_id: userId, favorite_genres: selected }, { onConflict: "user_id" });
    setLoading(false);
    if (!error) {
      setMessage("¡Géneros guardados!");
      setOpen(false);
    } else {
      setMessage("Error al guardar. Intenta de nuevo.");
    }
  };

  return (
    <div style={{ marginTop: "1rem", width: "100%", maxWidth: 400 }}>
      <button className="main-btn" type="button" onClick={() => setOpen(true)}>
        Seleccionar géneros preferidos
      </button>
      {selected.length > 0 && (
        <div style={{ marginTop: 8, color: "#a084ee", fontWeight: 500 }}>
          Seleccionados: {selected.join(", ")}
        </div>
      )}
      {message && (
        <div style={{ marginTop: 8, color: message.startsWith("¡") ? "#a084ee" : "#ffb347" }}>{message}</div>
      )}
      {open && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            background: "#23235b",
            padding: 24,
            borderRadius: 12,
            minWidth: 300,
            boxShadow: "0 2px 16px rgba(95,44,130,0.15)",
          }}>
            <h3 style={{ color: "#a084ee" }}>Elige tus géneros favoritos</h3>
            {loading ? (
              <div style={{ color: "#ededed" }}>Cargando...</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "16px 0" }}>
                {genres.map((genre) => (
                  <label key={genre} style={{ color: "#ededed", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={selected.includes(genre)}
                      onChange={() => toggleGenre(genre)}
                      style={{ marginRight: 8 }}
                    />
                    {genre}
                  </label>
                ))}
              </div>
            )}
            <button className="main-btn" type="button" onClick={handleSave} disabled={loading}>
              Guardar
            </button>
            <button type="button" onClick={() => setOpen(false)} style={{ marginLeft: 8, background: "none", color: "#ededed", border: "none", cursor: "pointer" }}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreSelector;
