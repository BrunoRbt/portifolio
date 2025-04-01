// src/App.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Tools from './components/tools/Tools';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import profileImage from './assets/IMG_20220410_230921.jpg';

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
    profileImage: profileImage,
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
          <Header 
            name={profileData.name} 
            title={profileData.title} 
            profileImage={profileData.profileImage} 
          />
          
          <div className="mt-20 bg-white rounded-lg p-8">
            <Tools />
            
            {/* About and Contact in a flex layout */}
            <div className="mt-10 pt-6 border-t">
              <h2 className="text-2xl font-bold text-red-500 mb-6">Sobre mim</h2>
              
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 md:pr-12">
                  <About aboutText={profileData.about} />
                </div>
                
                <div className="mt-8 md:mt-0 md:w-72">
                  <Contact contacts={profileData.contacts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;