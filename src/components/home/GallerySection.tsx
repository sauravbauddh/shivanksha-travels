import React from 'react';
import { getSiteContent } from '@/lib/data';
import { GalleryClient } from './GalleryClient';

export const GallerySection = async () => {
  const data = await getSiteContent();
  const gallery = data?.gallerySection;

  if (!gallery || !gallery.galleryItems || gallery.galleryItems.length === 0) {
    return null;
  }

  return <GalleryClient gallery={gallery} />;
};
