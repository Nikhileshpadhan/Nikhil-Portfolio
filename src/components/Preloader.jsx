import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const duration = 5000; // 5 seconds total
    const intervalTime = 50; // update frequency
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;

        if (next >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => onLoadingComplete(), 800);
          }, 400);

          return 100;
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center px-6"
          initial={{ y: 0 }}
          exit={{
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Centered Content */}
          <div className="text-center space-y-6 max-w-xl">

            {/* Loading Text */}
            <motion.h1
              className="font-display text-4xl md:text-6xl text-white tracking-wide"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Loading Experience
            </motion.h1>

            {/* Premium Message */}
            <motion.p
              className="text-neutral-400 text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Premium Stuff takes time.........
            </motion.p>

            {/* Percentage */}
            <motion.div
              className="text-3xl md:text-5xl font-display text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {Math.floor(progress)}%
            </motion.div>
          </div>

          {/* Progress Line (below everything) */}
          <div className="absolute bottom-20 w-full max-w-xl px-6">
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;