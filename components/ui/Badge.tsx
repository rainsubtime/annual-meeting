'use client';

import React from 'react';
import { BaseComponentProps, Size, Status } from './types';
import { cn } from './utils';

export interface BadgeProps extends BaseComponentProps {
  variant?: Status | 'default' | 'primary' | 'secondary';
  size?: Exclude<Size, 'xl'>;
  rounded?: boolean;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

const variantStyles = {
  default: 'bg-[var(--neutral-200)] text-[var(--neutral-900)] border-2 border-[var(--foreground)]',
  primary: 'bg-[var(--primary)] text-[var(--on-primary)] border-2 border-[var(--foreground)] shadow-[3px_3px_0_var(--foreground)]',
  secondary: 'bg-[var(--secondary)] text-[var(--on-secondary)] border-2 border-[var(--foreground)] shadow-[3px_3px_0_var(--foreground)]',
  success: 'bg-[var(--success)] text-[var(--foreground)] border-2 border-[var(--foreground)] shadow-[3px_3px_0_var(--foreground)]',
  warning: 'bg-[var(--warning)] text-[var(--foreground)] border-2 border-[var(--foreground)] shadow-[3px_3px_0_var(--foreground)]',
  error: 'bg-[var(--error)] text-white border-2 border-[var(--foreground)] shadow-[3px_3px_0_var(--foreground)]',
  info: 'bg-[var(--info)] text-white border-2 border-[var(--foreground)] shadow-[3px_3px_0_var(--foreground)]',
};

const sizeStyles: Record<Exclude<Size, 'xl'>, string> = {
  sm: 'text-xs px-2.5 py-1 gap-1 font-bold',
  md: 'text-sm px-3 py-1.5 gap-1.5 font-bold',
  lg: 'text-base px-4 py-2 gap-2 font-extrabold',
};

const dotStyles = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'md',
      rounded = false,
      dot = false,
      removable = false,
      onRemove,
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base styles - Graffiti style
          'inline-flex items-center justify-center',
          'uppercase tracking-wide',
          'transition-all duration-[var(--transition)]',
          'transform hover:-rotate-2',
          // Rounded
          rounded ? 'rounded-full' : 'rounded-[var(--radius-sm)]',
          // Variant and size
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
      >
        {dot && (
          <span
            className={cn(
              'rounded-full bg-current',
              dotStyles[size]
            )}
          />
        )}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Remove badge"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={cn(
                size === 'sm' && 'w-3 h-3',
                size === 'md' && 'w-4 h-4',
                size === 'lg' && 'w-5 h-5'
              )}
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
