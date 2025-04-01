// src/contexts/LanguageContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  pt: {
    // Navegação
    about: 'Sobre mim',
    projects: 'Projetos',
    contact: 'Fale comigo',
    articles: 'Artigos',
    
    // Configurações
    settings: 'CONFIGURAÇÕES',
    language: 'Idioma',
    portuguese: 'Português',
    english: 'Inglês',
    theme: 'Tema',
    lightTheme: 'Tema Claro',
    darkTheme: 'Tema Escuro',
    
    // Cabeçalho e perfil
    coding: 'Codificando...',
    profile: 'Perfil',
    
    // Ferramentas
    tools: 'Ferramentas',
    
    // Não precisamos adicionar as traduções para os nomes das ferramentas
    // pois são nomes próprios que não mudam com o idioma
  },
  en: {
    // Navigation
    about: 'About me',
    projects: 'Projects',
    contact: 'Contact me',
    articles: 'Articles',
    
    // Settings
    settings: 'SETTINGS',
    language: 'Language',
    portuguese: 'Portuguese',
    english: 'English',
    theme: 'Theme',
    lightTheme: 'Light Theme',
    darkTheme: 'Dark Theme',
    
    // Header and profile
    coding: 'Coding...',
    profile: 'Profile',
    
    // Tools
    tools: 'Tools',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Verificar se há um idioma salvo no localStorage, ou usar o idioma do navegador como fallback
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'pt' || savedLanguage === 'en') {
      return savedLanguage as Language;
    }
    
    // Se não houver preferência salva, verificar idioma do navegador
    const browserLanguage = navigator.language.split('-')[0];
    return browserLanguage === 'pt' ? 'pt' : 'en';
  });

  // Salvar a preferência de idioma no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para facilitar o uso do contexto
export const useLanguage = (): LanguageContextType & { t: (key: keyof typeof translations.pt) => string } => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  // Função para obter a tradução com base na chave
  const t = (key: keyof typeof translations.pt) => {
    return translations[context.language][key] || key;
  };
  
  return { ...context, t };
};