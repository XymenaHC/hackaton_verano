"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

export default function LanguageSelector() {
  const { t } = useTranslation();
  const [lang, setLang] = useState<string>(typeof window !== 'undefined' ? localStorage.getItem('lang') || 'es' : 'es');

  useEffect(() => {
    i18n.changeLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
  }, [lang]);

  return (
    <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
      <select
        value={lang}
        onChange={e => setLang(e.target.value)}
        style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
      >
        <option value="es">{t('spanish')}</option>
        <option value="en">{t('english')}</option>
      </select>
    </div>
  );
}
