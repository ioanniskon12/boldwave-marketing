'use client';

import { usePathname } from 'next/navigation';

export function useActiveRoute() {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const isExactMatch = (href: string): boolean => {
    return pathname === href;
  };

  return { pathname, isActive, isExactMatch };
}
