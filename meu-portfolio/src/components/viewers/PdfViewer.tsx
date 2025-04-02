// src/components/viewers/PdfViewer.tsx
import React, { useRef, useState, useEffect } from 'react';
import { hidePdfControlsStyle, isMobileDevice } from '../sidebar/styles/pdfStyles';

interface PdfViewerProps {
  src: string;
  googleDriveFileId?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ 
  src, 
  googleDriveFileId = "1cZ0kKOcjM5trTxnO3_VhHZQQdz7k2N1W" // ID padrão para o artigo
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Verifica se é dispositivo móvel
    setIsMobile(isMobileDevice());
    
    // Atualiza o status de carregamento após um tempo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    // Tenta ocultar os botões após o carregamento do visualizador
    const applyButtonHiding = () => {
      if (containerRef.current) {
        // Encontra todos os iframes dentro do contêiner
        const frames = containerRef.current.querySelectorAll('iframe');
        
        frames.forEach(frame => {
          try {
            // Tenta acessar o documento dentro do iframe e aplicar classes CSS
            if (frame.contentDocument) {
              frame.contentDocument.body.classList.add('hide-pdf-buttons');
              
              // Esconde botões específicos
              const buttons = frame.contentDocument.querySelectorAll('button');
              buttons.forEach(button => {
                if (button.textContent?.includes('Download') || 
                    button.textContent?.includes('Print') || 
                    button.textContent?.includes('Save')) {
                  button.style.display = 'none';
                }
              });
            }
          } catch (e) {
            console.log('Não foi possível acessar o iframe:', e);
          }
        });
      }
    };

    const buttonTimer = setTimeout(applyButtonHiding, 1000);
    window.addEventListener('load', applyButtonHiding);
    
    // Adiciona listener para mudanças de orientação em dispositivos móveis
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(buttonTimer);
      window.removeEventListener('load', applyButtonHiding);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Renderização específica para dispositivos móveis usando Google Drive Viewer
  if (isMobile) {
    // URLs possíveis para tentar melhorar a visualização do PDF
    const googleDriveViewerUrl = `https://drive.google.com/file/d/${googleDriveFileId}/preview`;
    
    // Estilos inline para garantir que o iframe ocupe toda a área disponível
    const mobileIframeStyle = {
      width: '100%',
      height: '100%',
      border: 'none',
      margin: 0,
      padding: 0,
      position: 'absolute' as 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
    
    return (
      <div 
        className="google-pdf-container" 
        style={{ 
          width: '100%', 
          height: '100%', 
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {isLoading && (
          <div className="mobile-loading">
            <div className="loading-spinner"></div>
            <p>Carregando PDF...</p>
          </div>
        )}
        <iframe 
          src={googleDriveViewerUrl}
          style={mobileIframeStyle}
          onLoad={handleIframeLoad}
          allowFullScreen
        />
      </div>
    );
  }

  // Renderização para desktop
  return (
    <div ref={containerRef} className="pdf-container">
      <style>{hidePdfControlsStyle}</style>
      {/* Aplica HTML/Data/Object para melhor compatibilidade entre navegadores */}
      <object
        data={`${src}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0`}
        type="application/pdf"
        className="pdf-viewer"
      >
        <iframe 
          src={`${src}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0`}
          className="pdf-viewer"
        >
          <p>Seu navegador não suporta a visualização de PDF.</p>
        </iframe>
      </object>
      
      {/* Overlay para interceptar cliques nos botões */}
      <div className="pdf-overlay"></div>
    </div>
  );
};

export default PdfViewer;