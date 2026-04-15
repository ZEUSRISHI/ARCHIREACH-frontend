import React, { useEffect, useRef, useState } from 'react';

type RevealProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'style' | 'children'>;

export default function Reveal<T extends React.ElementType = 'div'>(
  props: RevealProps<T>
) {
  const { as, className = '', delay = 0, style, children, ...rest } = props;
  const As = (as || 'div') as React.ElementType;

  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  const mergedStyle: React.CSSProperties = { transitionDelay: `${delay}ms`, ...style };

  return (
    <As
      ref={(node: unknown) => {
        ref.current = node as HTMLElement | null;
      }}
      style={mergedStyle}
      className={`${className} ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-3 blur-[1px]'} transform-gpu transition-all duration-700 ease-out`}
      {...(rest as unknown as Record<string, unknown>)}
    >
      {children}
    </As>
  );
}
