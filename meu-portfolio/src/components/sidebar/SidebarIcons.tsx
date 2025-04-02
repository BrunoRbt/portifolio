// src/components/sidebar/SidebarIcons.tsx
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';

// Tipo para criar wrapper components
type IconWrapperProps = {
  className?: string;
};

// Criando wrapper components para cada ícone
export const UserIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaUser className={className} />;
export const StarIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaStar className={className} />;
export const CommentIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaComment className={className} />;
export const FileAltIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaFileAlt className={className} />;
export const LanguageIcon: React.FC<IconWrapperProps> = ({ className }) => <MdIcons.MdLanguage className={className} />;
export const MoonIcon: React.FC<IconWrapperProps> = ({ className }) => <BiIcons.BiMoon className={className} />;
export const LinkIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaLink className={className} />;

// Componente de seta para a direita
export const ArrowRightSvg: React.FC<IconWrapperProps> = ({ className }) => (
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