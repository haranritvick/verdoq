import type { ReactNode } from 'react';
import { useState } from 'react';
import { clsx } from 'clsx';

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom';
}

export default function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div
          className={clsx(
            'absolute z-50 px-3 py-1.5 text-xs text-text-primary bg-surface border border-border rounded-lg whitespace-nowrap',
            'animate-fade-in',
            {
              'bottom-full mb-2 left-1/2 -translate-x-1/2': position === 'top',
              'top-full mt-2 left-1/2 -translate-x-1/2': position === 'bottom',
            },
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
