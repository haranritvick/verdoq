import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
            {
              'btn-primary text-black shadow-[0_0_20px_rgba(221,244,55,0.15)] hover:shadow-[0_0_30px_rgba(221,244,55,0.3)]': variant === 'primary',
              'btn-secondary backdrop-blur-md': variant === 'secondary',
              'bg-danger/10 text-danger hover:bg-danger/20 border border-danger/20': variant === 'danger',
              'bg-transparent hover:bg-white/5 text-text-secondary hover:text-text-primary': variant === 'ghost',
              'h-9 px-4 text-xs': size === 'sm',
              'h-12 px-6 text-sm': size === 'md',
              'h-14 px-8 text-base': size === 'lg',
            },
            className
          )
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
export default Button;
