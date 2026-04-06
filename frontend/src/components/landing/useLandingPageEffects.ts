import { useEffect, useRef } from "react";

import { GLOBAL_CSS } from "./landingShared";

export function useLandingPageEffects() {
  const curRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rxRef = useRef(0);
  const ryRef = useRef(0);
  const mxRef = useRef(0);
  const myRef = useRef(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);

    const onMove = (event: MouseEvent) => {
      mxRef.current = event.clientX;
      myRef.current = event.clientY;
      if (curRef.current) {
        curRef.current.style.left = `${event.clientX}px`;
        curRef.current.style.top = `${event.clientY}px`;
      }
    };
    document.addEventListener("mousemove", onMove);

    let raf = 0;
    const animateRing = () => {
      rxRef.current += (mxRef.current - rxRef.current) * 0.11;
      ryRef.current += (myRef.current - ryRef.current) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = `${rxRef.current}px`;
        ringRef.current.style.top = `${ryRef.current}px`;
      }
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    const handleEnter = () => {
      if (!curRef.current || !ringRef.current) {
        return;
      }
      curRef.current.style.width = "20px";
      curRef.current.style.height = "20px";
      curRef.current.style.borderRadius = "4px";
      ringRef.current.style.width = "48px";
      ringRef.current.style.height = "48px";
    };

    const handleLeave = () => {
      if (!curRef.current || !ringRef.current) {
        return;
      }
      curRef.current.style.width = "9px";
      curRef.current.style.height = "9px";
      curRef.current.style.borderRadius = "50%";
      ringRef.current.style.width = "34px";
      ringRef.current.style.height = "34px";
    };

    const interactives = document.querySelectorAll<HTMLElement>("a,button,input");
    interactives.forEach((element) => {
      element.addEventListener("mouseenter", handleEnter);
      element.addEventListener("mouseleave", handleLeave);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.08 },
    );

    document.querySelectorAll<HTMLElement>(".reveal").forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = `opacity .5s ease ${index * 0.06}s, transform .5s ease ${index * 0.06}s`;
      observer.observe(element);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      interactives.forEach((element) => {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
      });
      observer.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  return { curRef, ringRef };
}
