// src/components/navigation/ResponsiveNavigation.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { useTheme } from '../../contexts/ThemeContext';

interface ResponsiveNavigationProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = ({ 
  activeItem, 
  setActiveItem 
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { theme } = useTheme();

  // Detecta se é mobile baseado no tamanho da tela
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Checar inicialmente
    checkIfMobile();

    // Adicionar listener para mudanças de tamanho
    window.addEventListener('resize', checkIfMobile);

    // Limpar event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Passa a função para o Sidebar que fecha o menu ao clicar em um item (somente no mobile)
  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  // Fechar menu quando pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Impedir scroll quando menu está aberto no mobile
  useEffect(() => {
    if (isMobile && menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, menuOpen]);

  return (
    <>
      {/* Botão do menu mobile */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-700 shadow-md transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? (
            // Ícone X para fechar (SVG inline)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Ícone de menu hambúrguer (SVG inline)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      )}

      {/* Overlay para fechar menu no mobile */}
      {isMobile && menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar no desktop OU menu móvel */}
      <div 
        className={`
          ${isMobile ? 'fixed left-0 top-0 bottom-0 z-40 transform transition-transform duration-300 ease-in-out' : 'fixed left-0 top-0 bottom-0'}
          ${isMobile && !menuOpen ? '-translate-x-full' : 'translate-x-0'}
          w-56 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-colors duration-200
        `}
      >
        <Sidebar 
          activeItem={activeItem} 
          setActiveItem={(item) => handleItemClick(item)} 
        />
      </div>
    </>
  );
};

export default ResponsiveNavigation;