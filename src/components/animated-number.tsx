'use client';

import { useEffect, useRef } from 'react';

const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

// Easing function for a smoother animation
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 4);

export function AnimatedNumber({
  value,
  className,
  formatter = (n) => n.toLocaleString('pt-BR'),
}: {
  value: number;
  className?: string;
  formatter?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const prevValue = usePrevious(value) ?? value; // Start from current value on first render

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const DURATION = 600;
    let startTimestamp: number | null = null;
    const startValue = prevValue;
    const endValue = value;

    // Set initial text content to avoid flash of old content
    if(element.textContent !== formatter(value)) {
        element.textContent = formatter(prevValue);
    }
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / DURATION, 1);
      const easedProgress = easeOutCubic(progress);

      const currentNum = startValue + (endValue - startValue) * easedProgress;
      element.textContent = formatter(currentNum);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure it ends on the exact value
        element.textContent = formatter(endValue);
      }
    };

    const animationFrameId = requestAnimationFrame(step);

    return () => {
        cancelAnimationFrame(animationFrameId);
    }
  }, [value, prevValue, formatter]);

  return <span ref={ref} className={className} />;
}
