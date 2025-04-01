// src/components/contact/Contact.tsx
import React from 'react';
import * as FaIcons from 'react-icons/fa';

// Tipo para criar wrapper components
type IconWrapperProps = {
  className?: string;
};

// Criando wrapper components para cada ícone
const LinkIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaLink className={className} />;

interface ContactProps {
  contacts: {
    email: {
      value: string;
      url: string;
    };
    whatsapp: {
      value: string;
      url: string;
    };
    dribbble: {
      value: string;
      url: string;
    };
    github: {
      value: string;
      url: string;
    };
  };
}

const Contact: React.FC<ContactProps> = ({ contacts }) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 text-right">
        <div className="flex justify-end items-center gap-2">
          <a 
            href={contacts.email.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            {contacts.email.value}
          </a>
          <a 
            href={contacts.email.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <LinkIcon className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors" />
          </a>
        </div>
        
        <div className="flex justify-end items-center gap-2">
          <a 
            href={contacts.whatsapp.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            {contacts.whatsapp.value}
          </a>
          <a 
            href={contacts.whatsapp.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <LinkIcon className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors" />
          </a>
        </div>
        
        <div className="flex justify-end items-center gap-2">
          <a 
            href={contacts.dribbble.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            {contacts.dribbble.value}
          </a>
          <a 
            href={contacts.dribbble.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <LinkIcon className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors" />
          </a>
        </div>
        
        <div className="flex justify-end items-center gap-2">
          <a 
            href={contacts.github.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            {contacts.github.value}
          </a>
          <a 
            href={contacts.github.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <LinkIcon className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;