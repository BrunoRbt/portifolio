// src/components/modals/ContactModal.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as FaIcons from 'react-icons/fa';
import { ArrowRightSvg } from '../sidebar/SidebarIcons';

// Tipo para contatos
export type Contacts = {
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
  linkedin?: {
    value: string;
    url: string;
  };
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  contacts: Contacts;
}

const ContactModal: React.FC<ContactModalProps> = ({ 
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
            {/* Email */}
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
            
            {/* WhatsApp */}
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

            {/* LinkedIn - Condicional caso exista */}
            {contacts.linkedin && (
              <a 
                href={contacts.linkedin.url} 
                className="flex items-center justify-center w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 mr-2" 
                  viewBox="0 0 448 512"
                  fill="currentColor"
                >
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;