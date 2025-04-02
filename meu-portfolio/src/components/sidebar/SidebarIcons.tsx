// src/components/sidebar/SidebarIcons.tsx
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';
import * as IoIcons from 'react-icons/io5';

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

// Usando um SVG inline para o ícone de formação/graduação
export const GraduationIcon: React.FC<IconWrapperProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    width="16" 
    height="16" 
    viewBox="0 0 640 512" 
    fill="currentColor"
  >
    <path d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"/>
  </svg>
);

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