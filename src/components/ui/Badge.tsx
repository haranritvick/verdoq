import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'safe' | 'warning' | 'danger' | 'primary';
  size?: 'sm' | 'md';
}

export default function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        {
          'bg-border text-text-secondary': variant === 'default',
          'bg-safe/10 text-safe': variant === 'safe',
          'bg-warning/10 text-warning': variant === 'warning',
          'bg-danger/10 text-danger': variant === 'danger',
          'bg-primary/10 text-primary': variant === 'primary',
        },
        {
          'text-xs px-2 py-0.5': size === 'sm',
          'text-sm px-3 py-1': size === 'md',
        },
      )}
    >
      {children}
    </span>
  );
}
