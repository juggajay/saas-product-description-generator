import React from 'react';
import { useRouter } from 'next/router';

interface TooltipProps {
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
  className?: string;
}

const ContextualHelp: React.FC<TooltipProps> = ({ 
  content, 
  position = 'top', 
  children,
  className = ''
}) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className="group cursor-help">
        {children}
        <div className={`absolute ${positionClasses[position]} hidden group-hover:block z-10 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg`}>
          {content}
          <div className={`absolute ${
            position === 'top' ? 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-800' : 
            position === 'right' ? 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-800' : 
            position === 'bottom' ? 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-800' : 
            'left-full top-1/2 transform -translate-y-1/2 border-l-gray-800'
          } border-solid border-8 border-transparent`}></div>
        </div>
      </div>
    </div>
  );
};

export default ContextualHelp;
