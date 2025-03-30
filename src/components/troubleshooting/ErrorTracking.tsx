import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface ErrorTrackingProps {
  errorMessage: string;
  errorCode?: string;
  componentStack?: string;
  userId?: string;
  metadata?: Record<string, any>;
  onReport?: (data: any) => void;
}

const ErrorTracking: React.FC<ErrorTrackingProps> = ({
  errorMessage,
  errorCode,
  componentStack,
  userId,
  metadata = {},
  onReport
}) => {
  const [isReported, setIsReported] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Automatically report errors to the backend
  useEffect(() => {
    if (!isReported) {
      reportError();
    }
  }, []);
  
  const reportError = async () => {
    try {
      // In a real app, this would send the error to a backend service
      // or a third-party error tracking service like Sentry
      const errorData = {
        message: errorMessage,
        code: errorCode,
        stack: componentStack,
        userId,
        metadata,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      console.error('Error tracked:', errorData);
      
      // Call the onReport callback if provided
      if (onReport) {
        onReport(errorData);
      }
      
      setIsReported(true);
    } catch (err) {
      console.error('Failed to report error:', err);
    }
  };
  
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {errorCode ? `Error ${errorCode}: ` : ''}
            {errorMessage}
          </h3>
          
          {isReported && (
            <p className="text-xs text-red-700 mt-1">
              This error has been automatically reported to our team.
            </p>
          )}
          
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-red-700 hover:text-red-600 font-medium focus:outline-none"
            >
              {isExpanded ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          
          {isExpanded && (
            <div className="mt-2 text-sm text-red-700">
              {errorCode && (
                <div className="mb-2">
                  <strong>Error Code:</strong> {errorCode}
                </div>
              )}
              
              {componentStack && (
                <div className="mb-2">
                  <strong>Stack Trace:</strong>
                  <pre className="mt-1 text-xs bg-red-100 p-2 rounded overflow-x-auto">
                    {componentStack}
                  </pre>
                </div>
              )}
              
              {Object.keys(metadata).length > 0 && (
                <div>
                  <strong>Additional Information:</strong>
                  <pre className="mt-1 text-xs bg-red-100 p-2 rounded overflow-x-auto">
                    {JSON.stringify(metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorTracking;
