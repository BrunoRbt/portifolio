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
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-4">
        <div className="contact-item">
          <div className="text-gray-500 w-24">EMAIL</div>
          <div className="flex items-center gap-2">
            <span>{contacts.email}</span>
            <LinkIcon className="text-gray-400 cursor-pointer hover:text-primary" />
          </div>
        </div>
        
        <div className="contact-item">
          <div className="text-gray-500 w-24">WHATSAPP</div>
          <div className="flex items-center gap-2">
            <span>{contacts.whatsapp}</span>
            <LinkIcon className="text-gray-400 cursor-pointer hover:text-primary" />
          </div>
        </div>
        
        <div className="contact-item">
          <div className="text-gray-500 w-24">DRIBBBLE</div>
          <div className="flex items-center gap-2">
            <span>{contacts.dribbble}</span>
            <LinkIcon className="text-gray-400 cursor-pointer hover:text-primary" />
          </div>
        </div>
        
        <div className="contact-item">
          <div className="text-gray-500 w-24">GITHUB</div>
          <div className="flex items-center gap-2">
            <span>{contacts.github}</span>
            <LinkIcon className="text-gray-400 cursor-pointer hover:text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;