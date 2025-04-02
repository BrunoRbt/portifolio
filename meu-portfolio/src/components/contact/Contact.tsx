// src/components/contact/Contact.tsx
import React, { useEffect, useState } from 'react';
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
    github: {
      value: string;
      url: string;
    };
    linkedin: {
      value: string;
      url: string;
    };
  };
}

const Contact: React.FC<ContactProps> = ({ contacts }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detecta se é mobile baseado no tamanho da tela
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Checar inicialmente
    checkIfMobile();

    // Adicionar listener para mudanças de tamanho
    window.addEventListener('resize', checkIfMobile);

    // Limpar event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div>
      <div className={`grid grid-cols-1 gap-3 ${isMobile ? 'text-left' : 'text-right'}`}>
        {/* Email - Red hover */}
        <div className={`flex ${isMobile ? 'justify-start' : 'justify-end'} items-center gap-2`}>
          <a 
            href={contacts.email.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            {contacts.email.value}
          </a>
          <a 
            href={contacts.email.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <LinkIcon className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors" />
          </a>
        </div>
        
        {/* WhatsApp - Green hover */}
        <div className={`flex ${isMobile ? 'justify-start' : 'justify-end'} items-center gap-2`}>
          <a 
            href={contacts.whatsapp.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
          >
            {contacts.whatsapp.value}
          </a>
          <a 
            href={contacts.whatsapp.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <LinkIcon className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-green-500 dark:hover:text-green-400 transition-colors" />
          </a>
        </div>
        
        {/* GitHub - Purple hover */}
        <div className={`flex ${isMobile ? 'justify-start' : 'justify-end'} items-center gap-2`}>
          <a 
            href={contacts.github.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
          >
            {contacts.github.value}
          </a>
          <a 
            href={contacts.github.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <LinkIcon className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-purple-500 dark:hover:text-purple-400 transition-colors" />
          </a>
        </div>
        
        {/* LinkedIn - Blue hover */}
        <div className={`flex ${isMobile ? 'justify-start' : 'justify-end'} items-center gap-2`}>
          <a 
            href={contacts.linkedin.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            {contacts.linkedin.value}
          </a>
          <a 
            href={contacts.linkedin.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <LinkIcon className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;