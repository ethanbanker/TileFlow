'use client';

import * as React from 'react';

type Status = 'ok' | 'warn' | 'error' | 'idle' | 'loading';

export function statusClasses(status?: Status) {
  switch (status) {
    case 'ok':
      return { dot: 'bg-emerald-400', text: 'text-emerald-400' };
    case 'warn':
      return { dot: 'bg-amber-400', text: 'text-amber-300' };
    case 'error':
      return { dot: 'bg-red-400', text: 'text-red-400' };
    case 'loading':
      return { dot: 'bg-brand-400 animate-pulse-soft', text: 'text-brand-300' };
    default:
      return { dot: 'bg-neutral-400', text: 'text-neutral-300' };
  }
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export type TileProps = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  status?: Status;
  statusText?: string;
  href?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export default function Tile({
  title,
  subtitle,
  icon,
  status,
  statusText,
  href,
  footer,
  children,
  className,
}: TileProps) {
  const { dot, text } = statusClasses(status);
  const Wrapper: any = href ? 'a' : 'div';

  return (
    <Wrapper
      href={href}
      className={cn(
        'group relative glass-card glass-interactive p-4 md:p-5',
        'flex flex-col gap-3',
        className
      )}
    >
      {/* Hover gradient sheen */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
           style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06), transparent 30%)' }} />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-neutral-800/70 ring-1 ring-white/10 flex items-center justify-center">
            {icon ?? (
              // Default icon (globe)
              <svg viewBox="0 0 24 24" width="18" height="18" className="text-neutral-300">
                <path fill="currentColor" d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm0 2c1.66 0 3.18.51 4.43 1.37-.59.46-1.26.83-2 .96C13.72 5.52 12.89 5 12 5c-1.67 0-3 2.24-3 5s1.33 5 3 5c.89 0 1.72-.52 2.43-1.33.74.13 1.41.5 2 .96A7.96 7.96 0 0 1 12 20a8 8 0 0 1 0-16Z"/>
              </svg>
            )}
          </div>
          <div>
            <div className="text-sm text-neutral-400 uppercase tracking-wide">
              {subtitle ?? 'Tile'}
            </div>
            <div className="text-base md:text-lg font-semibold text-neutral-100">
              {title}
            </div>
          </div>
        </div>

        {/* Status */}
        {statusText && (
          <div className={cn('flex items-center gap-2 text-sm font-medium', text)}>
            <span className={cn('size-2.5 rounded-full', dot)} />
            {statusText}
          </div>
        )}
      </div>

      {/* Body */}
      {children && (
        <div className="mt-1 text-sm md:text-base text-neutral-300">
          {children}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className="pt-2 mt-auto text-xs text-neutral-400 border-t border-white/5">
          {footer}
        </div>
      )}
    </Wrapper>
  );
}
