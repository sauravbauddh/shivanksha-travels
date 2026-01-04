interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  logoUrl?: string | null;
}

export const Logo = ({
  className = '',
  variant = 'dark',
  logoUrl,
}: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 cursor-pointer ${className}`}>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="Shivanksha Travels"
          className="h-8 w-auto object-contain"
        />
      ) : (
        <span /> // Fallback or empty if no logo yet
      )}
      <span
        className={`font-semibold tracking-tight text-sm md:text-base ${variant === 'light' ? 'text-white' : 'text-text-main dark:text-white'}`}
      >
        Shivanksha Travels
      </span>
    </div>
  );
};
