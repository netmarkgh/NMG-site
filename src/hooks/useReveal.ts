import { useEffect, useRef } from 'react';

export function useReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = containerRef.current?.querySelectorAll('.reveal');
    
    // Check elements *inside* the container
    elements?.forEach((el) => observer.observe(el));
    
    // Also check if the container *itself* has the reveal class
    if (containerRef.current?.classList.contains('reveal')) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
