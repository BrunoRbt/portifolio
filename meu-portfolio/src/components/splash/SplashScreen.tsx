// src/components/splash/SplashScreen.tsx - Versão melhorada
import React, { useState, useEffect } from 'react';
import apiGif from '../../assets/1726750227521.gif'; // Ajuste o caminho conforme necessário

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number; // Duração em milissegundos
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  duration = 3500 // Aumentei um pouco para melhor experiência
}) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Mostra o texto depois de um curto atraso para efeito
    const textTimer = setTimeout(() => {
      setTextVisible(true);
    }, 800);
    
    // Inicia o fade out um pouco antes do fim
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 800);

    // Tempo total para remover o splash screen
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    // Limpeza dos timers
    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`} 
      style={{ backdropFilter: 'blur(5px)' }}
    >
      <div className="relative flex flex-col items-center">
        {/* GIF centralizado */}
        <div className="overflow-hidden rounded-lg shadow-2xl">
          <img 
            src={apiGif} 
            alt="Loading..." 
            className="max-w-full h-auto"
            style={{ maxHeight: '70vh' }}
          />
        </div>
        
        {/* Nome e título profissional com aparecimento suave */}
        <div 
          className={`mt-8 text-center text-white transition-all duration-1000 transform ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Bruno Roberto</h1>
          <p className="text-lg md:text-2xl text-gray-300">Full Stack Python Developer</p>
          
          <div className="mt-6 text-sm text-gray-400">
            <p className="animate-pulse">Carregando portfólio...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;