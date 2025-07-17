"use client";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import { signUpWithEmail, signInWithGoogle } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const { error } = await signUpWithEmail(email, password);
    setLoading(false);
    if (error) setError(error.message);
    else {
      // Si Supabase no requiere confirmación, redirigir; si la requiere, mostrar mensaje
      setSuccess("Registro exitoso. Revisa tu correo electrónico para confirmar tu cuenta antes de iniciar sesión.");
      // Si tu proyecto NO requiere confirmación, puedes descomentar esto:
      // router.push("/profile");
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    const { error } = await signInWithGoogle();
    setLoading(false);
    if (error) setError(error.message);
    // Redirección automática por Supabase
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>{t('register')}</h1>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 320 }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc' }} />
        <input type="password" placeholder={t('password')} value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc' }} />
        <button type="submit" disabled={loading} style={{ padding: 12, borderRadius: 6, background: '#222', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>{loading ? t('loading') : t('register')}</button>
        <button type="button" onClick={handleGoogle} disabled={loading} style={{ padding: 12, borderRadius: 6, background: '#fff', color: '#222', border: '1px solid #222', fontWeight: 600, cursor: 'pointer' }}>Google</button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
      </form>
    </main>
  );
}
