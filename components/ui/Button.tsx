'use client';

import React from 'react';
import { BaseComponentProps, Size, Variant } from './types';
import { cn } from './utils';

export interface ButtonProps extends BaseComponentProps {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary: `
    bg-[var(--primary)] text-[var(--on-primary)]
    border-[var(--border-width)] border-[var(--foreground)]
    hover:bg-[var(--primary-hover)]
    active:translate-x-[3px] active:translate-y-[3px]
    active:shadow-none
    shadow-[var(--shadow-md)]
    hover:shadow-[var(--shadow-lg)]
    transform hover:-rotate-1
  `,
  secondary: `
    bg-[var(--secondary)] text-[var(--on-secondary)]
    border-[var(--border-width)] border-[var(--foreground)]
    hover:bg-[var(--secondary-hover)]
    active:translate-x-[3px] active:translate-y-[3px]
    active:shadow-none
    shadow-[var(--shadow-md)]
    hover:shadow-[var(--shadow-lg)]
    transform hover:rotate-1
  `,
  outline: `
    border-[var(--border-width-thick)] border-[var(--border)]
    text-[var(--foreground)]
    bg-[var(--background)]
    hover:bg-[var(--primary)]
    hover:text-[var(--on-primary)]
    active:translate-x-[2px] active:translate-y-[2px]
    shadow-[var(--shadow)]
    hover:shadow-[var(--shadow-md)]
    transform hover:skew-x-1
  `,
  ghost: `
    text-[var(--foreground)]
    hover:bg-[var(--accent)]
    hover:text-[var(--foreground)]
    active:bg-[var(--accent-hover)]
    border-2 border-transparent
    hover:border-[var(--foreground)]
    hover:border-dashed
  `,
  danger: `
    bg-[var(--error)] text-white
    border-[var(--border-width)] border-[var(--foreground)]
    hover:opacity-90
    active:translate-x-[3px] active:translate-y-[3px]
    active:shadow-none
    shadow-[var(--shadow-md)]
    hover:shadow-[var(--shadow-lg)]
    transform hover:-rotate-1
  `,
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5 font-bold',
  md: 'h-11 px-6 text-base gap-2 font-bold',
  lg: 'h-14 px-8 text-lg gap-2.5 font-extrabold',
  xl: 'h-16 px-10 text-xl gap-3 font-extrabold',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      onClick,
      type = 'button',
      leftIcon,
      rightIcon,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={cn(
          // Base styles - Graffiti style
          'relative inline-flex items-center justify-center',
          'uppercase tracking-wider',
          'rounded-[var(--radius-md)]',
          'transition-all duration-[var(--transition)]',
          'focus-visible:outline-none focus-visible:ring-4',
          'focus-visible:ring-[var(--ring)] focus-visible:ring-offset-4',
          'focus-visible:ring-offset-[var(--background)]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale',
          // Variant and size
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
        <span className={cn(loading && 'opacity-0')}>{children}</span>
        {!loading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
