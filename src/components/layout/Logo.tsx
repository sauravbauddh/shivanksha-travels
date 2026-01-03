import { Icon } from '@/components/ui/Icon';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export const Logo = ({ className = '', variant = 'dark' }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <Icon
        name="landscape"
        size={24}
        className={
          variant === 'light' ? 'text-white' : 'text-text-main dark:text-white'
        }
      />
      <span
        className={`font-semibold tracking-tight text-sm md:text-base ${variant === 'light' ? 'text-white' : 'text-text-main dark:text-white'}`}
      >
        Shivanksha Travels
      </span>
    </div>
  );
};
