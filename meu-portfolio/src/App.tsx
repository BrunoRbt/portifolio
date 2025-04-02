// src/App.tsx
import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Tools from './components/tools/Tools';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import backgroundImage from './assets/f1e7d123-1034-4edf-91a5-9cf21ab035a5.jpg'; // Imagem do fundo
import profileImage from './assets/IMG_20220410_230921.jpg'; // Imagem de perfil original

// Componente interno que usa o contexto de idioma
const AppContent: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('about');
  const { t } = useLanguage();

  // Dados do perfil 
  const profileData = {
    name: 'Bruno Roberto',
    title: 'Full Stack Python Developer',
    backgroundImage: backgroundImage,
    profileImage: profileImage,
    about: {
      intro: 'Desenvolvedor Full Stack Python com formação pela EBAC, com experiência adquirida em projetos de desenvolvimento web, aperfeiçoando habilidades em linguagens como HTML, CSS, JavaScript e frameworks como React e Bootstrap para criar interfaces responsivas e dinâmicas.',
      freelance: 'Conhecimento na integração de front-end e back-end, utilizando ferramentas como Git para versionamento e automação, além de habilidades em APIs RESTful e GraphQL. Experiência em bancos de dados SQL e NoSQL, atuando com PostgreSQL, MySQL, MongoDB e SQLite.',
      contact: 'Experiência em desenvolvimento back-end com Python, Django e Flask, incluindo a construção de aplicações escaláveis, configuração de ambientes Linux e uso de Docker para implantação. Competência em integração contínua com GitHub Actions e aplicação de metodologias ágeis como Scrum e Kanban.'
    },
    aboutEn: {
      intro: 'Full Stack Python Developer with education from EBAC, with experience gained in web development projects, enhancing skills in languages such as HTML, CSS, JavaScript, and frameworks like React and Bootstrap to create responsive and dynamic interfaces.',
      freelance: 'Knowledge in front-end and back-end integration, using tools like Git for versioning and automation, along with skills in RESTful APIs and GraphQL. Experience with SQL and NoSQL databases, working with PostgreSQL, MySQL, MongoDB, and SQLite.',
      contact: 'Experience in back-end development with Python, Django, and Flask, including building scalable applications, configuring Linux environments, and using Docker for deployment. Proficient in continuous integration with GitHub Actions and applying agile methodologies such as Scrum and Kanban.'
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
      github: {
        value: 'Github',
        url: 'https://github.com/BrunoRbt'
      }
    }
  };

  return (
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
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-200">{t('about')}</h2>
              
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
  );
};

// Componente principal que fornece os contextos
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;