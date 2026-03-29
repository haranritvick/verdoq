import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'safe' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center font-semibold rounded-full tracking-wide transition-colors',
          {
            'bg-white/10 text-white border border-white/10': variant === 'default',
            'bg-primary/20 text-primary border border-primary/20': variant === 'primary',
            'bg-safe/20 text-safe border border-safe/20': variant === 'safe',
            'bg-warning/20 text-warning border border-warning/20': variant === 'warning',
            'bg-danger/20 text-danger border border-danger/20': variant === 'danger',
            'px-2.5 py-1 text-[10px]': size === 'sm',
            'px-3 py-1.5 text-xs': size === 'md',
          },
          className
        )
      )}
    >
      {children}
    </span>
  );
}
