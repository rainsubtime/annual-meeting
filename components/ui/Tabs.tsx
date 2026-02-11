'use client';

import React, { createContext, useContext, useState } from 'react';
import { BaseComponentProps } from './types';
import { cn } from './utils';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: 'line' | 'pills';
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within Tabs');
  }
  return context;
}

export interface TabsProps extends BaseComponentProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'line' | 'pills';
}

export interface TabsListProps extends BaseComponentProps {
  fullWidth?: boolean;
}

export interface TabsTriggerProps extends BaseComponentProps {
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TabsContentProps extends BaseComponentProps {
  value: string;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      children,
      className,
      defaultValue,
      value,
      onValueChange,
      variant = 'line',
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeTab = value ?? internalValue;

    const setActiveTab = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
        <div ref={ref} className={cn('w-full', className)}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, fullWidth = false }, ref) => {
    const { variant } = useTabsContext();

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-2',
          variant === 'line' && 'border-b-[var(--border-width)] border-[var(--border)]',
          variant === 'pills' && 'bg-[var(--neutral-100)] p-2 rounded-[var(--radius-md)] border-[var(--border-width)] border-[var(--border)]',
          fullWidth && 'w-full',
          className
        )}
        role="tablist"
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = 'TabsList';

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ children, className, value, disabled = false, icon }, ref) => {
    const { activeTab, setActiveTab, variant } = useTabsContext();
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        disabled={disabled}
        onClick={() => setActiveTab(value)}
        className={cn(
          'relative inline-flex items-center justify-center gap-2',
          'px-5 py-3 text-sm font-bold uppercase tracking-wide',
          'transition-all duration-[var(--transition)]',
          'focus-visible:outline-none focus-visible:ring-4',
          'focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale',
          // Line variant
          variant === 'line' && [
            'border-b-[3px] border-transparent',
            isActive
              ? 'text-[var(--primary)] border-[var(--primary)] transform -rotate-1'
              : 'text-[var(--neutral-500)] hover:text-[var(--foreground)] hover:border-[var(--neutral-400)]',
          ],
          // Pills variant
          variant === 'pills' && [
            'rounded-[var(--radius-sm)]',
            isActive
              ? 'bg-[var(--card)] text-[var(--foreground)] shadow-[var(--shadow)] border-2 border-[var(--foreground)] transform rotate-1'
              : 'text-[var(--neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--accent-light)]',
          ],
          className
        )}
      >
        {icon && <span className="inline-flex">{icon}</span>}
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ children, className, value }, ref) => {
    const { activeTab } = useTabsContext();

    if (activeTab !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn('mt-4 animate-fade-in', className)}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';
