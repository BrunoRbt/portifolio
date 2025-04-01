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
    email: string;
    whatsapp: string;
    dribbble: string;
    github: string;
  };
}

const Contact: React.FC<ContactProps> = ({ contacts }) => {
  return (
    <div className="mt-12 border-t pt-8">
      <div className="grid grid-cols-1 gap-5">
        <div className="flex items-center">
          <div className="text-gray-500 w-28 font-medium text-sm">EMAIL</div>
          <div className="flex items-center gap-2">
            <span className="text-gray-800">{contacts.email}</span>
            <LinkIcon className="text-gray-400 cursor-pointer hover:text-red-500" />
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="text-gray-500 w-28 font-medium text-sm">WHATSAPP</div>
          <div className="flex items-center gap-2">
            <span className="text-gray-800">{contacts.whatsapp}</span>
            <LinkIcon className="text-gray-400 cursor-pointer hover:text-red-500" />
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="text-gray-500 w-28 font-medium text-sm">DRIBBBLE</div>
          <div className="flex items-center gap-2">
            <span className="text-gray-800">{contacts.dribbble}</span>
            <LinkIcon className="text-gray-400 cursor-pointer hover:text-red-500" />
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="text-gray-500 w-28 font-medium text-sm">GITHUB</div>
          <div className="flex items-center gap-2">
            <span className="text-gray-800">{contacts.github}</span>
            <LinkIcon className="text-gray-400 cursor-pointer hover:text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;