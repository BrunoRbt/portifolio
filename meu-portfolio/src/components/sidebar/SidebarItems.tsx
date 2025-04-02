// src/components/sidebar/SidebarItems.tsx
import React from 'react';
import { 
  UserIcon, 
  StarIcon, 
  CommentIcon, 
  FileAltIcon, 
  LanguageIcon, 
  MoonIcon 
} from './SidebarIcons';

interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({ 
  icon, 
  label, 
  isActive, 
  onClick, 
  children 
}) => {
  return (
    <div 
      className={`sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 ${isActive ? 'active dark:bg-gray-700' : ''}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {children}
    </div>
  );
};

interface LanguageMenuItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export const LanguageMenuItem: React.FC<LanguageMenuItemProps> = ({ 
  icon, 
  label, 
  isActive, 
  onClick 
}) => {
  return (
    <div 
      className={`px-4 py-2 text-sm cursor-pointer flex items-center ${isActive ? 'bg-gray-100 dark:bg-gray-600' : ''} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150`}
      onClick={onClick}
    >
      <img src={icon} alt={label} className="mr-2 w-5 h-auto" />
      <span className="dark:text-gray-300">{label}</span>
      {isActive && (
        <span className="ml-auto text-green-500 font-bold">✓</span>
      )}
    </div>
  );
};

interface ThemeMenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export const ThemeMenuItem: React.FC<ThemeMenuItemProps> = ({ 
  icon, 
  label, 
  isActive, 
  onClick 
}) => {
  return (
    <div 
      className={`px-4 py-2 text-sm cursor-pointer flex items-center ${isActive ? 'bg-gray-100 dark:bg-gray-600' : ''} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150`}
      onClick={onClick}
    >
      {icon}
      <span className="dark:text-gray-300">{label}</span>
      {isActive && (
        <span className="ml-auto text-green-500 font-bold">✓</span>
      )}
    </div>
  );
};

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  isOpen, 
  onToggle,
  children 
}) => {
  return (
    <div 
      className="sidebar-item dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer relative"
      onClick={onToggle}
    >
      {icon}
      <div className="flex flex-col">
        <span>{title}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {subtitle}
        </span>
      </div>
      <span className="ml-auto">▼</span>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10 top-full">
          {children}
        </div>
      )}
    </div>
  );
};

export const ProfileItem: React.FC<{
  avatar: string;
  name: string;
  subtitle: string;
}> = ({ avatar, name, subtitle }) => {
  return (
    <div className="flex items-center gap-3">
      <img 
        src={avatar}
        alt="Profile" 
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-sm font-medium dark:text-white">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
};