// src/components/sidebar/Sidebar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import profileImage from '../../assets/f1e7d123-1034-4edf-91a5-9cf21ab035a5.jpg';
import pdfJornada from '../../assets/Desenvolvedor Full Stack Python Jornada de aprendizagem Fase 15.pdf';
import { 
  UserIcon, 
  StarIcon, 
  CommentIcon, 
  FileAltIcon, 
  MoonIcon,
  GraduationIcon // Adicionando o ícone de formação
} from './SidebarIcons';
import { 
  NavigationItem, 
  SettingsItem, 
  LanguageMenuItem, 
  ThemeMenuItem, 
  ProfileItem 
} from './SidebarItems';
import ContactModal from '../modals/ContactModal';
import PdfModal from '../modals/PdfModal';
import ProjectsModal from '../modals/ProjectsModal';

// Tipo de contatos
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
  linkedin: {
    value: string;
    url: string;
  };
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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  
  // Dados de contato
  const contacts: Contacts = {
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
    linkedin: {
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
          <h2 className="text-gray-500 dark:text-gray-400 text-xs uppercase font-medium tracking-wider">
            {language === 'pt' ? 'NAVEGAR' : 'NAVIGATE'}
          </h2>
        </div>
        
        {/* Itens de navegação */}
        <NavigationItem 
          icon={<UserIcon className="text-gray-500 dark:text-gray-400" />}
          label={t('about')}
          isActive={activeItem === 'about'}
          onClick={() => setActiveItem('about')}
        />
        
        <NavigationItem 
          icon={<StarIcon className="text-gray-500 dark:text-gray-400" />}
          label={t('projects')}
          isActive={activeItem === 'projects'}
          onClick={() => {
            setActiveItem('projects');
            setIsProjectsModalOpen(true);
          }}
        />
        
        <NavigationItem 
          icon={<CommentIcon className="text-gray-500 dark:text-gray-400" />}
          label={t('contact')}
          isActive={activeItem === 'contact'}
          onClick={() => {
            setActiveItem('contact');
            setIsContactModalOpen(true);
          }}
        />
        
        <NavigationItem 
          icon={<FileAltIcon className="text-gray-500 dark:text-gray-400" />}
          label={t('articles')}
          isActive={activeItem === 'articles'}
          onClick={() => {
            setActiveItem('articles');
            setIsPdfModalOpen(true);
          }}
        />
        
        {/* Novo item para Formações */}
        <NavigationItem 
          icon={<GraduationIcon className="text-gray-500 dark:text-gray-400" />}
          label={t('certifications')}
          isActive={activeItem === 'certifications'}
          onClick={() => setActiveItem('certifications')}
        />
        
        {/* Configurações */}
        <div className="mt-auto px-5 pt-4">
          <h2 className="text-gray-500 dark:text-gray-400 text-xs uppercase font-medium tracking-wider mb-2">
            {t('settings')}
          </h2>
          
          {/* Menu de Idioma */}
          <div ref={languageMenuRef}>
            <SettingsItem
              icon={<MoonIcon className="text-gray-500 dark:text-gray-400" />}
              title={t('language')}
              subtitle={language === 'pt' ? t('portuguese') : t('english')}
              isOpen={languageMenuOpen}
              onToggle={() => setLanguageMenuOpen(!languageMenuOpen)}
            >
              <LanguageMenuItem
                icon="https://flagcdn.com/w20/br.png"
                label={t('portuguese')}
                isActive={language === 'pt'}
                onClick={(e) => {
                  e.stopPropagation();
                  setLanguage('pt');
                  setLanguageMenuOpen(false);
                }}
              />
              <LanguageMenuItem
                icon="https://flagcdn.com/w20/us.png"
                label={t('english')}
                isActive={language === 'en'}
                onClick={(e) => {
                  e.stopPropagation();
                  setLanguage('en');
                  setLanguageMenuOpen(false);
                }}
              />
            </SettingsItem>
          </div>
          
          {/* Menu de Tema */}
          <div ref={themeMenuRef}>
            <SettingsItem
              icon={theme === 'light' 
                ? <div className="text-xl flex justify-center items-center w-5 h-5 text-yellow-500">☀️</div>
                : <MoonIcon className="text-gray-500 dark:text-gray-400" />
              }
              title={t('theme')}
              subtitle={theme === 'light' ? t('lightTheme') : t('darkTheme')}
              isOpen={themeMenuOpen}
              onToggle={() => setThemeMenuOpen(!themeMenuOpen)}
            >
              <ThemeMenuItem
                icon={<div className="text-xl flex justify-center items-center w-5 h-5 text-yellow-500 mr-2">☀️</div>}
                label={t('lightTheme')}
                isActive={theme === 'light'}
                onClick={(e) => {
                  e.stopPropagation();
                  if (theme !== 'light') toggleTheme();
                  setThemeMenuOpen(false);
                }}
              />
              <ThemeMenuItem
                icon={<MoonIcon className="text-gray-500 dark:text-gray-400 mr-2" />}
                label={t('darkTheme')}
                isActive={theme === 'dark'}
                onClick={(e) => {
                  e.stopPropagation();
                  if (theme !== 'dark') toggleTheme();
                  setThemeMenuOpen(false);
                }}
              />
            </SettingsItem>
          </div>
        </div>
        
        {/* Perfil do usuário */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-4 px-4">
          <ProfileItem
            avatar={profileImage}
            name="BrunoRbt"
            subtitle={t('profile')}
          />
        </div>
      </div>

      {/* Modals */}
      <PdfModal 
        isOpen={isPdfModalOpen} 
        onClose={() => setIsPdfModalOpen(false)} 
        language={language}
        pdfSrc={pdfJornada}
      />
      
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        language={language}
        contacts={contacts}
      />

      <ProjectsModal 
        isOpen={isProjectsModalOpen}
        onClose={() => setIsProjectsModalOpen(false)}
        language={language}
      />
    </>
  );
};

export default Sidebar;