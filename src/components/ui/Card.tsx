import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'glass' | 'dark' | 'features';
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = '',
      variant = 'white',
      hoverEffect = true,
      ...props
    },
    ref
  ) => {
    const variants = {
      white: 'bg-white dark:bg-surface-dark',
      glass: 'bg-white/10 backdrop-blur-md border border-white/20',
      dark: 'bg-surface-dark dark:bg-black',
      features: 'bg-white dark:bg-surface-dark text-center group',
    };

    const hoverStyles = hoverEffect
      ? 'hover:shadow-lg transition-all duration-300'
      : '';

    return (
      <div
        ref={ref}
        className={`rounded-3xl p-8 shadow-sm ${variants[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
