// src/layouts/MobileLayout.tsx
import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import Tools from '../components/tools/Tools';
import About from '../components/about/About';
import Contact from '../components/contact/Contact';
import backgroundImage from '../assets/f1e7d123-1034-4edf-91a5-9cf21ab035a5.jpg';
import profileImage from '../assets/IMG_20220410_230921.jpg';

const MobileLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dados do perfil (igual ao App.tsx)
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
      },
      linkedin: {
        value: 'LinkedIn',
        url: 'https://www.linkedin.com/in/bruno-roberto-devr/'
      }
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen dark:bg-background-dark">
      {/* Botão hambúrguer */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 bg-gray-200 dark:bg-gray-700 p-2 rounded-md"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 dark:text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar com overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div 
            className="w-56 h-full bg-white dark:bg-gray-800 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar 
              activeItem="about" 
              setActiveItem={() => {}} 
            />
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-4 mt-16">
        <Header 
          name={profileData.name} 
          title={profileData.title} 
          backgroundImage={profileData.backgroundImage}
          profileImage={profileData.profileImage}
        />

        <Tools />
        
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Sobre
          </h2>
          
          <About 
            aboutText={profileData.about} 
            aboutTextEn={profileData.aboutEn} 
          />
          
          <div className="mt-6">
            <Contact contacts={profileData.contacts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;