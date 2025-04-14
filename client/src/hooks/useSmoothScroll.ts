import { useEffect } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorElement = target.closest("a");
      
      if (!anchorElement) return;
      
      const href = anchorElement.getAttribute("href");
      
      if (!href || !href.startsWith("#")) return;
      
      e.preventDefault();
      
      if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }
      
      const targetElement = document.querySelector(href);
      
      if (!targetElement) return;
      
      const headerHeight = 64; // Height of the fixed header in pixels
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    };
    
    document.addEventListener("click", handleAnchorClick);
    
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
}
