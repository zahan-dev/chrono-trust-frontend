import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  target,
  rel,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-[#2d5b8f] text-white hover:bg-[#1e3a5f] focus:ring-[#2d5b8f]/50 shadow-[0_4px_14px_rgba(45,91,143,0.2)] hover:shadow-[0_6px_20px_rgba(30,58,95,0.3)] hover:-translate-y-0.5 rounded-full',
    secondary: 'bg-white text-primary hover:bg-slate-50 hover:text-black focus:ring-slate-500 shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] rounded-full hover:-translate-y-0.5',
    outline: 'border-2 border-white/80 text-black hover:bg-white hover:text-black focus:ring-white/50 rounded-full hover:-translate-y-0.5 shadow-sm hover:shadow-[0_4px_14px_rgba(255,255,255,0.2)] backdrop-blur-sm',
  };
  
  const sizes = {
    sm: 'px-5 py-2.5 text-xs tracking-wider uppercase',
    md: 'px-8 py-3.5 text-sm tracking-wider uppercase',
    lg: 'px-10 py-4 text-sm tracking-wider uppercase',
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
