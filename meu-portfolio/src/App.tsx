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
    <div className="min-h-screen bg-background py-0">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
          {/* Sidebar */}
          <div className="lg:col-span-1 p-6 bg-white shadow-sm">
            <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-4 p-6">
            <Header name={profileData.name} title={profileData.title} />
            
            <div className="mt-20 bg-white rounded-lg p-8">
              <Tools />
              <About aboutText={profileData.about} />
              <Contact contacts={profileData.contacts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;