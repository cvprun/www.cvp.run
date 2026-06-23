import {createContext, useContext, useEffect, useState} from 'react';

import {getTranslations, type Language, type Translations} from './translations';

const STORAGE_KEY = 'cvp-lang';

function detectLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'ko';
  }
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === 'ko' || stored === 'en') {
    return stored;
  }
  return navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en';
}

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({children}: {children: React.ReactNode}) {
  const [lang, setLangState] = useState<Language>(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Language) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
  };

  const value: LanguageContextValue = {lang, setLang, t: getTranslations(lang)};

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
