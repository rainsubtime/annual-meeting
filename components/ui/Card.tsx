'use client';

import React from 'react';
import { BaseComponentProps } from './types';
import { cn } from './utils';

export interface CardProps extends BaseComponentProps {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
  shadowed?: boolean;
}

export interface CardHeaderProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export interface CardBodyProps extends BaseComponentProps {}

export interface CardFooterProps extends BaseComponentProps {
  align?: 'left' | 'center' | 'right';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      hover = false,
      padding = 'md',
      bordered = true,
      shadowed = true,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles - Graffiti style
          'rounded-[var(--radius-lg)] bg-[var(--card)]',
          'transition-all duration-[var(--transition-slow)]',
          'transform',
          // Border
          bordered && 'border-[var(--border-width)] border-[var(--border)]',
          // Shadow
          shadowed && 'shadow-[var(--shadow-md)]',
          // Hover effect
          hover && 'hover:shadow-[var(--shadow-xl)] hover:-translate-y-2 hover:rotate-1 cursor-pointer',
          // Padding
          paddingStyles[padding],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, title, subtitle, action }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start justify-between',
          'border-b-[var(--border-width)] border-[var(--border)] border-dashed pb-5 mb-5',
          className
        )}
      >
        <div className="flex flex-col gap-1">
          {title && (
            <h3 className="text-xl font-black text-[var(--foreground)] uppercase tracking-wide">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-[var(--neutral-500)]">{subtitle}</p>
          )}
          {children}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn('text-[var(--card-foreground)]', className)}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, align = 'right' }, ref) => {
    const alignStyles = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3',
          'border-t-[var(--border-width)] border-[var(--border)] border-dashed pt-5 mt-5',
          alignStyles[align],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
