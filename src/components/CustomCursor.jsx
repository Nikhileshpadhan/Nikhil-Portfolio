import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e) => {
      const target = e.target;
      const tagName = target.tagName.toLowerCase();
      
      // Interactive elements or text elements for the invert effect
      if (
        tagName === 'a' ||
        tagName === 'button' ||
        tagName === 'h1' ||
        tagName === 'h2' ||
        tagName === 'h3' ||
        tagName === 'p' ||
        tagName === 'span' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('text-hover-invert')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Small dot that follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-accent rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      
      {/* Larger trailing circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-[99]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          mixBlendMode: isHovering ? "difference" : "normal"
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
      />
    </>
  );
};

export default CustomCursor;
