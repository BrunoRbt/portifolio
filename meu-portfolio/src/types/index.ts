// src/types/index.ts
import React from 'react';

export interface ProfileData {
  name: string;
  title: string;
  about: {
    intro: string;
    freelance: string;
    contact: string;
  };
  contacts: {
    email: string;
    whatsapp: string;
    dribbble: string;
    github: string;
  };
}

export interface Tool {
  name: string;
  icon: React.ReactNode;
}