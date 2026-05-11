import React, { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            className={`mt-0.5 w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary/20 focus:ring-4 transition-all cursor-pointer ${className}`}
            {...props}
          />
          <span className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
            {label}
          </span>
        </label>
        {error && (
          <p className="mt-1.5 text-xs text-red-600 ml-8">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
