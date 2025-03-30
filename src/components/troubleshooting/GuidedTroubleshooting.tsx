import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface GuidedTroubleshootingProps {
  title: string;
  steps: {
    question: string;
    options: {
      text: string;
      nextStep?: number;
      solution?: string;
      action?: () => void;
    }[];
  }[];
  onComplete?: (path: string[]) => void;
  className?: string;
}

const GuidedTroubleshooting: React.FC<GuidedTroubleshootingProps> = ({
  title,
  steps,
  onComplete,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [path, setPath] = useState<string[]>([]);
  const [solution, setSolution] = useState<string | null>(null);
  
  const handleOptionClick = (option: any, optionText: string) => {
    // Add to path
    setPath([...path, optionText]);
    
    // If there's a solution, show it
    if (option.solution) {
      setSolution(option.solution);
      if (onComplete) {
        onComplete([...path, optionText]);
      }
      return;
    }
    
    // If there's an action, execute it
    if (option.action) {
      option.action();
    }
    
    // Move to next step if specified
    if (typeof option.nextStep === 'number') {
      setCurrentStep(option.nextStep);
    }
  };
  
  const resetTroubleshooting = () => {
    setCurrentStep(0);
    setPath([]);
    setSolution(null);
  };
  
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      
      {/* Path breadcrumbs */}
      {path.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <button 
              onClick={resetTroubleshooting}
              className="text-blue-600 hover:text-blue-800"
            >
              Start
            </button>
            {path.map((step, index) => (
              <React.Fragment key={index}>
                <svg className="mx-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>{step}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      
      {solution ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Solution Found</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>{solution}</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={resetTroubleshooting}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">{steps[currentStep].question}</h3>
          </div>
          
          <div className="space-y-3">
            {steps[currentStep].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option, option.text)}
                className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {option.text}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GuidedTroubleshooting;
