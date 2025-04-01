// src/components/about/About.tsx
import React from 'react';

interface AboutProps {
  aboutText: {
    intro: string;
    freelance: string;
    contact: string;
  };
}

const About: React.FC<AboutProps> = ({ aboutText }) => {
  return (
    <div>
      <div className="space-y-5">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base transition-colors duration-200">
          {aboutText.intro}
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base transition-colors duration-200">
          {aboutText.freelance}
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base transition-colors duration-200">
          {aboutText.contact}
        </p>
      </div>
    </div>
  );
};

export default About;