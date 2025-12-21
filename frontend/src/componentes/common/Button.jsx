import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'rounded-4e font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-4e-primary text-white hover:bg-4e-primary-light focus:ring-4e-primary',
    secondary: 'bg-4e-purple text-white hover:bg-4e-purple-light focus:ring-4e-purple',
    outline: 'border-2 border-4e-primary text-4e-primary hover:bg-4e-primary hover:text-white focus:ring-4e-primary',
    ghost: 'text-4e-primary hover:bg-4e-primary/10 focus:ring-4e-primary',
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2.5',
    large: 'px-6 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;