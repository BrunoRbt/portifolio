// src/components/sidebar/styles/pdfStyles.ts

// CSS para esconder botões de controle do visualizador de PDF
export const hidePdfControlsStyle = `
  @media print {
    body { display: none; }
  }

  /* Esconde botões de download e impressão */
  .hide-pdf-buttons #chrome-toolbar,
  .hide-pdf-buttons .toolbar,
  .hide-pdf-buttons #download,
  .hide-pdf-buttons #print,
  .hide-pdf-buttons #save,
  .hide-pdf-buttons #viewBookmark,
  .hide-pdf-buttons .print-download-button {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  /* Cria uma camada transparente que cobre a área dos botões */
  .pdf-overlay {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 40px;
    z-index: 9999;
    background-color: rgba(0,0,0,0.01);
    pointer-events: auto;
  }

  /* Oculta os botões no visualizador nativo do Chrome */
  embed[type="application/pdf"] {
    position: relative;
    z-index: 1;
  }

  /* Customiza a aparência geral do visualizador */
  .pdf-container {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
    background-color: #f0f0f0;
  }

  .pdf-viewer {
    width: 100%;
    height: 100%;
    border: none;
  }
  
  /* Google PDF Viewer styles */
  .google-pdf-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .google-pdf-iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  
  .mobile-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 10;
  }
  
  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
    margin-bottom: 16px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Verifica se é um dispositivo móvel
export const isMobileDevice = () => {
  return (
    typeof window !== 'undefined' &&
    (window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ))
  );
};