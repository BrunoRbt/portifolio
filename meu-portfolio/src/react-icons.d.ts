// src/react-icons.d.ts
declare module 'react-icons/fa' {
    import { ComponentType, SVGAttributes } from 'react';
    export interface IconBaseProps extends SVGAttributes<SVGElement> {
      size?: string | number;
      color?: string;
      title?: string;
    }
    
    export type IconType = ComponentType<IconBaseProps>;
    
    export const FaUser: IconType;
    export const FaStar: IconType;
    export const FaComment: IconType;
    export const FaFileAlt: IconType;
    export const FaEnvelope: IconType;
    export const FaWhatsapp: IconType;
    export const FaDribbble: IconType;
    export const FaGithub: IconType;
    export const FaLink: IconType;
    export const FaGit: IconType;
  }
  
  declare module 'react-icons/si' {
    import { ComponentType, SVGAttributes } from 'react';
    export interface IconBaseProps extends SVGAttributes<SVGElement> {
      size?: string | number;
      color?: string;
      title?: string;
    }
    
    export type IconType = ComponentType<IconBaseProps>;
    
    export const SiFigma: IconType;
    export const SiNextdotjs: IconType;
    export const SiTypescript: IconType;
    export const SiJavascript: IconType;
    export const SiTailwindcss: IconType;
    export const SiAdobeaftereffects: IconType;
    export const SiAdobephotoshop: IconType;
    export const SiReact: IconType;
    export const SiNodedotjs: IconType;
    export const SiPrisma: IconType;
    export const SiFastify: IconType;
    export const SiCss3: IconType;
  }
  
  declare module 'react-icons/md' {
    import { ComponentType, SVGAttributes } from 'react';
    export interface IconBaseProps extends SVGAttributes<SVGElement> {
      size?: string | number;
      color?: string;
      title?: string;
    }
    
    export type IconType = ComponentType<IconBaseProps>;
    
    export const MdLanguage: IconType;
  }
  
  declare module 'react-icons/bi' {
    import { ComponentType, SVGAttributes } from 'react';
    export interface IconBaseProps extends SVGAttributes<SVGElement> {
      size?: string | number;
      color?: string;
      title?: string;
    }
    
    export type IconType = ComponentType<IconBaseProps>;
    
    export const BiMoon: IconType;
  }