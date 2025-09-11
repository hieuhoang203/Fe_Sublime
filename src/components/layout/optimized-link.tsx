"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface OptimizedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function OptimizedLink({
  href,
  children,
  className,
  onClick,
}: OptimizedLinkProps) {
  const router = useRouter();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      // Call custom onClick if provided
      if (onClick) {
        onClick();
      }

      // Use router.push for client-side navigation
      router.push(href);
    },
    [href, onClick, router]
  );

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
