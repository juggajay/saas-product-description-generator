import React from 'react';

type TooltipProps = {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
};

const Tooltip = ({
  children,
  content,
  position = 'top',
  className = '',
}: TooltipProps) => {
  const positionStyles = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };
  
  const arrowStyles = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-800 border-l-transparent border-r-transparent border-b-transparent',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-800 border-t-transparent border-b-transparent border-l-transparent',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-800 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-800 border-t-transparent border-b-transparent border-r-transparent',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className="tooltip-container">
        {children}
        <div className={`absolute invisible opacity-0 z-10 w-48 bg-gray-800 text-white text-sm rounded-md p-2 transition-opacity duration-300 group-hover:visible group-hover:opacity-100 ${positionStyles[position]}`}>
          {content}
          <div className={`absolute w-0 h-0 border-4 ${arrowStyles[position]}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
