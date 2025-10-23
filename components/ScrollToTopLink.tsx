'use client';

import NextLink from "next/link";
import { forwardRef } from "react";

interface ScrollToTopLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Custom Link component that scrolls to top when navigating
 * Drop-in replacement for React Router's Link component using Next.js Link
 */
export const ScrollToTopLink = forwardRef<HTMLAnchorElement, ScrollToTopLinkProps>(
  ({ to, onClick, className, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Call original onClick if provided
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <NextLink 
        href={to} 
        ref={ref} 
        onClick={handleClick} 
        className={className}
        {...props}
      >
        {children}
      </NextLink>
    );
  },
);

ScrollToTopLink.displayName = "ScrollToTopLink";
