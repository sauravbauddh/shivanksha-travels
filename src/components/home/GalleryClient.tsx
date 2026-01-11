'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';

interface GalleryItem {
  mediaType: 'image' | 'video';
  image?: string;
  thumbnail?: string;
  videoUrl?: string;
  alt?: string;
  width?: string;
  _key: string;
}

interface GalleryClientProps {
  gallery: {
    title: string;
    subtitle?: string;
    galleryItems: GalleryItem[];
  };
}

export const GalleryClient = ({ gallery }: GalleryClientProps) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);

  // Duplicate items for seamless infinite scroll
  // We need enough duplicates to fill the screen and then some to allow for the loop
  const displayItems = [
    ...gallery.galleryItems,
    ...gallery.galleryItems,
    ...gallery.galleryItems,
    ...gallery.galleryItems,
  ];

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    // Only restore scrolling if grid is not open
    if (!isGridOpen) {
      document.body.style.overflow = 'auto';
    }
  };

  const openGrid = () => {
    setIsGridOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGrid = () => {
    setIsGridOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-24 bg-white dark:bg-black overflow-hidden select-none">
      <div className="max-w-[1200px] mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-text-main dark:text-white mb-2">
            {gallery.title || 'Gallery.'}
          </h2>
          {gallery.subtitle && (
            <p className="text-xl text-text-sub">{gallery.subtitle}</p>
          )}
        </div>

        <button
          onClick={openGrid}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
        >
          <Icon name="grid_view" size={18} />
          <span className="font-medium text-sm">View All</span>
        </button>
      </div>

      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className="flex gap-4 animate-marquee"
          style={{
            animationPlayState: isHovering ? 'paused' : 'running',
            width: 'max-content',
          }}
        >
          {displayItems.map((item, index) => (
            <div
              key={`${item._key}-${index}`}
              className={`relative flex-shrink-0 overflow-hidden rounded-2xl ${
                item.width || 'w-80'
              } h-[400px] bg-gray-100 dark:bg-gray-800 cursor-pointer group`}
              onClick={() => openLightbox(item)}
            >
              {item.mediaType === 'video' && item.videoUrl ? (
                <div className="w-full h-full relative">
                  <video
                    src={item.videoUrl}
                    poster={
                      item.thumbnail || undefined
                    }
                    className="w-full h-full object-cover"
                    muted
                    loop
                    preload="auto"
                    playsInline
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon
                        name="play_arrow"
                        className="text-white"
                        size={32}
                      />
                    </div>
                  </div>
                </div>
              ) : item.image ? (
                <Image
                  src={item.image}
                  alt={item.alt || 'Gallery Image'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  draggable={false}
                />
              ) : null}

              <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-black/0 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Grid Modal */}
      {isGridOpen && (
        <div className="fixed inset-0 z-[5000] bg-white dark:bg-black animate-in fade-in duration-300 flex flex-col">
          {/* Fixed Header */}
          <div className="flex-none px-6 py-4 flex justify-between items-center bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 z-[5010]">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
              Gallery
            </h2>
            <button
              onClick={closeGrid}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              aria-label="Close Gallery"
            >
              <Icon name="close" size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24">
            <div className="max-w-[1400px] mx-auto min-h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[300px]">
                {gallery.galleryItems.map((item) => (
                  <div
                    key={item._key}
                    className={`relative rounded-xl overflow-hidden cursor-pointer group bg-gray-100 dark:bg-gray-800 ${
                      item.width === 'aspect-video' ? 'md:col-span-2' : ''
                    } ${item.width === 'w-[500px]' ? 'md:col-span-2' : ''}`}
                    onClick={() => openLightbox(item)}
                  >
                    {item.mediaType === 'video' && item.videoUrl ? (
                      <div className="w-full h-full relative">
                        <video
                          src={item.videoUrl}
                          poster={
                            item.thumbnail
                              ? item.thumbnail
                              : undefined
                          }
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                          <Icon
                            name="play_arrow"
                            className="text-white"
                            size={32}
                          />
                        </div>
                      </div>
                    ) : item.image ? (
                      <Image
                        src={item.image}
                        alt={item.alt || 'Gallery Image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[6000] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[6010]"
          >
            <Icon name="close" size={32} />
          </button>

          <div
            className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center p-4 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.mediaType === 'video' && selectedItem.videoUrl ? (
              <video
                src={selectedItem.videoUrl}
                className="max-w-full max-h-full rounded-md shadow-2xl"
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
              />
            ) : selectedItem.image ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.alt || 'Full View'}
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-full object-contain rounded-md"
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
};
