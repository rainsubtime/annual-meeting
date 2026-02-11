'use client';

import React, { forwardRef } from 'react';
import { BaseComponentProps, Size, Status } from './types';
import { cn } from './utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: Size;
  status?: Status;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  status?: Status;
  fullWidth?: boolean;
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm font-semibold',
  md: 'h-11 px-5 text-base font-semibold',
  lg: 'h-14 px-6 text-lg font-bold',
  xl: 'h-16 px-8 text-xl font-bold',
};

const statusStyles: Record<Status, string> = {
  success: 'border-[var(--success)] focus:ring-[var(--success)]',
  warning: 'border-[var(--warning)] focus:ring-[var(--warning)]',
  error: 'border-[var(--error)] focus:ring-[var(--error)]',
  info: 'border-[var(--info)] focus:ring-[var(--info)]',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      status,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const finalStatus = hasError ? 'error' : status;

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label className="text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              // Base styles - Graffiti style
              'w-full rounded-[var(--radius-md)]',
              'border-[var(--border-width)] border-[var(--border)]',
              'bg-[var(--card)]',
              'text-[var(--foreground)]',
              'transition-all duration-[var(--transition)]',
              'placeholder:text-[var(--neutral-400)] placeholder:font-bold',
              'shadow-[var(--shadow-sm)]',
              // Focus styles
              'focus:outline-none focus:ring-4 focus:ring-[var(--ring)]',
              'focus:border-[var(--ring)]',
              'focus:shadow-[var(--shadow-md)]',
              'focus:transform focus:-rotate-1',
              // Disabled styles
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale',
              // Size
              sizeStyles[size],
              // Icon padding
              leftIcon && 'pl-12',
              rightIcon && 'pr-12',
              // Status
              finalStatus && statusStyles[finalStatus],
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]">
              {rightIcon}
            </div>
          )}
        </div>
        {(hint || error) && (
          <p
            className={cn(
              'text-xs',
              error ? 'text-[var(--error)]' : 'text-[var(--neutral-500)]'
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      status,
      fullWidth = false,
      className,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const finalStatus = hasError ? 'error' : status;

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label className="text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          disabled={disabled}
          rows={rows}
          className={cn(
            // Base styles - Graffiti style
            'w-full rounded-[var(--radius-md)]',
            'border-[var(--border-width)] border-[var(--border)]',
            'bg-[var(--card)]',
            'text-[var(--foreground)]',
            'px-5 py-4',
            'font-semibold',
            'transition-all duration-[var(--transition)]',
            'placeholder:text-[var(--neutral-400)] placeholder:font-bold',
            'resize-y',
            'shadow-[var(--shadow-sm)]',
            // Focus styles
            'focus:outline-none focus:ring-4 focus:ring-[var(--ring)]',
            'focus:border-[var(--ring)]',
            'focus:shadow-[var(--shadow-md)]',
            'focus:transform focus:rotate-1',
            // Disabled styles
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale',
            // Status
            finalStatus && statusStyles[finalStatus],
            className
          )}
          {...props}
        />
        {(hint || error) && (
          <p
            className={cn(
              'text-xs',
              error ? 'text-[var(--error)]' : 'text-[var(--neutral-500)]'
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
