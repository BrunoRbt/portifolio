import React, { useState } from 'react';

interface HeaderProps {
  name: string;
  title: string;
  backgroundImage: string;
  profileImage: string;
}

const Header: React.FC<HeaderProps> = ({ 
  name, 
  title, 
  backgroundImage, 
  profileImage 
}) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <>
      <div className="w-full relative mb-24">
        <div 
          className="h-60 rounded-xl overflow-hidden relative bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            filter: 'brightness(0.7)' // Reduz o brilho para melhor legibilidade do texto
          }}
        >
          <div className="absolute inset-0 flex justify-between items-center px-12 md:px-16 text-white">
            <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Web Designer</h2>
            <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Web Developer</h2>
          </div>
        </div>
        
        <div className="absolute -bottom-16 left-6 flex gap-6 items-end">
          <div 
            className="bg-gradient-to-br from-[#000428] via-[#004e92] to-[#000428] rounded-full p-2 shadow-lg cursor-pointer"
            onClick={openImageModal}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
              <img 
                src={profileImage} 
                alt={name} 
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-gray-600 text-lg">{title}</p>
          </div>
        </div>
      </div>

      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4"
          onClick={closeImageModal}
        >
          <div className="w-[500px] h-[500px] flex items-center justify-center">
            <img 
              src={profileImage} 
              alt={name} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;