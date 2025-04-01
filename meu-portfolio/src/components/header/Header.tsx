// src/components/header/Header.tsx
import React from 'react';

interface HeaderProps {
  name: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ name, title }) => {
  return (
    <div className="w-full relative mb-16">
      <div className="h-48 bg-gradient-to-r from-primary to-red-700 rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex justify-between items-center px-16 text-white">
          <h2 className="text-4xl font-bold">Web Designer</h2>
          <h2 className="text-4xl font-bold">Web Developer</h2>
        </div>
      </div>
      
      <div className="absolute -bottom-12 left-8 flex gap-6 items-end">
        <div className="bg-gradient-to-br from-primary to-red-700 rounded-full p-1">
          <img 
            src="/profile.jpg" 
            alt={name} 
            className="w-24 h-24 rounded-full"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/96";
            }}
          />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-600">{title}</p>
        </div>
        
        <button className="ml-auto bg-primary hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <span>Fale comigo</span>
        </button>
      </div>
    </div>
  );
};

export default Header;