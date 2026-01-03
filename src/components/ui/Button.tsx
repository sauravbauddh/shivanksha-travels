import React from 'react';
import { Icon, IconName } from './Icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      isLoading,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-bold transition-all duration-300 rounded-full cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none hover:shadow-lg';

    const variants = {
      primary: 'bg-primary text-black hover:bg-white border border-transparent',
      secondary:
        'bg-surface dark:bg-surface-dark text-text-main dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800',
      ghost:
        'bg-transparent text-text-main dark:text-white hover:text-primary hover:bg-transparent shadow-none hover:shadow-none',
      outline:
        'bg-transparent border border-gray-300 dark:border-white/20 text-text-main dark:text-white hover:border-primary hover:text-primary',
      white: 'bg-white text-black hover:bg-gray-100',
    };

    const sizes = {
      sm: 'px-4 py-1.5 text-xs',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-3 text-base',
      xl: 'px-8 py-4 text-lg md:text-xl',
    };

    const variantStyles = variants[variant];
    const sizeStyles = sizes[size];

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : icon && iconPosition === 'left' ? (
          <Icon name={icon} size={20} className="mr-2" />
        ) : null}

        {children}

        {!isLoading && icon && iconPosition === 'right' && (
          <Icon
            name={icon}
            size={20}
            className="ml-2 group-hover:translate-x-1 transition-transform"
          />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
