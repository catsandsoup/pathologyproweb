import React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

// Apple Button Variants
export type AppleButtonVariant = 'filled' | 'tinted' | 'bordered' | 'plain';
export type AppleButtonSize = 'small' | 'medium' | 'large';
export type AppleButtonProminence = 'primary' | 'secondary' | 'tertiary';

interface AppleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AppleButtonVariant;
  size?: AppleButtonSize;
  prominence?: AppleButtonProminence;
  asChild?: boolean;
  children: React.ReactNode;
}

const AppleButton = React.forwardRef<HTMLButtonElement, AppleButtonProps>(
  ({ 
    className, 
    variant = 'filled', 
    size = 'medium', 
    prominence = 'primary',
    asChild = false,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(
          // Base button styles
          'inline-flex items-center justify-center rounded-apple-medium font-medium transition-all duration-200 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          'active:scale-95 transform',
          
          // Size variants
          {
            'px-3 py-1.5 text-sm apple-footnote': size === 'small',
            'px-4 py-2 text-base apple-body': size === 'medium',
            'px-6 py-3 text-lg apple-headline': size === 'large',
          },
          
          // Variant styles
          {
            // Filled buttons - solid background
            'text-white shadow-apple-small hover:shadow-apple-medium': variant === 'filled',
            'bg-apple-blue hover:opacity-90': variant === 'filled' && prominence === 'primary',
            'bg-apple-gray hover:opacity-90': variant === 'filled' && prominence === 'secondary',
            'bg-apple-gray3 hover:opacity-90': variant === 'filled' && prominence === 'tertiary',
            
            // Tinted buttons - subtle background with colored text
            'shadow-none': variant === 'tinted',
            'bg-apple-blue/10 text-apple-blue hover:bg-apple-blue/20': variant === 'tinted' && prominence === 'primary',
            'bg-apple-gray5 text-apple-gray hover:bg-apple-gray4': variant === 'tinted' && prominence === 'secondary',
            'bg-apple-gray6 text-apple-gray2 hover:bg-apple-gray5': variant === 'tinted' && prominence === 'tertiary',
            
            // Bordered buttons - outline style
            'bg-transparent border shadow-none': variant === 'bordered',
            'border-apple-blue text-apple-blue hover:bg-apple-blue/10': variant === 'bordered' && prominence === 'primary',
            'border-apple-separator text-apple-label hover:bg-apple-gray6': variant === 'bordered' && prominence === 'secondary',
            'border-apple-gray4 text-apple-secondary-label hover:bg-apple-gray6': variant === 'bordered' && prominence === 'tertiary',
            
            // Plain buttons - text only
            'bg-transparent shadow-none': variant === 'plain',
            'text-apple-blue hover:bg-apple-blue/10': variant === 'plain' && prominence === 'primary',
            'text-apple-label hover:bg-apple-gray6': variant === 'plain' && prominence === 'secondary',
            'text-apple-secondary-label hover:bg-apple-gray6': variant === 'plain' && prominence === 'tertiary',
          },
          
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

AppleButton.displayName = 'AppleButton';

// Specialized button components for common use cases
export const ApplePrimaryButton = React.forwardRef<HTMLButtonElement, Omit<AppleButtonProps, 'variant' | 'prominence'>>(
  (props, ref) => (
    <AppleButton ref={ref} variant="filled" prominence="primary" {...props} />
  )
);

export const AppleSecondaryButton = React.forwardRef<HTMLButtonElement, Omit<AppleButtonProps, 'variant' | 'prominence'>>(
  (props, ref) => (
    <AppleButton ref={ref} variant="tinted" prominence="primary" {...props} />
  )
);

export const AppleTertiaryButton = React.forwardRef<HTMLButtonElement, Omit<AppleButtonProps, 'variant' | 'prominence'>>(
  (props, ref) => (
    <AppleButton ref={ref} variant="bordered" prominence="secondary" {...props} />
  )
);

export const ApplePlainButton = React.forwardRef<HTMLButtonElement, Omit<AppleButtonProps, 'variant' | 'prominence'>>(
  (props, ref) => (
    <AppleButton ref={ref} variant="plain" prominence="primary" {...props} />
  )
);

// Destructive button variant
export const AppleDestructiveButton = React.forwardRef<HTMLButtonElement, Omit<AppleButtonProps, 'variant' | 'prominence'>>(
  ({ className, ...props }, ref) => (
    <AppleButton 
      ref={ref} 
      variant="filled" 
      prominence="primary"
      className={cn(
        'bg-apple-red hover:bg-apple-red/90 text-white',
        className
      )}
      {...props} 
    />
  )
);

// Success button variant
export const AppleSuccessButton = React.forwardRef<HTMLButtonElement, Omit<AppleButtonProps, 'variant' | 'prominence'>>(
  ({ className, ...props }, ref) => (
    <AppleButton 
      ref={ref} 
      variant="filled" 
      prominence="primary"
      className={cn(
        'bg-apple-green hover:bg-apple-green/90 text-white',
        className
      )}
      {...props} 
    />
  )
);

ApplePrimaryButton.displayName = 'ApplePrimaryButton';
AppleSecondaryButton.displayName = 'AppleSecondaryButton';
AppleTertiaryButton.displayName = 'AppleTertiaryButton';
ApplePlainButton.displayName = 'ApplePlainButton';
AppleDestructiveButton.displayName = 'AppleDestructiveButton';
AppleSuccessButton.displayName = 'AppleSuccessButton';

export { AppleButton };