// Common types used across UI components

export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type Status = 'success' | 'warning' | 'error' | 'info';

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
