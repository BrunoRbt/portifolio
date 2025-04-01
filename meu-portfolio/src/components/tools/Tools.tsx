// src/components/tools/Tools.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

// Interface para ferramenta
interface Tool {
  name: string;
  icon: string;
}

const Tools: React.FC = () => {
  const { t } = useLanguage();
  
  const tools: Tool[] = [
    { name: 'Python', icon: '🐍' },
    { name: 'Django', icon: '🌐' },
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
    { name: 'Heroku', icon: '🟣' },
    { name: 'Figma', icon: '🖌️' },
    { name: 'Photoshop', icon: '🖼️' },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 transition-colors duration-200">{t('tools')}</h2>
      <div className="flex flex-wrap gap-3">
        {tools.map((tool, index) => (
          <div key={index} className="px-4 py-2.5 bg-white dark:bg-gray-700 shadow-sm rounded-lg text-sm flex items-center gap-2 border border-gray-100 dark:border-gray-600 dark:text-gray-200 transition-colors duration-200">
            <span className="text-xl">{tool.icon}</span>
            <span className="font-medium">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;