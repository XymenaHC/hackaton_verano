"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { getCurrentUser } from "@/utils/auth";

const SettingsPage = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [prefs, setPrefs] = useState({ theme: "dark", primary_color: "#ffb347", language: "es" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getCurrentUser().then(async (u) => {
      if (!u) {
        router.push("/login");
        return;
      }
      setUser(u);
      const { data } = await supabase
        .from("user_preferences")
        .select("theme, primary_color, language")
        .eq("user_id", u.id)
        .single();
      if (data) setPrefs({
        theme: data.theme || "dark",
        primary_color: data.primary_color || "#ffb347",
        language: data.language || "es"
      });
      setLoading(false);
    });
  }, [router]);

  // Cambia idioma, tema y color en tiempo real
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPrefs((p) => ({ ...p, [name]: value }));
    if (name === "language") {
      i18n.changeLanguage(value);
    }
    if (name === "theme") {
      if (value === "dark") {
        document.body.style.setProperty('--background', 'linear-gradient(135deg, #23235b 0%, #5f2c82 100%)');
        document.body.style.setProperty('--background-solid', '#23235b');
        document.body.style.setProperty('--foreground', '#ededed');
      } else {
        document.body.style.setProperty('--background', 'linear-gradient(135deg, #f3f3f3 0%, #ffb347 100%)');
        document.body.style.setProperty('--background-solid', '#f3f3f3');
        document.body.style.setProperty('--foreground', '#23235b');
      }
    }
    if (name === "primary_color") {
      document.body.style.setProperty('--primary', value);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const { error } = await supabase.from("user_preferences").upsert({
      user_id: user.id,
      theme: prefs.theme,
      primary_color: prefs.primary_color,
      language: prefs.language,
    }, { onConflict: "user_id" });
    setSaving(false);
    if (!error) setMessage("¡Preferencias guardadas!");
    else setMessage("Error al guardar: " + error.message);
  };

  // Aplicar preferencias al cargar
  useEffect(() => {
    if (!loading) {
      i18n.changeLanguage(prefs.language);
      if (prefs.theme === "dark") {
        document.body.style.setProperty('--background', 'linear-gradient(135deg, #23235b 0%, #5f2c82 100%)');
        document.body.style.setProperty('--background-solid', '#23235b');
        document.body.style.setProperty('--foreground', '#ededed');
      } else {
        document.body.style.setProperty('--background', 'linear-gradient(135deg, #f3f3f3 0%, #ffb347 100%)');
        document.body.style.setProperty('--background-solid', '#f3f3f3');
        document.body.style.setProperty('--foreground', '#23235b');
      }
      document.body.style.setProperty('--primary', prefs.primary_color);
    }
  }, [loading, prefs, i18n]);

  if (loading) return <div>Cargando...</div>;

  return (
    <main style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h1>Configuración</h1>
      <section style={{ margin: '2rem 0' }}>
        <h2>Personalización de la interfaz</h2>
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ marginRight: 8 }}>Tema:</label>
            <select name="theme" value={prefs.theme} onChange={handleChange}>
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ marginRight: 8 }}>Color primario:</label>
            <input type="color" name="primary_color" value={prefs.primary_color} onChange={handleChange} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ marginRight: 8 }}>Idioma:</label>
            <select name="language" value={prefs.language} onChange={handleChange}>
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </div>
          <button type="submit" disabled={saving}>{saving ? "Guardando..." : "Guardar cambios"}</button>
          {message && <div style={{ marginTop: 8, color: message.startsWith("¡") ? "#a084ee" : "#ffb347" }}>{message}</div>}
        </form>
      </section>
    </main>
  );
};

export default SettingsPage;
