// src/components/about/About.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AboutTextProps {
  intro: string;
  freelance: string;
  contact: string;
}

interface AboutProps {
  aboutText: AboutTextProps;
  aboutTextEn: AboutTextProps;
}

const About: React.FC<AboutProps> = ({ aboutText, aboutTextEn }) => {
  const { language } = useLanguage();
  const text = language === 'pt' ? aboutText : aboutTextEn;

  return (
    <div>
      <div className="space-y-5">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base transition-colors duration-200">
          {text.intro}
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base transition-colors duration-200">
          {text.freelance}
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base transition-colors duration-200">
          {text.contact}
        </p>
      </div>
    </div>
  );
};

export default About;