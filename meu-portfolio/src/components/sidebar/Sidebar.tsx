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

// Add this type definition near the top of the file
type Contacts = {
  email: {
    value: string;
    url: string;
  };
  whatsapp: {
    value: string;
    url: string;
  };
  github: {
    value: string;
    url: string;
  };
};

// Add this type definition near the top of the file
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  language: string;
};

// Criando wrapper components para cada ícone
const UserIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaUser className={className} />;
const StarIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaStar className={className} />;
const CommentIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaComment className={className} />;
const FileAltIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaFileAlt className={className} />;
const LanguageIcon: React.FC<IconWrapperProps> = ({ className }) => <MdIcons.MdLanguage className={className} />;
const MoonIcon: React.FC<IconWrapperProps> = ({ className }) => <BiIcons.BiMoon className={className} />;

// Remover o ChevronRightIcon e adicionar o novo ArrowRightSvg
const ArrowRightSvg: React.FC<IconWrapperProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

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

// Componente Modal para contatos
const ContactModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  language: string; 
  contacts: Contacts 
}> = ({ 
  isOpen, 
  onClose,
  language,
  contacts
}) => {
  useEffect(() => {
    // Fechar com a tecla ESC
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex justify-center items-center p-4"
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-medium dark:text-white">
            {language === 'pt' ? 'Fale Comigo' : 'Contact Me'}
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
        
        <div className="p-6">
          <div className="space-y-6">
            {/* Email - Corrigido o layout para mobile */}
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full flex-shrink-0">
                <FaIcons.FaEnvelope className="text-blue-500 dark:text-blue-300 text-xl" />
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{language === 'pt' ? 'Email' : 'Email'}</h4>
                <a 
                  href={contacts.email.url} 
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm truncate block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contacts.email.value}
                </a>
              </div>
              <a 
                href={contacts.email.url} 
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex-shrink-0 ml-2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enviar email"
              >
                <ArrowRightSvg />
              </a>
            </div>
            
            {/* WhatsApp - Corrigido o layout para mobile */}
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full flex-shrink-0">
                <FaIcons.FaWhatsapp className="text-green-500 dark:text-green-300 text-xl" />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{language === 'pt' ? 'WhatsApp' : 'WhatsApp'}</h4>
                <a 
                  href={contacts.whatsapp.url} 
                  className="text-green-600 dark:text-green-400 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contacts.whatsapp.value}
                </a>
              </div>
              <a 
                href={contacts.whatsapp.url} 
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex-shrink-0 ml-2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contato via WhatsApp"
              >
                <ArrowRightSvg />
              </a>
            </div>
            
            {/* GitHub */}
            <a 
              href={contacts.github.url} 
              className="flex items-center justify-center w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaIcons.FaGithub className="mr-2" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
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
    };
  }, [isOpen, onClose]);

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

// Add this component definition with the other modal components
const ProjectsModal: React.FC<ModalProps> = ({ isOpen, onClose, language }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-medium dark:text-white">
            {language === 'pt' ? 'Projetos' : 'Projects'}
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
        <div className="p-6 text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
            {language === 'pt' ? 'Em breve...' : 'Coming soon...'}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {language === 'pt' 
              ? 'Novos projetos estão sendo desenvolvidos e serão adicionados em breve.' 
              : 'New projects are being developed and will be added soon.'}
          </p>
        </div>
      </div>
    </div>,
    document.body
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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false); // Novo estado
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false); // Novo estado
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  
  // Dados de contato
  const contacts = {
    email: {
      value: 'richard2oliver1@gmail.com',
      url: 'https://mail.google.com/mail/?view=cm&fs=1&to=richard2oliver1@gmail.com&su=Contato%20Portfolio'
    },
    whatsapp: {
      value: 'WhatsApp',
      url: 'https://w.app/us4u1n'
    },
    github: {
      value: 'Github',
      url: 'https://github.com/BrunoRbt'
    },
    linkedin: {  // Nova entrada
      value: 'LinkedIn',
      url: 'https://www.linkedin.com/in/bruno-roberto-devr/'
    }
  };
  
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
          onClick={() => {
            setActiveItem('projects');
            setIsProjectsModalOpen(true);
          }}
        >
          <StarIcon className="text-gray-500 dark:text-gray-400" />
          <span>{t('projects')}</span>
        </div>
        
        <div 
          className={`sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 ${activeItem === 'contact' ? 'active dark:bg-gray-700' : ''}`}
          onClick={() => {
            setActiveItem('contact');
            setIsContactModalOpen(true); // Abre o modal ao clicar
          }}
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
      
      {/* Modal de Contato */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        language={language}
        contacts={contacts}
      />

      {/* Modal de Projetos */}
      <ProjectsModal 
        isOpen={isProjectsModalOpen}
        onClose={() => setIsProjectsModalOpen(false)}
        language={language}
      />
    </>
  );
};

export default Sidebar;