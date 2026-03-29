import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          'glass-card relative overflow-hidden transition-all duration-300',
          hover && 'cursor-pointer hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1',
          className
        )
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
}
