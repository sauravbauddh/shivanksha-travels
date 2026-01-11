import { TravelPackage } from '@/types';
import { Star, Share2, Heart, Check, X, ChevronDown } from 'lucide-react';


export interface PackageDetailsProps {
  packageData: TravelPackage & {
    subtitle?: string;
    rating: number;
    reviewCount: number;
    locations: string[];
    groupSize?: string;
    guideLanguages?: string[];
    transport?: string;
    dates?: {
      available: boolean;
      startDates?: string[];
    };
    discountedPrice?: number;
  };
}

export function PackageDetails({ packageData }: PackageDetailsProps) {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-12 pb-24 font-sans text-text-main dark:text-[#f5f5f7] bg-white dark:bg-surface-dark transition-colors duration-300">
      {/* Header */}
      <header className="mb-12 text-center md:text-left animate-fade-in-up">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            {packageData.subtitle && (
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                {packageData.subtitle}
              </p>
            )}
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-text-main dark:text-white mb-4 leading-tight">
              {packageData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-text-sub text-sm font-medium">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-text-main dark:text-white">
                  {packageData.rating}
                </span>{' '}
                ({packageData.reviewCount} reviews)
              </span>
              <span>•</span>
              <span>{packageData.locations.join(', ')}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 h-[500px] md:h-[600px]">
        {/* Main Image */}
        <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-3xl">
           {/* Note: In a real app we'd use Next.js Image with sanity URL builder here. For now using div bg as per snippet or need a helper */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
               // Placeholder logic - assuming asset._ref or similar is standard, but the snippet used direct URLs.
               // We will need a way to resolved Sanity images. For now, we might checking if mainImage has a custom url property or just rely on what's passed.
               // Actually the Types say SanityImage.
               backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5fBeHelf2zHXWspWSTFQTV88G7IlqiinhVu6AVgXPSN0Gp8CmTqUCw6zmdEQJ1oHcdziMyptPiQjNjbBwImyhE8vWNJ-3Doy0UdACXOWLoIHSunc0L8uKqJwje93u8RAhiN56Gs4lolwrLVKP4OCMUIt54OT9v3KJVgCqVoCOGJzrA1JDvpS11vyi_e9-xT1Jf9kxIeNOLcB9qd07QnAN6RhRFZRWEAEhvNCncD3jHofpH18faljBmppbCN2BcITQwxJldzdeJX14')` 
            }}
          />
          <div className="absolute bottom-6 left-6 text-white z-10">
            <p className="text-sm font-medium opacity-90">Morning Mist</p>
            <p className="text-lg font-semibold">Mussoorie Hills</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
        
        {/* Secondary Images - Hardcoding placeholders as per snippet for structure first */}
        <div className="relative group cursor-pointer overflow-hidden rounded-3xl">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBoqZs1xRNno8p0akZwnTeBntQWNHxIpmzoqAxgHWqaFHDHIFeUZ5pu3v6ltCiSu9R9faWLqQFrvijrjMS6o5UdEKf3g4YEbqoNWg3g0GcZx6uobvNx-4YcPXF-jsrYDIg99YQTXdYKjL-SxJgte60f1993HXKCxOxRVLKJXTNGMY43P_V6pBiVzKy-y1QDqszIdLDJmEGJDITwVRIp44j4JUGD22VWIILEPxNyNZwtIEAX8oxAbSZlw4rQMYFr_d8TcDXbN7SvTtzp')`
            }}
          />
        </div>
        <div className="relative group cursor-pointer overflow-hidden rounded-3xl">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAkV_LoVMkDhyHuuPCG1tI_I6jsyToIzydHWg9NCeAXVISQ8vhGgtydJR6NZdEFjJ9VLQ9kGOjQGilv1_65VNBh-dagDLWiGJVrSuSSmH6pf31PVEbYhnBuCT9noe0RwVUe0HK5z7R6jAMMdRvb4-Ic_jwwaBBF9JlMuqmquWKHsZcuAUWGsWvYNfC_QhWkjH9OUcoPvpq8fxTE2WAjZofV7IYa4HWeKcdm2slwZOMXpMt_gZgpX465TKx4b8cApW4vErJUiiv0Ll05')`
            }}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white font-medium border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm">
              View Gallery
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        <div className="lg:col-span-8 flex flex-col gap-16">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-semibold text-text-main dark:text-white mb-6">
              Overview
            </h2>
            <p className="text-xl leading-relaxed text-text-sub font-light">
              {packageData.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 border-t border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-xs text-text-sub uppercase font-semibold mb-1">
                  Duration
                </p>
                <p className="font-medium text-text-main dark:text-white">
                  {packageData.duration}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-sub uppercase font-semibold mb-1">
                  Group Size
                </p>
                <p className="font-medium text-text-main dark:text-white">
                  {packageData.groupSize}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-sub uppercase font-semibold mb-1">
                  Guide
                </p>
                <p className="font-medium text-text-main dark:text-white">
                  {packageData.guideLanguages?.join(', ')}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-sub uppercase font-semibold mb-1">
                  Transport
                </p>
                <p className="font-medium text-text-main dark:text-white">
                  {packageData.transport}
                </p>
              </div>
            </div>
          </section>

          {/* Itinerary */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-text-main dark:text-white">
                Itinerary
              </h2>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                Download PDF
              </a>
            </div>
            <div className="space-y-12 pl-4 border-l border-gray-200 dark:border-gray-800 ml-2">
              {/* Hardcoded Itinerary Items for now based on snippet - normally would map over packageData.itinerary */}
              <div className="relative pl-8">
                <div className="absolute -left-[5px] top-2 size-2.5 bg-black dark:bg-white rounded-full ring-4 ring-white dark:ring-black"></div>
                <span className="text-xs font-bold text-text-sub uppercase tracking-wider mb-1 block">
                  Day 01
                </span>
                <h3 className="text-lg font-semibold text-text-main dark:text-white mb-3">
                  Arrival in Dehradun & Transfer to Mussoorie
                </h3>
                <p className="text-text-sub leading-relaxed mb-4">
                  Pickup from Dehradun airport/railway station. Drive to
                  Mussoorie. En-route visit Dehradun Zoo. Check-in at hotel and
                  evening walk at Mall Road.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-medium rounded-full text-text-sub">
                    Dinner Included
                  </span>
                </div>
              </div>
              {/* More items would go here */}
              <button className="ml-8 text-sm font-medium text-text-main dark:text-white border-b border-black dark:border-white pb-0.5 hover:opacity-70">
                View Full Itinerary
              </button>
            </div>
          </section>

           {/* Inclusions */}
           <section className="bg-gray-50 dark:bg-surface-dark rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-text-main dark:text-white mb-8">
              What&apos;s Included
            </h2>
            <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-text-sub uppercase tracking-wide">
                  In the package
                </h4>
                <ul className="space-y-3">
                  {packageData.inclusions?.map((inc, i) => (
                     <li key={i} className="flex items-start gap-3 text-text-main dark:text-gray-200 text-sm">
                     <Check className="w-5 h-5 text-green-600" />
                     <span>{inc}</span>
                   </li>
                  ))}
                </ul>
              </div>
               <div className="space-y-4">
                <h4 className="font-medium text-sm text-text-sub uppercase tracking-wide">
                  Not Included
                </h4>
                <ul className="space-y-3">
                   {packageData.exclusions?.map((exc, i) => (
                     <li key={i} className="flex items-start gap-3 text-text-sub text-sm">
                     <X className="w-5 h-5 text-gray-400" />
                     <span>{exc}</span>
                   </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-800">
              <div className="mb-6">
                <p className="text-sm text-text-sub mb-1">Price per person</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-text-main dark:text-white">
                    ₹{packageData.price.toLocaleString()}
                  </span>
                  {packageData.discountedPrice && (
                    <span className="text-lg text-text-sub line-through">
                      ₹{packageData.discountedPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <form className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-sub uppercase ml-1">
                    Dates
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-gray-50 dark:bg-black/20 border-0 rounded-2xl py-4 px-4 text-text-main dark:text-white focus:ring-2 focus:ring-blue-500 text-sm font-medium cursor-pointer"
                      type="date"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-sub uppercase ml-1">
                    Travelers
                  </label>
                  <div className="relative">
                    <button
                      className="w-full flex items-center justify-between bg-gray-50 dark:bg-black/20 rounded-2xl py-4 px-4 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-black/40 transition-colors text-left"
                      type="button"
                    >
                      <span className="text-sm font-medium">2 Adults</span>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-sub uppercase ml-1">Room Class</label>
                    <div className="grid grid-cols-2 gap-3">
                        <label className="cursor-pointer relative">
                            <input type="radio" name="room" className="peer sr-only" defaultChecked />
                            <div className="rounded-2xl border-2 border-transparent bg-gray-50 dark:bg-black/20 p-4 text-center hover:bg-gray-100 dark:hover:bg-black/30 peer-checked:border-blue-500 peer-checked:bg-blue-50/50 dark:peer-checked:bg-blue-900/20 transition-all">
                                <span className="block text-sm font-semibold">Standard</span>
                            </div>
                        </label>
                         <label className="cursor-pointer relative">
                            <input type="radio" name="room" className="peer sr-only" />
                            <div className="rounded-2xl border-2 border-transparent bg-gray-50 dark:bg-black/20 p-4 text-center hover:bg-gray-100 dark:hover:bg-black/30 peer-checked:border-blue-500 peer-checked:bg-blue-50/50 dark:peer-checked:bg-blue-900/20 transition-all">
                                <span className="block text-sm font-semibold">Deluxe</span>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="pt-4 pb-2">
                  <button
                    className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold text-base py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-black/10"
                    type="button"
                  >
                    Book Now
                  </button>
                  <p className="text-center text-[10px] text-text-sub mt-3">
                    Free cancellation up to 48h before trip.
                  </p>
                </div>
              </form>
               <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gray-200 overflow-hidden" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDriZu6FulpOJmiOmi-_4lo5-Trhn3L3DM1QqU9g5lldpNn9TzRXk7d53GcqzwsVQ95qV6iSJV3hvETP-GnWhBFNzDZttkbdv-LSTne2Ir_eSHEeGRQaYEc5G1kFNBLcuuMvwTFbQz5pv7CDTBlaowDUK4IzPiTr5-6M7Ng_3tQvRZ5RjQYKqKCl7jII5eJabpxijbL6XFCXhFowePUKqbVC3nolo6nZkP1-WTjYuTbk1sPQtUt1sja7qj7Hz9M2Fn_dDoMp_Ms4xeE')`, backgroundSize: 'cover' }}></div>
                    <div>
                        <p className="text-xs text-text-sub font-medium">Operated by</p>
                        <p className="text-sm font-semibold text-text-main dark:text-white">Himalayan Adventures</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
