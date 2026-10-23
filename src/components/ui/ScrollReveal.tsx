"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  variant?: "fade" | "scale" | "slide";
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  variant = "fade",
  delay = 0,
  duration = 600,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once]);

  const getHiddenStyles = (): React.CSSProperties => {
    switch (variant) {
      case "scale":
        return { opacity: 0, transform: "scale(0.95)" };
      case "slide": {
        const slideMap = {
          up: "translateY(16px)",
          down: "translateY(-16px)",
          left: "translateX(16px)",
          right: "translateX(-16px)",
          none: "none",
        };
        return { opacity: 0, transform: slideMap[direction] };
      }
      case "fade":
      default: {
        const fadeMap = {
          up: "translateY(8px)",
          down: "translateY(-8px)",
          left: "translateX(8px)",
          right: "translateX(-8px)",
          none: "none",
        };
        return { opacity: 0, transform: fadeMap[direction] };
      }
    }
  };

  const visibleStyles: React.CSSProperties = {
    opacity: 1,
    transform: "translate(0, 0) scale(1)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: "opacity, transform",
        transitionTimingFunction: "ease-out",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ...(isVisible ? visibleStyles : getHiddenStyles()),
      }}
    >
      {children}
    </div>
  );
}
