import React from 'react';
import { getTestimonials } from '@/lib/data';
import { Star } from 'lucide-react';

export const TestimonialsSection = async () => {
  const testimonials = await getTestimonials();

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
          {/* Add a mask for smooth edges if possible, otherwise just overflow-hidden */}
          <div className="flex gap-6 animate-scroll w-max px-6 hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-none w-[350px] md:w-[450px] flex flex-col items-center text-center p-8 rounded-3xl bg-surface dark:bg-surface-dark border border-black/5 dark:border-white/5"
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
                  <img
                    alt={testimonial.name}
                    src={testimonial.image}
                    className="w-12 h-12 rounded-full object-cover"
                  />
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
    </section>
  );
};
