// src/components/sidebar/Sidebar.tsx
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';
import profileImage from '../../assets/f1e7d123-1034-4edf-91a5-9cf21ab035a5.jpg';
import { useTheme } from '../../contexts/ThemeContext';

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

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="w-full h-full flex flex-col py-3 dark:bg-gray-800 transition-colors duration-200">
      <div className="px-4 py-3">
        <h2 className="text-gray-500 dark:text-gray-400 text-xs uppercase font-medium tracking-wider">NAVEGAR</h2>
      </div>
      
      <div 
        className={`sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 ${activeItem === 'about' ? 'active dark:bg-gray-700' : ''}`}
        onClick={() => setActiveItem('about')}
      >
        <UserIcon className="text-gray-500 dark:text-gray-400" />
        <span>Sobre mim</span>
      </div>
      
      <div 
        className={`sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 ${activeItem === 'projects' ? 'active dark:bg-gray-700' : ''}`}
        onClick={() => setActiveItem('projects')}
      >
        <StarIcon className="text-gray-500 dark:text-gray-400" />
        <span>Projetos</span>
      </div>
      
      <div 
        className={`sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 ${activeItem === 'contact' ? 'active dark:bg-gray-700' : ''}`}
        onClick={() => setActiveItem('contact')}
      >
        <CommentIcon className="text-gray-500 dark:text-gray-400" />
        <span>Fale comigo</span>
      </div>
      
      <div 
        className={`sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 ${activeItem === 'articles' ? 'active dark:bg-gray-700' : ''}`}
        onClick={() => setActiveItem('articles')}
      >
        <FileAltIcon className="text-gray-500 dark:text-gray-400" />
        <span>Artigos</span>
      </div>
      
      <div className="mt-auto px-5 pt-4">
        <h2 className="text-gray-500 dark:text-gray-400 text-xs uppercase font-medium tracking-wider mb-2">CONFIGURAÇÕES</h2>
        
        <div className="sidebar-item dark:text-gray-300 dark:hover:bg-gray-700">
          <LanguageIcon className="text-gray-500 dark:text-gray-400" />
          <div className="flex flex-col">
            <span>Idioma</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">Português</span>
          </div>
          <span className="ml-auto">▼</span>
        </div>
        
        <div 
          className="sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <>
              <MoonIcon className="text-gray-500 dark:text-gray-400" />
              <div className="flex flex-col">
                <span>Tema</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">Claro</span>
              </div>
            </>
          ) : (
            <>
              {/* Em vez de usar um ícone de sol, usamos um emoji diretamente */}
              <div className="text-xl flex justify-center items-center w-5 h-5 text-yellow-500">☀️</div>
              <div className="flex flex-col">
                <span>Tema</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">Escuro</span>
              </div>
            </>
          )}
          <span className="ml-auto">▼</span>
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
            <p className="text-xs text-gray-500 dark:text-gray-400">Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;