"use client";
import { useTranslation } from "react-i18next";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "@/utils/auth";

export default function AuthButtons() {
  const { t } = useTranslation();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then(setUser).finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    router.push("/");
  };

  if (loading) return null;

  return (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', width: '100%', maxWidth: 400 }}>
      {!user ? (
        <>
          <button
            onClick={() => router.push('/login')}
            className="main-btn"
          >
            {t('login')}
          </button>
          <button
            onClick={() => router.push('/register')}
            className="main-btn"
          >
            {t('register')}
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => router.push('/profile')}
            className="main-btn"
          >
            {t('profile')}
          </button>
          <button
            onClick={handleLogout}
            className="main-btn"
            style={{ background: '#a084ee', color: '#23235b' }}
          >
            {t('logout')}
          </button>
        </>
      )}
    </div>
  );
}
