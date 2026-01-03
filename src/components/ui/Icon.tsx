import {
  Mountain,
  Search,
  Menu,
  PlayCircle,
  Users,
  ShieldCheck,
  IndianRupee,
  ArrowRight,
  ChevronRight,
  Star,
  StarHalf,
  MapPin,
  Phone,
  Mail,
  Heart,
  Quote,
  LucideProps,
} from 'lucide-react';

// Map existing icon names to Lucide components
const iconMap = {
  landscape: Mountain,
  search: Search,
  menu: Menu,
  play_circle: PlayCircle,
  diversity_3: Users,
  verified_user: ShieldCheck,
  currency_rupee: IndianRupee,
  arrow_forward: ArrowRight,
  arrow_forward_ios: ChevronRight,
  star: Star,
  star_half: StarHalf,
  star_border: Star, // Lucide doesn't have a distinct 'border' variant prop in the component itself usually, but we can handle fill logic
  location_on: MapPin,
  call: Phone,
  mail: Mail,
  favorite: Heart,
  format_quote: Quote,
};

export type IconName = keyof typeof iconMap | string;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
  filled?: boolean;
}

export const Icon = ({
  name,
  size = 24,
  filled = false,
  className = '',
  ...props
}: IconProps) => {
  const IconComponent = iconMap[name as keyof typeof iconMap];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      className={`${filled ? 'fill-current' : ''} ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
};
