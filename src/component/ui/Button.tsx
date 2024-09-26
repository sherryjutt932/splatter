import React from 'react';

type ButtonProps = {
  variant?: 'default' | 'outline'; // Define button variants
  children: React.ReactNode; // Content to be displayed inside the button
  [key: string]: any; // Allow passing additional props
};

const Button: React.FC<ButtonProps> = ({ variant = 'default', children, ...rest }) => {
  const baseStyles = "text-base font-normal px-6 py-2 rounded-full transition-all duration-300";

  const variantStyles = variant === 'outline'
    ? "hover:bg-white/20 hover:-translate-y-0.5 bg-white/10 border border-splatter-400 backdrop-blur-sm"
    : "hover:opacity-80 hover:-translate-y-0.5 bg-gradient-to-br from-splatter-400 to-splatter-600";

  return (
    <button 
      className={` ${baseStyles} ${variantStyles}`} 
      {...rest} // Spread any additional props
    >
      {children}
    </button>
  );
};

export default Button;
