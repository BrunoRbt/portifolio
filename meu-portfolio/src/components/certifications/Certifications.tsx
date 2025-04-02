// src/components/certifications/Certifications.tsx
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

// Importando os PDFs
import pythonCertificate from '../../assets/1730270400256.pdf'; // Full Stack Python
import tiCertificate from '../../assets/1728537740983.pdf'; // TI do Zero ao Pro
import careerCertificate from '../../assets/1728537826496.pdf'; // Plano de Carreira

interface CertificateProps {
  title: string;
  institution: string;
  date: string;
  duration: string;
  modules: string;
  pdfUrl: string;
  color: string;
  onClick: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ 
  title, 
  institution, 
  date, 
  duration, 
  modules, 
  color,
  onClick 
}) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border-l-4 ${color} mb-4 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{institution}</p>
        </div>
        <div className="text-right">
          <span className="text-gray-500 dark:text-gray-400 text-sm">{date}</span>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
          {duration}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
          {modules}
        </span>
      </div>
      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
        Clique para visualizar o certificado
      </div>
    </div>
  );
};

interface CertificationsProps {
  onOpenPdf: (pdfUrl: string, title: string) => void;
}

const Certifications: React.FC<CertificationsProps> = ({ onOpenPdf }) => {
  const { t } = useLanguage();
  
  const certificates = [
    {
      title: "Profissão: Desenvolvedor Full Stack Python",
      institution: "EBAC - Escola Britânica de Artes Criativas & Tecnologia",
      date: "29/10/2024",
      duration: "+75 horas",
      modules: "62 módulos",
      pdfUrl: pythonCertificate,
      color: "border-indigo-500"
    },
    {
      title: "Profissão: TI do Zero ao Pro",
      institution: "EBAC - Escola Britânica de Artes Criativas & Tecnologia",
      date: "14/11/2023",
      duration: "10 horas",
      modules: "Curso livre",
      pdfUrl: tiCertificate,
      color: "border-green-500"
    },
    {
      title: "Plano de Carreira",
      institution: "EBAC - Escola Britânica de Artes Criativas & Tecnologia",
      date: "17/09/2024",
      duration: "5 horas",
      modules: "5 módulos",
      pdfUrl: careerCertificate,
      color: "border-red-500"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-200">
        {t('certifications')}
      </h2>
      
      <div className="space-y-4">
        {certificates.map((cert, index) => (
          <Certificate 
            key={index}
            title={cert.title}
            institution={cert.institution}
            date={cert.date}
            duration={cert.duration}
            modules={cert.modules}
            pdfUrl={cert.pdfUrl}
            color={cert.color}
            onClick={() => onOpenPdf(cert.pdfUrl, cert.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default Certifications;