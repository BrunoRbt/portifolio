// src/components/header/Header.tsx
import React from 'react';

interface HeaderProps {
  name: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ name, title }) => {
  return (
    <div className="w-full relative mb-20">
      <div className="h-56 bg-gradient-to-r from-red-500 to-red-600 rounded-xl overflow-hidden relative">
        <div className="absolute inset-0 flex justify-between items-center px-16 text-white">
          <h2 className="text-5xl font-bold">Web Designer</h2>
          <h2 className="text-5xl font-bold">Web Developer</h2>
        </div>
      </div>
      
      <div className="absolute -bottom-16 left-8 flex gap-6 items-end">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full p-2 shadow-lg">
          <img 
            src="https://via.placeholder.com/128" 
            alt={name} 
            className="w-32 h-32 rounded-full"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-gray-600 text-lg">{title}</p>
        </div>
        
        <button className="ml-auto bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
          <span>Fale comigo</span>
        </button>
      </div>
    </div>
  );
};

export default Header;