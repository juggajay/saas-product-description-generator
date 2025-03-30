import React from 'react';

type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'gray' | 'white';
  className?: string;
  text?: string;
};

const LoadingSpinner = ({
  size = 'md',
  color = 'blue',
  className = '',
  text
}: LoadingSpinnerProps) => {
  const sizeStyles = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };
  
  const colorStyles = {
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    white: 'border-white',
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full ${sizeStyles[size]} border-t-transparent ${colorStyles[color]}`}></div>
      {text && <p className="mt-2 text-sm text-gray-500">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
