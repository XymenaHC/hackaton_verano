"use client";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import { signInWithEmail, signInWithGoogle } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signInWithEmail(email, password);
    setLoading(false);
    if (error) setError(error.message);
    else router.push("/profile");
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
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>{t('login')}</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 320 }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc' }} />
        <input type="password" placeholder={t('password')} value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc' }} />
        <button type="submit" disabled={loading} style={{ padding: 12, borderRadius: 6, background: '#222', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>{loading ? t('loading') : t('login')}</button>
        <button type="button" onClick={handleGoogle} disabled={loading} style={{ padding: 12, borderRadius: 6, background: '#fff', color: '#222', border: '1px solid #222', fontWeight: 600, cursor: 'pointer' }}>Google</button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </form>
    </main>
  );
}
