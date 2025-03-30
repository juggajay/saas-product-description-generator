import React from 'react';

type TagInputProps = {
  id: string;
  label?: string;
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  tooltip?: string;
  placeholder?: string;
};

const TagInput = ({
  id,
  label,
  tags,
  onAddTag,
  onRemoveTag,
  error,
  required = false,
  disabled = false,
  className = '',
  tooltip,
  placeholder = 'Add a tag...',
}: TagInputProps) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <div className="flex items-center mb-1">
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {tooltip && (
            <div className="tooltip ml-2">
              <span className="text-gray-400 hover:text-gray-500 cursor-help">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span className="tooltip-text">{tooltip}</span>
            </div>
          )}
        </div>
      )}
      
      <div className={`flex flex-wrap p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500`}>
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center bg-blue-100 text-blue-800 text-sm rounded-full px-3 py-1 m-1">
            <span>{tag}</span>
            {!disabled && (
              <button
                type="button"
                onClick={() => onRemoveTag(index)}
                className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          disabled={disabled}
          className="flex-grow min-w-[120px] outline-none border-none p-1 text-sm"
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      <p className="mt-1 text-xs text-gray-500">
        Press Enter to add a tag
      </p>
    </div>
  );
};

export default TagInput;
