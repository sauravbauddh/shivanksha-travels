import React from 'react';
import { Icon } from './Icon';

interface RatingProps {
  rating: number; // 0 to 5
  size?: number;
  className?: string;
  showCount?: boolean;
  count?: number;
}

export const Rating = ({
  rating,
  size = 16,
  className = '',
  showCount = false,
  count,
}: RatingProps) => {
  // Generate stars array
  const stars = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;
    if (rating >= value) return 'star';
    if (rating >= value - 0.5) return 'star_half';
    return 'star_border';
  });

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex text-yellow-500">
        {stars.map((star, i) => (
          <Icon key={i} name={star} size={size} filled={true} />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-sm text-text-sub ml-1">({count})</span>
      )}
    </div>
  );
};
