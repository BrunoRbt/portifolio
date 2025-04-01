// src/App.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Tools from './components/tools/Tools';
import About from './components/about/About';
import Contact from './components/contact/Contact';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('about');
  const [mounted, setMounted] = useState<boolean>(false);

  // Usar useEffect para indicar que o componente foi montado
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  // Dados do perfil 
  const profileData = {
    name: 'Davi Alves',
    title: 'Pleno UI/UX Designer & Desenvolvedor Frontend',
    about: {
      intro: 'Designer e Frontend Developer, 19 anos, especializado em criar interfaces intuitivas e aplicações eficientes. Iniciei minha carreira aos 15 anos como designer visual, criando capas de música e thumbnails, migrando para UI/UX logo em seguida. Atualmente, concentro-me em combinar design e desenvolvimento frontend para entregar soluções completas.',
      freelance: 'Como freelancer, colaboro com diversos clientes para transformar ideias em produtos digitais que aliam estética e usabilidade. Meu objetivo é sempre alinhar as necessidades dos usuários às metas de negócio, garantindo soluções eficazes e satisfatórias.',
      contact: 'Quer discutir um projeto? Vamos começar! eu.daviaxs@gmail.com :)'
    },
    contacts: {
      email: 'eu@daviaxs.com',
      whatsapp: 'whatsapp.com',
      dribbble: 'dribbble.com',
      github: 'github.com'
    }
  };

  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-56 fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 overflow-y-auto">
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      </div>
      
      {/* Main Content */}
      <div className="ml-56 flex-1 bg-background min-h-screen">
        <div className="max-w-full p-4">
          <Header name={profileData.name} title={profileData.title} />
          
          <div className="mt-20 bg-white rounded-lg p-8">
            <Tools />
            <About aboutText={profileData.about} />
            <Contact contacts={profileData.contacts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;