// src/components/modals/ResumeModal.tsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isMobileDevice } from '../sidebar/styles/pdfStyles';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  ptPdfSrc: string;
  enPdfSrc: string;
  ptGoogleDriveId: string;
  enGoogleDriveId: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ 
  isOpen, 
  onClose,
  language,
  ptPdfSrc,
  enPdfSrc,
  ptGoogleDriveId,
  enGoogleDriveId
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'pt' | 'en'>(language === 'pt' ? 'pt' : 'en');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Definir o idioma inicial com base no idioma da aplicação
    setSelectedLanguage(language === 'pt' ? 'pt' : 'en');
  }, [language]);
  
  useEffect(() => {
    setIsMobile(isMobileDevice());
    
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    
    window.addEventListener('resize', handleResize);

    // Desabilitar o clique direito durante a exibição do modal
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Desabilitar atalhos de teclado comuns para impressão/salvar
    // E adicionar suporte para fechar com ESC
    const handleKeyDown = (e: KeyboardEvent) => {
      // Fechar modal com ESC
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      // Ctrl+P (print), Ctrl+S (save), Ctrl+Shift+S (save as)
      if ((e.ctrlKey && (e.key === 'p' || e.key === 's')) || 
          (e.ctrlKey && e.shiftKey && e.key === 's')) {
        e.preventDefault();
        return false;
      }
    };

    if (isOpen) {
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      // Resetar o estado de carregamento sempre que o modal é aberto
      setIsLoading(true);
      // Simular tempo de carregamento
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      
      return () => {
        clearTimeout(timer);
      };
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onClose]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  // Obter o Google Drive ID correto com base no idioma selecionado
  const currentGoogleDriveId = selectedLanguage === 'pt' ? ptGoogleDriveId : enGoogleDriveId;
  
  // URL para visualizar o PDF do Google Drive
  const googleDriveViewerUrl = `https://drive.google.com/file/d/${currentGoogleDriveId}/preview`;

  // Estilos específicos para mobile
  const containerStyle = isMobile 
    ? { 
        width: '100%', 
        height: '100%', 
        maxWidth: '100%', 
        maxHeight: '100%',
        margin: 0,
        padding: 0,
        borderRadius: 0
      } 
    : {};
    
  const contentStyle = isMobile
    ? {
        height: 'calc(100% - 96px)'  // Ajustar altura considerando o header e o seletor de idioma
      }
    : {};

  // Cria um portal para renderizar o modal fora da hierarquia do DOM
  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex justify-center items-center p-0"
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="w-full h-full max-w-5xl max-h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={containerStyle}
      >
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700">
          <h3 className="text-lg font-medium dark:text-white">
            {language === 'pt' ? "Currículo" : "Resume"}
          </h3>
          <button 
            className="text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Seletor de idioma do currículo */}
        <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-600 p-3">
          <div className="flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border ${selectedLanguage === 'pt' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600'}`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLanguage('pt');
                setIsLoading(true);
              }}
            >
              <div className="flex items-center">
                <img src="https://flagcdn.com/w20/br.png" alt="Bandeira do Brasil" className="mr-2 w-5" />
                Português
              </div>
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border ${selectedLanguage === 'en' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600'}`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLanguage('en');
                setIsLoading(true);
              }}
            >
              <div className="flex items-center">
                <img src="https://flagcdn.com/w20/us.png" alt="Bandeira dos EUA" className="mr-2 w-5" />
                English
              </div>
            </button>
          </div>
        </div>
        
        <div className="flex-grow relative" style={contentStyle}>
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-800 z-10">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 dark:text-gray-300">
                {language === 'pt' ? 'Carregando currículo...' : 'Loading resume...'}
              </p>
            </div>
          )}
          <iframe 
            src={googleDriveViewerUrl}
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body // Renderiza diretamente no body do documento
  );
};

export default ResumeModal;