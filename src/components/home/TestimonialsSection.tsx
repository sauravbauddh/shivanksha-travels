import React from 'react';
import { getTestimonials } from '@/lib/data';
import { TestimonialsClient } from './TestimonialsClient';

export const TestimonialsSection = async () => {
  const testimonials = await getTestimonials();

  return <TestimonialsClient testimonials={testimonials} />;
};
