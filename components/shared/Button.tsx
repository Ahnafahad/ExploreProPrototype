import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick,
  className = ''
}) => {
  const baseStyles = 'font-semibold transition-all active:scale-95 cursor-pointer';

  const variantStyles = {
    primary: 'bg-ios-blue text-white shadow-ios hover:bg-opacity-90',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    outline: 'border-2 border-ios-blue text-ios-blue bg-white hover:bg-gray-50',
    text: 'text-ios-blue bg-transparent hover:bg-gray-100'
  };

  const sizeStyles = {
    sm: 'h-8 px-3 text-sm rounded-[10px]',
    md: 'h-10 px-5 text-[15px] rounded-[10px]',
    lg: 'h-12 px-6 text-[17px] rounded-[14px]'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};
