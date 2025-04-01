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
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-primary mb-4">Sobre mim</h2>
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          {aboutText.intro}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {aboutText.freelance}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {aboutText.contact}
        </p>
      </div>
    </div>
  );
};

export default About;