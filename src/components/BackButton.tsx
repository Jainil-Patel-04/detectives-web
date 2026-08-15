'use client';

import Link from 'next/link';
import type { Theme } from '@/lib/themes';

export default function BackButton({ theme, href = '/' }: { theme: Theme; href?: string }) {
  return (
    <Link
      href={href}
      className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105"
      style={{
        backgroundColor: `${theme.bgPrimary}cc`,
        color: theme.bgSecondary,
        border: `1px solid ${theme.accentSecondary}50`,
        backdropFilter: 'blur(6px)',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Case Archive
    </Link>
  );
}