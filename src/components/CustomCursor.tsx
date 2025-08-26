import React, { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;

    const moveHandler = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const hoverHandler = () => setIsHovering(true);
    const leaveHandler = () => setIsHovering(false);

    document.addEventListener("mousemove", moveHandler);

    // hover on clickable elements
    const hoverTargets = document.querySelectorAll("button, a, .product-card");
    hoverTargets.forEach(el => {
      el.addEventListener("mouseenter", hoverHandler);
      el.addEventListener("mouseleave", leaveHandler);
    });

    const animate = () => {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      if (cursor) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        cursor.classList.toggle("hover", isHovering);
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      hoverTargets.forEach(el => {
        el.removeEventListener("mouseenter", hoverHandler);
        el.removeEventListener("mouseleave", leaveHandler);
      });
    };
  }, [isHovering]);

  return <div className="cursor" ref={cursorRef}></div>;
};

export default CustomCursor;
