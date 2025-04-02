// src/components/pdf/PdfThumbnail.tsx
import React from 'react';
import pdfThumbnail1 from '../../assets/pdf-thumbnails/thumbnail1.jpg'; // Ajuste o caminho conforme necessário

interface PdfThumbnailProps {
  onClick: () => void;
  index: number;
  isActive?: boolean;
}

const PdfThumbnail: React.FC<PdfThumbnailProps> = ({ onClick, index, isActive = false }) => {
  // Você pode adicionar várias imagens de thumbnail e selecionar com base no índice
  // ou passar a imagem como prop
  
  return (
    <div 
      className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${isActive ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={pdfThumbnail1} 
          alt={`PDF thumbnail ${index}`} 
          className="rounded-md shadow-md w-full"
        />
        <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
          {index}
        </div>
      </div>
    </div>
  );
};

export default PdfThumbnail;