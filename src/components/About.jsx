import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import portfolioImg from "../Public/portfolioimg.jpeg";

const About = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  /* =======================
     Stronger Parallax Motion
  ======================== */
  const yTextRaw = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const yImageRaw = useTransform(scrollYProgress, [0, 1], [220, -220]);

  const yText = useSpring(yTextRaw, { stiffness: 80, damping: 20 });
  const yImage = useSpring(yImageRaw, { stiffness: 90, damping: 22 });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    [0, 1, 1, 0]
  );

  /* =======================
     Faster Magnetic Tilt
  ======================== */
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 18 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();

    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-12 overflow-hidden bg-[#0A0A0A]"
    >
      {/* =======================
          HERO STYLE BACKGROUND
      ======================== */}

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_40%)]" />

      {/* Floating cinematic blob */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-accent/10 blur-[160px] rounded-full"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center relative z-10">

        {/* =======================
              LEFT TEXT
        ======================== */}
        <motion.div
          style={{ y: yText, opacity }}
          className="flex flex-col space-y-6 lg:pr-8"
        >
          <div className="flex items-center space-x-4">
            <span className="w-12 h-[1px] bg-brand-accent"></span>
            <span className="uppercase tracking-[0.35em] text-xs font-semibold text-brand-accent">
              About Me
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-5xl font-display text-white leading-tight tracking-tight">
            Turning ideas into <br />
            <span className="text-white/40">real products.</span>
          </h2>

          <div className="space-y-4 text-white/65 text-base md:text-lg leading-relaxed font-light">
            <p>
              I’m a self-driven developer focused on crafting fast, visually
              refined digital experiences that feel intentional and modern.
            </p>
            <p>
              My work blends clean engineering with thoughtful design —
              building products that are both functional and memorable.
            </p>
            <p className="text-white font-medium">
              Currently exploring scalable architectures and building impactful tech products.
            </p>
          </div>

          {/* ===== Pink CTA ===== */}
          <motion.a
            href="#projects"
            whileHover={{ x: 12 }}
            className="inline-flex flex-col items-start group pt-6"
          >
            <span className="uppercase tracking-widest text-xs font-semibold text-white group-hover:text-brand-accent transition">
              View My Work
            </span>

            <span className="w-full h-[2px] bg-white/10 overflow-hidden mt-2">
              <span className="block w-full h-full bg-brand-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            </span>
          </motion.a>
        </motion.div>

        {/* =======================
              RIGHT IMAGE
        ======================== */}
        <div className="relative h-[360px] sm:h-[420px] lg:h-[520px] w-full flex items-center justify-center perspective-[1200px]">

          {/* Pink glow behind image */}
          <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-brand-accent/10 blur-[140px]" />

          <motion.div
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              y: yImage,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md h-full rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md group shadow-[0_0_80px_rgba(255,0,120,0.05)]"
          >
            <motion.img
              src={portfolioImg}
              alt="Developer"
              style={{ translateZ: 60 }}
              className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div
              style={{ translateZ: 80 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
            />

            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition duration-500 rounded-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;