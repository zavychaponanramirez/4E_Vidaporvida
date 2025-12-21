import React from 'react';

const Card = ({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}) => {
  const baseClasses = 'rounded-4e shadow-4e border border-gray-100 transition-all duration-300';
  
  const variants = {
    default: 'bg-white',
    primary: 'bg-white border-l-4 border-l-4e-primary',
    purple: 'bg-white border-l-4 border-l-4e-purple',
    elevated: 'bg-white shadow-4e-lg hover:shadow-xl',
  };
  
  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-gray-100 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);

export default Card;