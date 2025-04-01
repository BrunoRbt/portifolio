// src/App.tsx
import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Tools from './components/tools/Tools';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import backgroundImage from './assets/f1e7d123-1034-4edf-91a5-9cf21ab035a5.jpg'; // Imagem do fundo
import profileImage from './assets/IMG_20220410_230921.jpg'; // Imagem de perfil original

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('about');

  // Dados do perfil 
  const profileData = {
    name: 'Bruno Roberto',
    title: 'Full Stack Developer',
    backgroundImage: backgroundImage,
    profileImage: profileImage,
    about: {
      intro: 'Designer e Frontend Developer, 19 anos, especializado em criar interfaces intuitivas e aplicações eficientes. Iniciei minha carreira aos 15 anos como designer visual, criando capas de música e thumbnails, migrando para UI/UX logo em seguida. Atualmente, concentro-me em combinar design e desenvolvimento frontend para entregar soluções completas.',
      freelance: 'Como freelancer, colaboro com diversos clientes para transformar ideias em produtos digitais que aliam estética e usabilidade. Meu objetivo é sempre alinhar as necessidades dos usuários às metas de negócio, garantindo soluções eficazes e satisfatórias.',
      contact: 'Quer discutir um projeto? Vamos começar! eu.daviaxs@gmail.com :)'
    },
    aboutEn: {
      intro: 'Designer and Frontend Developer, 19 years old, specialized in creating intuitive interfaces and efficient applications. I started my career at 15 as a visual designer, creating music covers and thumbnails, quickly moving to UI/UX. Currently, I focus on combining design and frontend development to deliver complete solutions.',
      freelance: 'As a freelancer, I collaborate with various clients to transform ideas into digital products that combine aesthetics and usability. My goal is always to align user needs with business goals, ensuring effective and satisfactory solutions.',
      contact: 'Want to discuss a project? Let\'s start! eu.daviaxs@gmail.com :)'
    },
    contacts: {
      email: {
        value: 'richard2oliver1@gmail.com',
        url: 'https://mail.google.com/mail/?view=cm&fs=1&to=richard2oliver1@gmail.com&su=Contato%20atrav%C3%A9s%20do%20Portf%C3%B3lio&body=Ol%C3%A1%20Richard%2C%0A%0AEstou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20seu%20portf%C3%B3lio.'
      },
      whatsapp: {
        value: 'Whatssap',
        url: 'https://w.app/us4u1n'
      },
      dribbble: {
        value: 'daviaxs',
        url: ''
      },
      github: {
        value: 'Github',
        url: 'https://github.com/BrunoRbt'
      }
    }
  };

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="flex flex-row min-h-screen dark:bg-background-dark transition-colors duration-200">
          {/* Sidebar */}
          <div className="w-56 fixed left-0 top-0 bottom-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-colors duration-200">
            <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>
          
          {/* Main Content */}
          <div className="ml-56 flex-1 bg-background dark:bg-background-dark min-h-screen transition-colors duration-200">
            <div className="max-w-full p-4">
              <Header 
                name={profileData.name} 
                title={profileData.title} 
                backgroundImage={profileData.backgroundImage}
                profileImage={profileData.profileImage}
              />
              
              <div className="mt-20 bg-white dark:bg-gray-800 rounded-lg p-8 transition-colors duration-200">
                <Tools />
                
                {/* About and Contact in a flex layout */}
                <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-200">Sobre mim</h2>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 md:pr-12">
                      <About aboutText={profileData.about} aboutTextEn={profileData.aboutEn} />
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
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;