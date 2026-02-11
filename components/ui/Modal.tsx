'use client';

import React, { useEffect } from 'react';
import { BaseComponentProps, Size } from './types';
import { cn } from './utils';

export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  size?: Exclude<Size, 'sm'>;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
}

export interface ModalHeaderProps extends BaseComponentProps {
  title?: string;
}

export interface ModalBodyProps extends BaseComponentProps {}

export interface ModalFooterProps extends BaseComponentProps {
  align?: 'left' | 'center' | 'right';
}

const sizeStyles: Record<Exclude<Size, 'sm'>, string> = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      className,
      open,
      onClose,
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEsc = true,
      showCloseButton = true,
    },
    ref
  ) => {
    // Handle ESC key
    useEffect(() => {
      if (!closeOnEsc || !open) return;

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }, [closeOnEsc, open, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          ref={ref}
          className={cn(
            'relative w-full',
            'bg-[var(--card)] rounded-[var(--radius-xl)]',
            'shadow-[var(--shadow-xl)]',
            'border-[var(--border-width-thick)] border-[var(--border)]',
            'animate-bounce-in',
            'transform rotate-1',
            sizeStyles[size],
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[var(--neutral-400)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, title }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-8 pt-8 pb-5',
          'border-b-[var(--border-width)] border-[var(--border)] border-dashed',
          className
        )}
      >
        {title && (
          <h2 className="text-3xl font-black text-[var(--foreground)] uppercase tracking-wide transform -rotate-1">
            {title}
          </h2>
        )}
        {children}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-8 py-5 text-[var(--card-foreground)] font-medium', className)}
      >
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'ModalBody';

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
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
          'flex items-center gap-4',
          'px-8 pb-8 pt-5',
          'border-t-[var(--border-width)] border-[var(--border)] border-dashed',
          alignStyles[align],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';
