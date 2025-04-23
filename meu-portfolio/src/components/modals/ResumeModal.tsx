// src/components/modals/ResumeModal.tsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isMobileDevice } from '../sidebar/styles/pdfStyles';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ***** ALTERAÇÃO AQUI *****
  // ID para o Google Drive do documento PDF do currículo
  const pdfGoogleDriveId = "11ucHiR9w7soHXTRw_2FXjqxq9jzDQ9wG"; // ID do seu PDF

  // URL para visualizar o PDF do Google Drive (usando /preview)
  const googleDriveViewerUrl = `https://drive.google.com/file/d/${pdfGoogleDriveId}/preview`;
  // ***** FIM DA ALTERAÇÃO *****

  useEffect(() => {
    // Detecta se é mobile e adiciona listener de resize
    setIsMobile(isMobileDevice());
    const handleResize = () => setIsMobile(isMobileDevice());
    window.addEventListener('resize', handleResize);

    // Previne menu de contexto e atalhos de teclado
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if ((e.ctrlKey && (e.key === 'p' || e.key === 's')) ||
          (e.ctrlKey && e.shiftKey && e.key === 's')) {
        e.preventDefault();
      }
    };

    if (isOpen) {
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      setIsLoading(true); // Reseta o loading ao abrir
    }

    // Cleanup: remove os listeners quando o modal fecha ou componente desmonta
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onClose]); // Dependências do useEffect

  // Chamado quando o iframe termina de carregar
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Não renderiza nada se não estiver aberto
  if (!isOpen) return null;

  // Estilos para mobile (tela cheia)
  const containerStyle = isMobile
    ? {
        width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%',
        margin: 0, padding: 0, borderRadius: 0
      }
    : {};

  // Estilos do conteúdo (deixe o flexbox cuidar da altura no mobile)
  const contentStyle = isMobile ? {} : {};

  // Renderiza o modal usando Portal
  return ReactDOM.createPortal(
    <div // Overlay
      className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex justify-center items-center p-0"
      onClick={onClose} // Fecha ao clicar no overlay
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div // Container do Modal
        className="w-full h-full max-w-5xl max-h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro do modal
        style={containerStyle} // Aplica estilos mobile/desktop
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 flex-shrink-0"> {/* flex-shrink-0 evita que o header encolha */}
          <h3 className="text-lg font-medium dark:text-white">
            {language === 'pt' ? "Currículo" : "Resume"}
          </h3>
          <button /* Botão Fechar */
            className="text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Área do Conteúdo (Iframe) */}
        <div className="flex-grow relative" style={contentStyle}> {/* flex-grow ocupa espaço restante */}
          {/* Indicador de Loading */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-800 z-10">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 dark:text-gray-300">
                {language === 'pt' ? 'Carregando currículo...' : 'Loading resume...'}
              </p>
            </div>
          )}
          {/* Iframe */}
          <iframe
            key={googleDriveViewerUrl} // Adicionar key pode ajudar a forçar recarregamento se a URL mudar
            src={googleDriveViewerUrl}
            className="w-full h-full border-0" // Ocupa todo o espaço do pai (flex-grow div)
            onLoad={handleIframeLoad}
            allowFullScreen
            title={language === 'pt' ? "Currículo" : "Resume"} // Boa prática adicionar title
          />
        </div>
      </div>
    </div>,
    document.body // Renderiza no body
  );
};

export default ResumeModal;