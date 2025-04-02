// src/components/sidebar/Sidebar.tsx
import React, { useState, useRef, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';
import ReactDOM from 'react-dom';
import profileImage from '../../assets/f1e7d123-1034-4edf-91a5-9cf21ab035a5.jpg';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
// Importe o PDF
import pdfJornada from '../../assets/Desenvolvedor Full Stack Python Jornada de aprendizagem Fase 15.pdf';

// Tipo para criar wrapper components
type IconWrapperProps = {
  className?: string;
};

// Criando wrapper components para cada ícone
const UserIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaUser className={className} />;
const StarIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaStar className={className} />;
const CommentIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaComment className={className} />;
const FileAltIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaFileAlt className={className} />;
const LanguageIcon: React.FC<IconWrapperProps> = ({ className }) => <MdIcons.MdLanguage className={className} />;
const MoonIcon: React.FC<IconWrapperProps> = ({ className }) => <BiIcons.BiMoon className={className} />;

// CSS para esconder botões de controle do visualizador de PDF
const hidePdfControlsStyle = `
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
`;

// Solução para visualizar o PDF com controles ocultos
const PdfViewer: React.FC<{ src: string }> = ({ src }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Tenta ocultar os botões após o carregamento do visualizador
    const applyButtonHiding = () => {
      if (containerRef.current) {
        // Encontra todos os iframes dentro do contêiner
        const frames = containerRef.current.querySelectorAll('iframe');
        
        frames.forEach(frame => {
          try {
            // Tenta acessar o documento dentro do iframe e aplicar classes CSS
            // Isso pode falhar devido a restrições de segurança entre domínios
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

    const timer = setTimeout(applyButtonHiding, 1000);
    window.addEventListener('load', applyButtonHiding);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', applyButtonHiding);
    };
  }, []);

  return (
    <div ref={containerRef} className="pdf-container">
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

// Componente Modal separado para ser renderizado no portal
const PdfModal: React.FC<{ isOpen: boolean; onClose: () => void; language: string }> = ({ 
  isOpen, 
  onClose,
  language
}) => {
  useEffect(() => {
    // Desabilitar o clique direito durante a exibição do modal
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Desabilitar atalhos de teclado comuns para impressão/salvar
    const handleKeyDown = (e: KeyboardEvent) => {
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
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Cria um portal para renderizar o modal fora da hierarquia do DOM
  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex justify-center items-center p-4"
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <style>{hidePdfControlsStyle}</style>
      
      <div 
        className="w-full h-full max-w-5xl max-h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700">
          <h3 className="text-lg font-medium dark:text-white">
            {language === 'pt' ? 'Jornada de Aprendizagem' : 'Learning Journey'}
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
        <div className="flex-grow relative">
          <PdfViewer src={pdfJornada} />
        </div>
      </div>
    </div>,
    document.body // Renderiza diretamente no body do documento
  );
};

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  
  // Fechar os menus quando clicar fora deles
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false);
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Função para tornar qualquer imagem do PDF clicável para abrir o modal
  const handlePdfThumbnailClick = () => {
    setIsPdfModalOpen(true);
  };
  
  // Para exportar a função para outros componentes se necessário
  useEffect(() => {
    // Adiciona a função ao objeto window para que possa ser acessada globalmente se necessário
    // @ts-ignore
    window.openPdfModal = handlePdfThumbnailClick;
    
    return () => {
      // @ts-ignore
      delete window.openPdfModal;
    };
  }, []);
  
  return (
    <>
      <div className="w-full h-full flex flex-col py-3 dark:bg-gray-800 transition-colors duration-200">
        <div className="px-4 py-3">
          <h2 className="text-gray-500 dark:text-gray-400 text-xs uppercase font-medium tracking-wider">{language === 'pt' ? 'NAVEGAR' : 'NAVIGATE'}</h2>
        </div>
        
        <div 
          className={`sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 ${activeItem === 'about' ? 'active dark:bg-gray-700' : ''}`}
          onClick={() => setActiveItem('about')}
        >
          <UserIcon className="text-gray-500 dark:text-gray-400" />
          <span>{t('about')}</span>
        </div>
        
        <div 
          className={`sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 ${activeItem === 'projects' ? 'active dark:bg-gray-700' : ''}`}
          onClick={() => setActiveItem('projects')}
        >
          <StarIcon className="text-gray-500 dark:text-gray-400" />
          <span>{t('projects')}</span>
        </div>
        
        <div 
          className={`sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 ${activeItem === 'contact' ? 'active dark:bg-gray-700' : ''}`}
          onClick={() => setActiveItem('contact')}
        >
          <CommentIcon className="text-gray-500 dark:text-gray-400" />
          <span>{t('contact')}</span>
        </div>
        
        <div 
          className={`sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 ${activeItem === 'articles' ? 'active dark:bg-gray-700' : ''}`}
          onClick={() => {
            setActiveItem('articles');
            setIsPdfModalOpen(true); // Abre o modal ao clicar
          }}
        >
          <FileAltIcon className="text-gray-500 dark:text-gray-400" />
          <span>{t('articles')}</span>
        </div>
        
        <div className="mt-auto px-5 pt-4">
          <h2 className="text-gray-500 dark:text-gray-400 text-xs uppercase font-medium tracking-wider mb-2">{t('settings')}</h2>
          
          {/* Menu de Idioma */}
          <div 
            className="sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer relative"
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            ref={languageMenuRef}
          >
            <LanguageIcon className="text-gray-500 dark:text-gray-400" />
            <div className="flex flex-col">
              <span>{t('language')}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {language === 'pt' ? t('portuguese') : t('english')}
              </span>
            </div>
            <span className="ml-auto">▼</span>
            
            {/* Dropdown Menu para Idioma */}
            {languageMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10 top-full">
                <div 
                  className={`px-4 py-2 text-sm cursor-pointer flex items-center ${language === 'pt' ? 'bg-gray-100 dark:bg-gray-600' : ''} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLanguage('pt');
                    setLanguageMenuOpen(false);
                  }}
                >
                  <img src="https://flagcdn.com/w20/br.png" alt="Português" className="mr-2 w-5 h-auto" />
                  <span className="dark:text-gray-300">{t('portuguese')}</span>
                  {language === 'pt' && (
                    <span className="ml-auto text-green-500 font-bold">✓</span>
                  )}
                </div>
                <div 
                  className={`px-4 py-2 text-sm cursor-pointer flex items-center ${language === 'en' ? 'bg-gray-100 dark:bg-gray-600' : ''} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLanguage('en');
                    setLanguageMenuOpen(false);
                  }}
                >
                  <img src="https://flagcdn.com/w20/us.png" alt="English" className="mr-2 w-5 h-auto" />
                  <span className="dark:text-gray-300">{t('english')}</span>
                  {language === 'en' && (
                    <span className="ml-auto text-green-500 font-bold">✓</span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Menu de Tema */}
          <div 
            className="sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer relative"
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            ref={themeMenuRef}
          >
            {theme === 'light' ? (
              <>
                <div className="text-xl flex justify-center items-center w-5 h-5 text-yellow-500">☀️</div>
                <div className="flex flex-col">
                  <span>{t('theme')}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{t('lightTheme')}</span>
                </div>
              </>
            ) : (
              <>
                <MoonIcon className="text-gray-500 dark:text-gray-400" />
                <div className="flex flex-col">
                  <span>{t('theme')}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{t('darkTheme')}</span>
                </div>
              </>
            )}
            <span className="ml-auto">▼</span>
            
            {/* Dropdown Menu para Tema */}
            {themeMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10 top-full">
                <div 
                  className={`px-4 py-2 text-sm cursor-pointer flex items-center ${theme === 'light' ? 'bg-gray-100 dark:bg-gray-600' : ''} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (theme !== 'light') toggleTheme();
                    setThemeMenuOpen(false);
                  }}
                >
                  <div className="text-xl flex justify-center items-center w-5 h-5 text-yellow-500 mr-2">☀️</div>
                  <span className="dark:text-gray-300">{t('lightTheme')}</span>
                  {theme === 'light' && (
                    <span className="ml-auto text-green-500 font-bold">✓</span>
                  )}
                </div>
                <div 
                  className={`px-4 py-2 text-sm cursor-pointer flex items-center ${theme === 'dark' ? 'bg-gray-100 dark:bg-gray-600' : ''} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (theme !== 'dark') toggleTheme();
                    setThemeMenuOpen(false);
                  }}
                >
                  <MoonIcon className="text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="dark:text-gray-300">{t('darkTheme')}</span>
                  {theme === 'dark' && (
                    <span className="ml-auto text-green-500 font-bold">✓</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-4 px-4">
          <div className="flex items-center gap-3">
            <img 
              src={profileImage}
              alt="Profile" 
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium dark:text-white">BrunoRbt</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('profile')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal do PDF renderizado através do portal para garantir que esteja acima de tudo */}
      <PdfModal 
        isOpen={isPdfModalOpen} 
        onClose={() => setIsPdfModalOpen(false)} 
        language={language}
      />
    </>
  );
};

export default Sidebar;