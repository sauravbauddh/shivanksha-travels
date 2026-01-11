import { PackageDetails } from '@/components/packages/PackageDetails';
import { TravelPackage } from '@/types';

// Mock Data based on the provided HTML snippet
const mockPackageData: TravelPackage & {
  subtitle?: string;
  rating: number;
  reviewCount: number;
  locations: string[];
  groupSize?: string;
  guideLanguages?: string[];
  transport?: string;
  count?: string;
  dates?: {
    available: boolean;
    startDates?: string[];
  };
  discountedPrice?: number;
} = {
  _id: '1',
  title: 'Divine Uttarakhand: 5 Days of Bliss.',
  subtitle: 'Premium Collection',
  slug: { current: 'divine-uttarakhand' },
  description:
    'Immerse yourself in the spiritual aura and breathtaking landscapes of Uttarakhand. This 5-day journey takes you through the holy cities of Haridwar and Rishikesh, where the Ganges flows with pristine clarity, and up to the misty heights of Mussoorie. It’s not just a tour; it’s a reconnection with nature.',
  mainImage: {
    _type: 'image',
    asset: {
      _ref: 'image-ref', // Placeholder, component uses hardcoded URL for now
      _type: 'reference',
    },
  },
  duration: '5 Days',
  price: 15999,
  discountedPrice: 22999,
  rating: 4.9,
  reviewCount: 120,
  locations: ['Haridwar', 'Rishikesh', 'Mussoorie'],
  groupSize: 'Max 12',
  guideLanguages: ['English', 'Hindi'],
  transport: 'Private SUV',
  inclusions: [
    '3-star hotels (Double Sharing)',
    'Daily Breakfast & Dinner',
    'Private AC Sedan/SUV',
  ],
  exclusions: [
    'Lunch & Extra Meals',
    'Entry fees & Tickets',
    'Airfare / Train fare',
  ],
  itinerary: [
    // This is just structural mock, the component currently has hardcoded itinerary content as per snippet
    // In a real scenario, this would populate the itinerary section
  ],
};

export default function PackageDemo() {
  return (
    <div>
      <PackageDetails packageData={mockPackageData} />
    </div>
  );
}
