// src/App.tsx - modificado para incluir o SplashScreen
import React, { useState, useEffect } from 'react';
import ResponsiveNavigation from './components/navigation/ResponsiveNavigation';
import Header from './components/header/Header';
import Tools from './components/tools/Tools';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Certifications from './components/certifications/Certifications';
import CertificationModal from './components/modals/CertificationModal';
import SplashScreen from './components/splash/SplashScreen'; // Importando o novo componente
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import backgroundImage from './assets/f1e7d123-1034-4edf-91a5-9cf21ab035a5.jpg';
import profileImage from './assets/IMG_20220410_230921.jpg';

// Importação dos PDFs
import pdfJornada from './assets/Desenvolvedor Full Stack Python Jornada de aprendizagem Fase 15.pdf';

// Componente interno que usa o contexto de idioma
const AppContent: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('about');
  const { t, language } = useLanguage();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Estado para o modal de certificados
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);
  const [currentCertPdf, setCurrentCertPdf] = useState<string>('');
  const [currentCertTitle, setCurrentCertTitle] = useState<string>('');
  const [currentGoogleDriveId, setCurrentGoogleDriveId] = useState<string>('');

  // Estado para o modal de PDF de artigos
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  
  // Estado para controlar a exibição do splash screen
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Checar inicialmente
    checkIfMobile();

    // Adicionar listener para mudanças de tamanho
    window.addEventListener('resize', checkIfMobile);

    // Limpar event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Função para fechar o splash screen
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Função para abrir o modal de certificado
  const handleOpenCertificate = (pdfUrl: string, title: string, googleDriveId: string) => {
    console.log("Abrindo certificado:", title, pdfUrl);
    console.log("Google Drive ID:", googleDriveId);
    setCurrentCertPdf(pdfUrl);
    setCurrentCertTitle(title);
    setCurrentGoogleDriveId(googleDriveId);
    setIsCertModalOpen(true);
  };

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
        value: 'Gmail',
        url: 'https://mail.google.com/mail/?view=cm&fs=1&to=brunoroberto.dev8@gmail.com&su=Oi%20Bruno!%20vim%20através%20do%20seu%20portfólio'
      },
      whatsapp: {
        value: 'Whatssap',
        url: 'https://wa.me/5581997374007?text=Oi%20Bruno!%20vim%20atrav%C3%A9s%20do%20seu%20portif%C3%B3lio'
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
    <>
      {/* Exibir o splash screen se o estado showSplash for true */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      <div className="flex flex-col min-h-screen dark:bg-background-dark transition-colors duration-200">
        {/* Navigation */}
        <ResponsiveNavigation activeItem={activeItem} setActiveItem={setActiveItem} />
        
        {/* Main Content */}
        <div className={`${isMobile ? 'ml-0 pt-16' : 'ml-56'} flex-1 bg-background dark:bg-background-dark min-h-screen transition-all duration-200`}>
          <div className="max-w-full p-4">
            <Header 
              name={profileData.name} 
              title={profileData.title} 
              backgroundImage={profileData.backgroundImage}
              profileImage={profileData.profileImage}
            />
            
            <div className="mt-20 bg-white dark:bg-gray-800 rounded-lg p-4 md:p-8 transition-colors duration-200">
              <Tools />
              
              {/* Conteúdo baseado no item ativo */}
              {activeItem === 'certifications' ? (
                <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <Certifications onOpenPdf={handleOpenCertificate} />
                </div>
              ) : activeItem === 'resume' ? (
                <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-200">{t('resume')}</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {language === 'pt' 
                      ? 'Selecione "Currículo" no menu lateral para visualizar o documento completo em português ou inglês.' 
                      : 'Select "Resume" in the sidebar menu to view the full document in Portuguese or English.'}
                  </p>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>

        {/* Modal para visualizar PDF de jornada/artigos */}
        <CertificationModal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          pdfSrc={pdfJornada}
          title={t('articles')}
          googleDriveId="1cZ0kKOcjM5trTxnO3_VhHZQQdz7k2N1W" // ID do Google Drive para o PDF de artigos
        />

        {/* Modal para visualizar certificados */}
        <CertificationModal
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
          pdfSrc={currentCertPdf}
          title={currentCertTitle}
          googleDriveId={currentGoogleDriveId}
        />
      </div>
    </>
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