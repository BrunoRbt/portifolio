// src/components/modals/CertificationModal.tsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PdfViewer from '../viewers/PdfViewer';
import { isMobileDevice } from '../sidebar/styles/pdfStyles';

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfSrc: string;
  title: string;
  googleDriveId?: string;
}

const CertificationModal: React.FC<CertificationModalProps> = ({ 
  isOpen, 
  onClose,
  pdfSrc,
  title,
  googleDriveId
}) => {
  const [isMobile, setIsMobile] = useState(false);

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
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
        height: 'calc(100% - 56px)'  // Ajustar altura considerando o header
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
            {title || "Visualizar Certificado"}
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
          <PdfViewer src={pdfSrc} googleDriveFileId={googleDriveId} />
        </div>
      </div>
    </div>,
    document.body // Renderiza diretamente no body do documento
  );
};

export default CertificationModal;