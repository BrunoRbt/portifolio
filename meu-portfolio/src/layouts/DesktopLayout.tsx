import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import Tools from '../components/tools/Tools';
import About from '../components/about/About';
import Contact from '../components/contact/Contact';
import backgroundImage from '../assets/f1e7d123-1034-4edf-91a5-9cf21ab035a5.jpg';
import profileImage from '../assets/IMG_20220410_230921.jpg';

const DesktopLayout: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('about');

  // Seu código de layout desktop existente
  return (
    <div className="flex flex-row min-h-screen dark:bg-background-dark">
      {/* Conteúdo do layout desktop */}
    </div>
  );
};

export default DesktopLayout;