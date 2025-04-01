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
    email: {
      value: string;
      url: string;
    };
    whatsapp: {
      value: string;
      url: string;
    };
    dribbble: {
      value: string;
      url: string;
    };
    github: {
      value: string;
      url: string;
    };
  };
}

export interface Tool {
  name: string;
  icon: React.ReactNode;
}