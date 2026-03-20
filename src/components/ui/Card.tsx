import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'glass-card p-6',
        hover && 'cursor-pointer hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300',
        className,
      )}
    >
      {children}
    </div>
  );
}
