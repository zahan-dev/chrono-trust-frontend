import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const hoverStyles = hover ? 'hover:shadow-sm hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div className={`bg-white border border-slate-100 rounded-sm overflow-hidden ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};
