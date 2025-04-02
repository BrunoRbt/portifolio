// src/components/header/Header.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeaderProps {
  name: string;
  title: string;
  backgroundImage: string;
  profileImage: string;
}

const Header: React.FC<HeaderProps> = ({ 
  name, 
  title, 
  backgroundImage, 
  profileImage 
}) => {
  const { t } = useLanguage();
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);
  const [isBackgroundImageModalOpen, setIsBackgroundImageModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  const openProfileImageModal = () => {
    setIsProfileImageModalOpen(true);
  };

  const closeProfileImageModal = () => {
    setIsProfileImageModalOpen(false);
  };

  const openBackgroundImageModal = () => {
    setIsBackgroundImageModalOpen(true);
  };

  const closeBackgroundImageModal = () => {
    setIsBackgroundImageModalOpen(false);
  };

  // Adicionar listener para tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isProfileImageModalOpen) {
          closeProfileImageModal();
        }
        if (isBackgroundImageModalOpen) {
          closeBackgroundImageModal();
        }
      }
    };

    if (isProfileImageModalOpen || isBackgroundImageModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileImageModalOpen, isBackgroundImageModalOpen]);

  return (
    <>
      <div className="w-full relative mb-24 md:mb-24">
        <div 
          className="h-40 md:h-60 rounded-xl overflow-hidden relative bg-cover cursor-pointer"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center 70%',
            backgroundSize: 'cover',
            filter: 'brightness(0.7)' 
          }}
          onClick={openBackgroundImageModal}
        >
          <div className="absolute inset-0 flex justify-between items-center px-6 md:px-12 lg:px-16 text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">{t('coding')}</h2>
          </div>
        </div>
        
        <div className={`absolute -bottom-16 left-3 md:left-6 flex gap-3 md:gap-6 items-end`}>
          <div 
            className="bg-gradient-to-br from-[#000428] via-[#004e92] to-[#000428] rounded-full p-1 md:p-2 shadow-lg cursor-pointer"
            onClick={openProfileImageModal}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 transition-colors duration-200">
              <img 
                src={profileImage} 
                alt={name} 
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          
          <div>
            <h1 className="text-xl md:text-3xl font-bold dark:text-white transition-colors duration-200">{name}</h1>
            <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 transition-colors duration-200">{title}</p>
          </div>
        </div>
      </div>

      {/* Modal para imagem de perfil */}
      {isProfileImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4"
          onClick={closeProfileImageModal}
        >
          <div className="w-full max-w-[500px] h-auto max-h-[90vh] flex items-center justify-center">
            <img 
              src={profileImage} 
              alt={name} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Modal para imagem de fundo */}
      {isBackgroundImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4"
          onClick={closeBackgroundImageModal}
        >
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={backgroundImage} 
              alt="Background" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;