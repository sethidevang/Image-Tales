'use client';

import React from 'react';

interface TickerProps {
  text: string;
  className?: string;
}

export const Ticker: React.FC<TickerProps> = ({ text, className = "" }) => {
  return (
    <div className={`w-full overflow-hidden whitespace-nowrap bg-neo-black text-neo-white py-4 border-y-4 border-black ${className}`}>
      <div className="inline-block animate-ticker">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="text-2xl md:text-4xl font-black uppercase mx-8">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
