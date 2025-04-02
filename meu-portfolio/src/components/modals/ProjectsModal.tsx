// src/components/modals/ProjectsModal.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({ 
  isOpen, 
  onClose, 
  language 
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-medium dark:text-white">
            {language === 'pt' ? 'Projetos' : 'Projects'}
          </h3>
          <button 
            className="text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
            {language === 'pt' ? 'Em breve...' : 'Coming soon...'}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {language === 'pt' 
              ? 'Novos projetos estão sendo desenvolvidos e serão adicionados em breve.' 
              : 'New projects are being developed and will be added soon.'}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectsModal;