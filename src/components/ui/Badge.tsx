import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark' | 'primary';
}

export const Badge = ({
  children,
  className = '',
  variant = 'light',
  ...props
}: BadgeProps) => {
  const variants = {
    light: 'bg-white/90 dark:bg-black/80 text-text-main dark:text-white',
    dark: 'bg-black/70 text-white',
    primary: 'bg-primary text-black',
  };

  return (
    <div
      className={`
        backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
        ${variants[variant]} ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
