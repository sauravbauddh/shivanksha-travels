'use client';

import { TravelPackage } from '@/types';
import { Star, Check, X, Camera, X as CloseIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { urlFor } from '@/lib/sanity/image';
import { useState } from 'react';
import Image from 'next/image';

export interface PackageDetailsProps {
  packageData: TravelPackage;
  whatsappNumber?: string;
}

export function PackageDetails({ packageData, whatsappNumber = '917668842928' }: PackageDetailsProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine mainImage and gallery for the full gallery view
  const allImages = [
    packageData.mainImage,
    ...(packageData.gallery || [])
  ].filter(Boolean);

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Helper to safely get image URL
  const getImageUrl = (image: any) => {
    try {
      return urlFor(image).url();
    } catch {
      return '/placeholder-image.jpg'; // Fallback
    }
  };

  const locations = packageData.destinations?.map(d => d.name).join(', ') || '';

  return (
    <main className="max-w-[1200px] mx-auto px-6 py-12 pb-24 font-sans text-text-main dark:text-[#f5f5f7] bg-white dark:bg-surface-dark transition-colors duration-300">
      {/* Header */}
      <header className="mb-12 text-center md:text-left animate-fade-in-up">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-text-main dark:text-white mb-4 leading-tight">
              {packageData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-text-sub text-sm font-medium">
              {locations && (
                  <span>{locations}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 h-[500px] md:h-[600px]">
        {/* Main Image */}
        <div 
          className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-3xl"
          onClick={() => openGallery(0)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
               backgroundImage: `url('${getImageUrl(packageData.mainImage)}')` 
            }}
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
        </div>
        
        {/* Secondary Images - Display up to 2 items from gallery if available */}
        {packageData.gallery && packageData.gallery.length > 0 && (
            <div 
                className="relative group cursor-pointer overflow-hidden rounded-3xl"
                onClick={() => openGallery(1)}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                    backgroundImage: `url('${getImageUrl(packageData.gallery[0])}')`
                    }}
                />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            </div>
        )}

        {packageData.gallery && packageData.gallery.length > 1 && (
             <div 
                className="relative group cursor-pointer overflow-hidden rounded-3xl"
                onClick={() => openGallery(2)}
             >
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                    backgroundImage: `url('${getImageUrl(packageData.gallery[1])}')`
                    }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-medium border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm flex items-center gap-2">
                    <Camera size={16} /> View Gallery
                    </span>
                 </div>
                 {/* Always show View Gallery button overlay on the last visible grid item if there are more images */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center md:hidden">
                    <span className="text-white font-medium border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm flex items-center gap-2">
                    <Camera size={16} /> View Gallery
                    </span>
                 </div>
            </div>
        )}
        
        {/* Fallback if no gallery images */}
        {(!packageData.gallery || packageData.gallery.length === 0) && (
             <div className="relative group cursor-pointer overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                 <p className="text-text-sub">No additional images</p>
             </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-16">
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
            </div>
          </section>

          {/* Itinerary */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-text-main dark:text-white">
                Itinerary
              </h2>
            </div>
            <div className="space-y-12 pl-4 border-l border-gray-200 dark:border-gray-800 ml-2">
              {packageData.itinerary?.map((day, index) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute -left-[5px] top-2 size-2.5 bg-black dark:bg-white rounded-full ring-4 ring-white dark:ring-black"></div>
                  <span className="text-xs font-bold text-text-sub uppercase tracking-wider mb-1 block">
                    Day {String(day.dayNumber).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold text-text-main dark:text-white mb-3">
                    {day.title}
                  </h3>
                  <p className="text-text-sub leading-relaxed mb-4">
                    {day.description}
                  </p>
                  {day.meals && day.meals.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {day.meals.map((meal, mealIndex) => (
                        <span
                          key={mealIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-medium rounded-full text-text-sub capitalize"
                        >
                          {meal} Included
                        </span>
                      ))}
                    </div>
                  )}
                  {day.accommodation && (
                    <p className="text-xs text-text-sub mt-2">
                      🏨 {day.accommodation}
                    </p>
                  )}
                </div>
              ))}
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

          {/* Contact for Booking CTA */}
          <section className="bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 rounded-3xl p-10 text-center">
            <h3 className="text-2xl font-semibold text-text-main dark:text-white mb-3">
              Interested in this package?
            </h3>
            <p className="text-text-sub mb-6 max-w-2xl mx-auto">
              Contact us directly to customize this itinerary, get detailed pricing, and book your perfect journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
              <a
                href={`tel:+${whatsappNumber}`} // Assuming the number is full formatting for now, but usually it's better to clean it. Since we are using whatsapp style (91...), tel: might need + prefix. added + just in case.
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-black dark:text-white font-semibold rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-200"
              >
                Call Now
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeGallery}>
            <button 
                onClick={closeGallery} 
                className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
            >
                <CloseIcon size={32} />
            </button>
            
            <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                <button 
                    onClick={prevImage}
                    className="absolute left-0 md:-left-12 p-2 text-white/70 hover:text-white transition-colors"
                >
                    <ChevronLeft size={48} />
                </button>
                
                <div className="relative w-full h-[80vh] cursor-default" onClick={e => e.stopPropagation()}>
                    <Image 
                        src={getImageUrl(allImages[currentImageIndex])} 
                        alt={packageData.title}
                        fill
                        className="object-contain"
                    />
                </div>

                <button 
                    onClick={nextImage}
                    className="absolute right-0 md:-right-12 p-2 text-white/70 hover:text-white transition-colors"
                >
                    <ChevronRight size={48} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                    {currentImageIndex + 1} / {allImages.length}
                </div>
            </div>
        </div>
      )}
    </main>
  );
}
