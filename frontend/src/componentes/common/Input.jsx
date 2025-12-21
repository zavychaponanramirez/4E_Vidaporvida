import React from 'react';

const Input = ({ 
  label,
  error,
  helperText,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-4e border 
          ${error ? 'border-red-500' : 'border-gray-300'}
          focus:border-4e-primary focus:ring-2 focus:ring-4e-primary-light
          focus:outline-none transition-colors duration-300
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;