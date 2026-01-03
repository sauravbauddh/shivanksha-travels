import React from 'react';
import { Icon, IconName } from './Icon';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconName;
  containerClassName?: string;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className = '', containerClassName = '', ...props }, ref) => {
    return (
      <div className={`relative flex items-center ${containerClassName}`}>
        {icon && (
          <div className="absolute left-4 text-text-sub pointer-events-none flex items-center">
            <Icon name={icon} size={20} />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full bg-white/10 border border-white/20 text-white placeholder-gray-400
            rounded-full py-4 text-base outline-none transition-all
            focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm
            ${icon ? 'pl-12' : 'px-6'}
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
