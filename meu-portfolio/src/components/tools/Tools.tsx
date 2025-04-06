// src/components/tools/Tools.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import GoogleIcon from '../icons/GoogleIcon';

// Interface para ferramenta
interface Tool {
  name: string;
  icon: React.ReactNode;
}

const Tools: React.FC = () => {
  const { t } = useLanguage();
  
  const tools: Tool[] = [
    { name: 'Python', icon: '🐍' },
    { name: 'Django', icon: '🦄' },
    { name: 'Flask', icon: '🧪' },
    { name: 'JavaScript', icon: '📜' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'React JS', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'HTML', icon: '📄' },
    { name: 'CSS', icon: '🎨' },
    { name: 'Bootstrap', icon: '🅱️' },
    { name: 'TailwindCSS', icon: '🌊' },
    { name: 'Node.js', icon: '📦' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MySQL', icon: '🔍' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Git', icon: '📊' },
    { name: 'Linux', icon: '🐧' },
    { name: 'AWS', icon: '☁️' },
    { name: 'GCP', icon: <GoogleIcon /> },
    { name: 'Heroku', icon: '🟣' },
    { name: 'Figma', icon: '🖌️' },
    { name: 'Photoshop', icon: '🖼️' },
  ];

  return (
    <div className="mb-8 md:mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-5 transition-colors duration-200">{t('tools')}</h2>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {tools.map((tool, index) => (
          <div 
            key={index} 
            className="px-3 py-2 md:px-4 md:py-2.5 bg-white dark:bg-gray-700 shadow-sm hover:shadow-md rounded-lg text-xs md:text-sm flex items-center gap-1.5 md:gap-2 border border-gray-100 dark:border-gray-600 dark:text-gray-200 transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer transform hover:scale-105 hover:border-gray-300 dark:hover:border-gray-500"
          >
            <span className="text-lg md:text-xl">{tool.icon}</span>
            <span className="font-medium">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;