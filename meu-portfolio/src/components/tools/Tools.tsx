// src/components/tools/Tools.tsx
import React from 'react';
import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';

// Tipo para criar wrapper components
type IconWrapperProps = {
  className?: string;
};

// Criando wrapper components para cada ícone
const FigmaIcon: React.FC<IconWrapperProps> = ({ className }) => <SiIcons.SiFigma className={className} />;
const NextjsIcon: React.FC<IconWrapperProps> = ({ className }) => <SiIcons.SiNextdotjs className={className} />;
const TypescriptIcon: React.FC<IconWrapperProps> = ({ className }) => <SiIcons.SiTypescript className={className} />;
const JavascriptIcon: React.FC<IconWrapperProps> = ({ className }) => <SiIcons.SiJavascript className={className} />;
const TailwindcssIcon: React.FC<IconWrapperProps> = ({ className }) => <SiIcons.SiTailwindcss className={className} />;
const AfterEffectsIcon: React.FC<IconWrapperProps> = ({ className }) => <SiIcons.SiAdobeaftereffects className={className} />;
const PhotoshopIcon: React.FC<IconWrapperProps> = ({ className }) => <SiIcons.SiAdobephotoshop className={className} />;
const ReactIcon: React.FC<IconWrapperProps> = ({ className }) => <SiIcons.SiReact className={className} />;
const NodejsIcon: React.FC<IconWrapperProps> = ({ className }) => <SiIcons.SiNodedotjs className={className} />;
const PrismaIcon: React.FC<IconWrapperProps> = ({ className }) => <SiIcons.SiPrisma className={className} />;
const FastifyIcon: React.FC<IconWrapperProps> = ({ className }) => <SiIcons.SiFastify className={className} />;
const CssIcon: React.FC<IconWrapperProps> = ({ className }) => <SiIcons.SiCss3 className={className} />;
const GitIcon: React.FC<IconWrapperProps> = ({ className }) => <FaIcons.FaGit className={className} />;

// Interface para ferramenta
interface Tool {
  name: string;
  icon: React.ReactNode;
}

const Tools: React.FC = () => {
  const tools: Tool[] = [
    { name: 'Figma', icon: <FigmaIcon className="text-[#F24E1E] text-xl" /> },
    { name: 'Next.js', icon: <NextjsIcon className="text-black text-xl" /> },
    { name: 'TypeScript', icon: <TypescriptIcon className="text-[#3178C6] text-xl" /> },
    { name: 'JavaScript', icon: <JavascriptIcon className="text-[#F7DF1E] text-xl" /> },
    { name: 'TailwindCSS', icon: <TailwindcssIcon className="text-[#06B6D4] text-xl" /> },
    { name: 'After Effects', icon: <AfterEffectsIcon className="text-[#9999FF] text-xl" /> },
    { name: 'Photoshop', icon: <PhotoshopIcon className="text-[#31A8FF] text-xl" /> },
    { name: 'React JS', icon: <ReactIcon className="text-[#61DAFB] text-xl" /> },
    { name: 'Node', icon: <NodejsIcon className="text-[#339933] text-xl" /> },
    { name: 'Prisma', icon: <PrismaIcon className="text-[#2D3748] text-xl" /> },
    { name: 'Fastify', icon: <FastifyIcon className="text-black text-xl" /> },
    { name: 'CSS', icon: <CssIcon className="text-[#1572B6] text-xl" /> },
    { name: 'Git', icon: <GitIcon className="text-[#F05032] text-xl" /> },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">Ferramentas</h2>
      <div className="flex flex-wrap gap-3">
        {tools.map((tool, index) => (
          <div key={index} className="px-4 py-2.5 bg-white shadow-sm rounded-lg text-sm flex items-center gap-2 border border-gray-100">
            {tool.icon}
            <span className="font-medium">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;