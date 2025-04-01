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
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-red-500 mb-6">Sobre mim</h2>
      <div className="space-y-5">
        <p className="text-gray-700 leading-relaxed text-base">
          {aboutText.intro}
        </p>
        <p className="text-gray-700 leading-relaxed text-base">
          {aboutText.freelance}
        </p>
        <p className="text-gray-700 leading-relaxed text-base">
          {aboutText.contact}
        </p>
      </div>
    </div>
  );
};

export default About;