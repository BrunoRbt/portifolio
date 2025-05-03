// src/components/modals/ResumeModal.tsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isMobileDevice } from '../sidebar/styles/pdfStyles';
// Importar o PDF local (ajuste o caminho conforme necessário)
import cvBruno from '../../assets/CV Bruno.docx.pdf';

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

  // Usa o arquivo PDF local diretamente
  const pdfSrc = cvBruno;

  useEffect(() => {
    const checkDevice = () => setIsMobile(isMobileDevice());
    checkDevice();
    window.addEventListener('resize', checkDevice);

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
      setIsLoading(true);
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', checkDevice);
    };
  }, [isOpen, onClose]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  const containerStyle = isMobile
    ? {
        width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%',
        margin: 0, padding: 0, borderRadius: 0
      }
    : {};

  const contentStyle = isMobile ? {} : {};

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
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 flex-shrink-0">
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

        <div className="flex-grow relative" style={contentStyle}>
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-800 z-10">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 dark:text-gray-300">
                {language === 'pt' ? 'Carregando currículo...' : 'Loading resume...'}
              </p>
            </div>
          )}
          
          {/* Parâmetros modificados: navpanes=0 para remover o menu lateral */}
          <object
            data={`${pdfSrc}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
            type="application/pdf"
            className="w-full h-full"
            onLoad={handleIframeLoad}
          >
            {/* Fallback para navegadores que não suportam a tag object */}
            <iframe 
              src={`${pdfSrc}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              title={language === 'pt' ? "Currículo" : "Resume"}
            >
              <p>Seu navegador não suporta a visualização de PDF.</p>
            </iframe>
          </object>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ResumeModal;