import React from 'react';
import { cn } from '@/lib/utils';

// Apple Typography Component Props
interface AppleTextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Large Title - 34px, for main page headers
export const AppleLargeTitle: React.FC<AppleTextProps> = ({ 
  children, 
  className, 
  as: Component = 'h1',
  ...props 
}) => {
  return (
    <Component 
      className={cn('apple-large-title', className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Title 1 - 28px, for section headers
export const AppleTitle1: React.FC<AppleTextProps> = ({ 
  children, 
  className, 
  as: Component = 'h2',
  ...props 
}) => {
  return (
    <Component 
      className={cn('apple-title-1', className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Title 2 - 22px, for card titles
export const AppleTitle2: React.FC<AppleTextProps> = ({ 
  children, 
  className, 
  as: Component = 'h3',
  ...props 
}) => {
  return (
    <Component 
      className={cn('apple-title-2', className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Title 3 - 20px, for subsection headers
export const AppleTitle3: React.FC<AppleTextProps> = ({ 
  children, 
  className, 
  as: Component = 'h4',
  ...props 
}) => {
  return (
    <Component 
      className={cn('apple-title-3', className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Headline - 17px semibold, for metric labels and important text
export const AppleHeadline: React.FC<AppleTextProps> = ({ 
  children, 
  className, 
  as: Component = 'p',
  ...props 
}) => {
  return (
    <Component 
      className={cn('apple-headline', className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Body - 17px, for primary content
export const AppleBody: React.FC<AppleTextProps> = ({ 
  children, 
  className, 
  as: Component = 'p',
  ...props 
}) => {
  return (
    <Component 
      className={cn('apple-body', className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Callout - 16px, for secondary content
export const AppleCallout: React.FC<AppleTextProps> = ({ 
  children, 
  className, 
  as: Component = 'p',
  ...props 
}) => {
  return (
    <Component 
      className={cn('apple-callout', className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Subheadline - 15px, for supporting text
export const AppleSubheadline: React.FC<AppleTextProps> = ({ 
  children, 
  className, 
  as: Component = 'p',
  ...props 
}) => {
  return (
    <Component 
      className={cn('apple-subheadline', className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Footnote - 13px, for tertiary information
export const AppleFootnote: React.FC<AppleTextProps> = ({ 
  children, 
  className, 
  as: Component = 'p',
  ...props 
}) => {
  return (
    <Component 
      className={cn('apple-footnote', className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Caption 1 - 12px, for captions and labels
export const AppleCaption1: React.FC<AppleTextProps> = ({ 
  children, 
  className, 
  as: Component = 'span',
  ...props 
}) => {
  return (
    <Component 
      className={cn('apple-caption-1', className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Caption 2 - 11px, for smallest text
export const AppleCaption2: React.FC<AppleTextProps> = ({ 
  children, 
  className, 
  as: Component = 'span',
  ...props 
}) => {
  return (
    <Component 
      className={cn('apple-caption-2', className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Responsive typography hook for different screen sizes
export const useAppleTypography = () => {
  return {
    // Responsive text sizes that adapt to screen size
    largeTitle: 'text-2xl sm:text-3xl lg:apple-large-title',
    title1: 'text-xl sm:text-2xl lg:apple-title-1',
    title2: 'text-lg sm:text-xl lg:apple-title-2',
    title3: 'text-base sm:text-lg lg:apple-title-3',
    headline: 'text-sm sm:text-base lg:apple-headline',
    body: 'text-sm sm:text-base lg:apple-body',
    callout: 'text-xs sm:text-sm lg:apple-callout',
    subheadline: 'text-xs sm:text-sm lg:apple-subheadline',
    footnote: 'text-xs lg:apple-footnote',
    caption1: 'text-xs lg:apple-caption-1',
    caption2: 'text-xs lg:apple-caption-2'
  };
};