'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BaseComponentProps } from './types';
import { cn } from './utils';

export interface DropdownProps extends BaseComponentProps {
  trigger: React.ReactNode;
  align?: 'left' | 'right';
  disabled?: boolean;
}

export interface DropdownItemProps extends BaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  destructive?: boolean;
}

export interface DropdownSeparatorProps extends BaseComponentProps {}

export interface DropdownLabelProps extends BaseComponentProps {}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className, trigger, align = 'left', disabled = false }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    return (
      <div ref={dropdownRef} className={cn('relative inline-block', className)}>
        <div onClick={handleToggle} className={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}>
          {trigger}
        </div>

        {isOpen && (
          <div
            ref={ref}
            className={cn(
              'absolute z-50 mt-3 min-w-[14rem]',
              'bg-[var(--card)] rounded-[var(--radius-lg)]',
              'border-[var(--border-width)] border-[var(--border)]',
              'shadow-[var(--shadow-xl)]',
              'py-2',
              'animate-bounce-in',
              'transform -rotate-1',
              align === 'left' && 'left-0',
              align === 'right' && 'right-0'
            )}
          >
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<any>, {
                  onClick: () => {
                    if (child.props.onClick) {
                      child.props.onClick();
                    }
                    setIsOpen(false);
                  },
                });
              }
              return child;
            })}
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  (
    {
      children,
      className,
      onClick,
      disabled = false,
      icon,
      destructive = false,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'w-full flex items-center gap-3',
          'px-4 py-3 text-sm font-bold',
          'transition-all duration-[var(--transition)]',
          'focus:outline-none',
          'transform hover:translate-x-1',
          destructive
            ? 'text-[var(--error)] hover:bg-[var(--error)] hover:text-white'
            : 'text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]',
          disabled && 'opacity-50 cursor-not-allowed grayscale',
          className
        )}
      >
        {icon && <span className="inline-flex w-5 h-5">{icon}</span>}
        {children}
      </button>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';

export const DropdownSeparator = React.forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('my-2 h-[2px] bg-[var(--border)]', className)}
      />
    );
  }
);

DropdownSeparator.displayName = 'DropdownSeparator';

export const DropdownLabel = React.forwardRef<HTMLDivElement, DropdownLabelProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-4 py-2 text-xs font-black',
          'text-[var(--neutral-500)] uppercase tracking-widest',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

DropdownLabel.displayName = 'DropdownLabel';
