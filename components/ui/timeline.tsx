"use client";
import React from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  cta?: React.ReactNode;
}

export const Timeline = ({ data, cta }: TimelineProps) => {
  const fontFamily = 'Satoshi, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  return (
    <div className="w-full bg-gray-50 md:px-10 overflow-hidden" style={{ fontFamily }}>
      <div className="max-w-4xl mx-auto pt-12 sm:pt-20 pb-6 sm:pb-8 px-4 md:px-8 lg:px-10">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900 text-center" style={{ fontFamily }}>
          Three courses working together to take you <span className="bg-yellow-200/80 text-black px-2 py-[2px]">from beginner to seriously good boxer.</span>
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto pb-4 sm:pb-12 px-4 md:px-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="mb-6 sm:mb-16 md:mb-24"
          >
            <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-black mb-4 sm:mb-6 md:mb-8 text-left underline" style={{ fontFamily }}>
              {item.title}
            </h3>
            <div className="text-sm sm:text-base md:text-lg font-medium text-black" style={{ fontFamily }}>
              {item.content}
            </div>
          </div>
        ))}
      </div>

      {cta && (
        <div className="text-center pb-4 sm:pb-20 px-4">
          {cta}
        </div>
      )}
    </div>
  );
};
