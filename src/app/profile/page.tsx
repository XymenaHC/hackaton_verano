"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { getCurrentUser } from "@/utils/auth";

const defaultAvatar = "https://i.imgur.com/iQT1fpF.jpeg"; // Imagen de Sonic.exe funcional y pública

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState({ name: "", description: "", avatar_url: "" });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Cargar usuario y perfil
  useEffect(() => {
    getCurrentUser().then(async (u) => {
      if (!u) {
        router.push("/login");
        return;
      }
      setUser(u);
      // Traer perfil
      const { data, error } = await supabase
        .from("profiles")
        .select("name, description, avatar_url")
        .eq("id", u.id)
        .single();
      if (data) setProfile(data);
      setLoading(false);
    });
  }, [router]);

  // Subir avatar a Supabase Storage
  const uploadAvatar = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}.${fileExt}`;
    try {
      const { error } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true });
      if (error) {
        if (error.message.includes("Bucket not found")) {
          throw new Error("El bucket 'avatars' no existe en Supabase Storage. Ve a tu panel de Supabase > Storage y crea un bucket público llamado 'avatars'.");
        }
        throw error;
      }
      // Obtener URL pública
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      return data.publicUrl;
    } catch (e: any) {
      throw e;
    }
  };


  // Guardar cambios
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    let avatar_url = profile.avatar_url;
    try {
      if (avatarFile) {
        avatar_url = await uploadAvatar(avatarFile);
      }
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        name: profile.name,
        description: profile.description,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      setMessage("¡Perfil actualizado!");
      setProfile((p) => ({ ...p, avatar_url }));
      setAvatarFile(null);
    } catch (e: any) {
      setMessage("Error al guardar: " + e.message);
    }
    setSaving(false);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <main style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h1>Perfil de Usuario</h1>
      <section style={{ margin: '2rem 0', display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div>
          <img
  src={
    profile.avatar_url && profile.avatar_url.trim() !== ""
      ? profile.avatar_url
      : defaultAvatar
  }
  alt="Foto de perfil"
  style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginBottom: 8 }}
/>
          <input type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files?.[0] || null)} />
<button style={{ marginTop: 12, width: '100%' }} onClick={() => router.push('/trivia')}>Hacer trivia</button>
        </div>
        <div style={{ flex: 1 }}>
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Tu nombre"
            value={profile.name}
            onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
            style={{ width: '100%', marginBottom: 8 }}
          />
          <label>Descripción:</label>
          <textarea
            placeholder="Cuéntanos sobre ti..."
            value={profile.description}
            onChange={e => setProfile(p => ({ ...p, description: e.target.value }))}
            style={{ width: '100%', minHeight: 60 }}
          />
          <button style={{ marginTop: 8 }} onClick={handleSave} disabled={saving}>{saving ? "Guardando..." : "Guardar cambios"}</button>
          {message && <div style={{ marginTop: 8, color: message.startsWith("¡") ? "#a084ee" : "#ffb347" }}>{message}</div>}
        </div>
      </section>
      <section style={{ margin: '2rem 0' }}>
        <h2>Historial de actividad</h2>
        <ul>
          <li>Completaste: Matrix (Película)</li>
          <li>Completaste: Stranger Things (Serie)</li>
          <li>Completaste: The Legend of Zelda (Videojuego)</li>
          {/* Más historial simulado */}
        </ul>
      </section>
      <section style={{ margin: '2rem 0' }}>
        <h2>Logros desbloqueados</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="Logro" width={48} />
            <div>Primer contenido completado</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="Logro" width={48} />
            <div>5 películas vistas</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Logro" width={48} />
            <div>5 series vistas</div>
          </div>
          {/* Más logros simulados */}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
