// src/components/sidebar/Sidebar.tsx
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';

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
  return (
    <div className="w-full h-full flex flex-col py-3">
      <div className="px-4 py-3">
        <h2 className="text-gray-500 text-xs uppercase font-medium tracking-wider">NAVEGAR</h2>
      </div>
      
      <div 
        className={`sidebar-item ${activeItem === 'about' ? 'active' : ''}`}
        onClick={() => setActiveItem('about')}
      >
        <UserIcon className="text-gray-500" />
        <span>Sobre mim</span>
      </div>
      
      <div 
        className={`sidebar-item ${activeItem === 'projects' ? 'active' : ''}`}
        onClick={() => setActiveItem('projects')}
      >
        <StarIcon className="text-gray-500" />
        <span>Projetos</span>
      </div>
      
      <div 
        className={`sidebar-item ${activeItem === 'contact' ? 'active' : ''}`}
        onClick={() => setActiveItem('contact')}
      >
        <CommentIcon className="text-gray-500" />
        <span>Fale comigo</span>
      </div>
      
      <div 
        className={`sidebar-item ${activeItem === 'articles' ? 'active' : ''}`}
        onClick={() => setActiveItem('articles')}
      >
        <FileAltIcon className="text-gray-500" />
        <span>Artigos</span>
      </div>
      
      <div className="mt-auto px-5 pt-4">
        <h2 className="text-gray-500 text-xs uppercase font-medium tracking-wider mb-2">CONFIGURAÇÕES</h2>
        
        <div className="sidebar-item">
          <LanguageIcon className="text-gray-500" />
          <div className="flex flex-col">
            <span>Idioma</span>
            <span className="text-xs text-gray-400">Português</span>
          </div>
          <span className="ml-auto">▼</span>
        </div>
        
        <div className="sidebar-item">
          <MoonIcon className="text-gray-500" />
          <div className="flex flex-col">
            <span>Tema</span>
            <span className="text-xs text-gray-400">Branco</span>
          </div>
          <span className="ml-auto">▼</span>
        </div>
      </div>
      
      <div className="mt-auto border-t pt-4 px-4">
        <div className="flex items-center gap-3">
          <img 
            src="https://via.placeholder.com/40" 
            alt="Profile" 
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">daviaxs</p>
            <p className="text-xs text-gray-500">UI/UX Designer & Web Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;