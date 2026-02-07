import React from 'react';
import { getGalleryImages } from '@/lib/sanity/queries';
import { GalleryClient } from './GalleryClient';

export const GallerySection = async () => {
  const galleryItems = await getGalleryImages();

  if (!galleryItems || galleryItems.length === 0) {
    return null;
  }

  return (
    <GalleryClient
      gallery={{
        title: 'Gallery.',
        subtitle: 'Moments that take your breath away.',
        galleryItems: galleryItems.map(
          (item: {
            _id: string;
            mediaType: 'image' | 'video';
            image?: unknown;
            thumbnail?: unknown;
            videoUrl?: string;
            alt?: string;
            width?: string;
          }) => ({
            ...item,
            _key: item._id, // Use _id as key for independent documents
          })
        ),
      }}
    />
  );
};

