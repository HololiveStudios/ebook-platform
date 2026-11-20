import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  onClick
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverClass = hover ? 'hover:shadow-xl transition-shadow duration-300' : '';
  const cursorClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`
        bg-white rounded-xl shadow-lg
        ${paddingClasses[padding]}
        ${hoverClass}
        ${cursorClass}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};