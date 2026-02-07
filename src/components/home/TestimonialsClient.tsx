'use client';

import React, { useState } from 'react';
import { Star, User, X, Quote } from 'lucide-react';
import { Testimonial } from '@/types/home.types';
import { AnimatePresence, motion } from 'framer-motion';

interface TestimonialsClientProps {
  testimonials: Testimonial[];
}

export const TestimonialsClient = ({ testimonials }: TestimonialsClientProps) => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  // Split testimonials for infinite scroll effect
  const displayTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] text-gray-50 dark:text-white/5 font-serif opacity-50 select-none pointer-events-none">
        "
      </div>

      <div className="w-full relative z-10">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-12 text-center">
          Testimonials
        </h2>

        {/* Infinite Scroll Container */}
        <div className="flex overflow-hidden relative w-full mask-linear-fade">
          <div className="flex gap-6 animate-scroll w-max px-6 hover:[animation-play-state:paused]">
            {displayTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                onClick={() => setSelectedTestimonial(testimonial)}
                className="flex-none w-[350px] md:w-[450px] flex flex-col items-center text-center p-8 rounded-3xl bg-surface dark:bg-surface-dark border border-black/5 dark:border-white/5 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                      }`}
                    />
                  ))}
                </div>

                <p className="font-semibold leading-relaxed text-text-main dark:text-white mb-8 text-lg md:text-xl line-clamp-4">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  {testimonial.image ? (
                    <img
                      alt={testimonial.name}
                      src={testimonial.image}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-sm font-bold text-text-main dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-text-sub">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal - only render if selectedTestimonial is present */}
      <AnimatePresence>
        {selectedTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-surface-dark rounded-3xl p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-text-main dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <Quote className="w-12 h-12 text-primary/20 mb-6 fill-primary/20" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < selectedTestimonial.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xl md:text-2xl font-medium leading-relaxed text-text-main dark:text-white mb-10">
                  "{selectedTestimonial.quote}"
                </p>

                <div className="flex flex-col items-center gap-4">
                  {selectedTestimonial.image ? (
                    <img
                      alt={selectedTestimonial.name}
                      src={selectedTestimonial.image}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-gray-50 dark:ring-white/5"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center ring-4 ring-gray-50 dark:ring-white/5">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-bold text-text-main dark:text-white">
                      {selectedTestimonial.name}
                    </p>
                    <p className="text-sm text-text-sub">
                      {selectedTestimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
