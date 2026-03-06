import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Background3D from "./Background3D";
import Nikhilresume from "../Public/NRESUME.pdf";

const Hero = () => {
    const containerRef = useRef(null);
    const nameRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yContent = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    // Floating animation
    const floatY = useMotionValue(0);

    useEffect(() => {
        let frame;
        let direction = 1;

        const animate = () => {
            floatY.set(floatY.get() + 0.15 * direction);
            if (floatY.get() > 10) direction = -1;
            if (floatY.get() < -10) direction = 1;
            frame = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(frame);
    }, [floatY]);

    // Magnetic effect
    const handleMouseMove = (e) => {
        const rect = nameRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        nameRef.current.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    };

    const handleMouseLeave = () => {
        nameRef.current.style.transform = `translate(0px, 0px)`;
    };

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden noise-bg"
        >
            <Background3D />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32">
                <motion.div
                    style={{ y: yContent, opacity }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                    {/* LEFT */}
                    <div className="flex flex-col items-start lg:pr-16 md:border-l border-white/10 md:pl-8 lg:pl-12">

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="mb-8"
                        >
                            <span className="text-white/50 uppercase tracking-[0.25em] text-s font-medium">
                                HELLO 🙏
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="font-display text-2xl md:text-3xl text-white/50 mb-3"
                        >
                            Welcome to My Page I am
                        </motion.h2>

                        {/* NIKHIL */}
                        <motion.div
                            style={{ y: floatY }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="relative"
                        >
                            <h1
                                ref={nameRef}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter uppercase text-brand-accent transition-transform duration-300 ease-out cursor-default"
                            >
                                NIKHIL
                            </h1>

                            {/* Animated Underline */}
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: "60%" }}
                                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                                className="absolute left-0 -bottom-3 h-[2px] bg-brand-accent"
                            />
                        </motion.div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col items-start md:pl-8 lg:pl-20 xl:pl-28 mt-8 lg:mt-0">

                        <motion.h3
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.4, duration: 1 }}
                            className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-white mb-6"
                        >
                            Creating Impact <br />
                            <span className="text-brand-accent">
                                Through Technology
                            </span>
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6, duration: 1 }}
                            className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg mb-10"
                        >
                            I build modern web apps with clean UI, strong logic, and
                            real-world impact. Exploring scalable systems and AI-powered software.
                        </motion.p>

                        {/* Download Button */}
                        <motion.a
                            href={Nikhilresume}
                            download
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.8, duration: 0.8 }}
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold bg-brand-accent/10 border border-brand-accent text-brand-light uppercase tracking-widest text-xs rounded-full overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                Download Resume
                            </span>
                        </motion.a>
                    </div>
                </motion.div>

                {/* Improved Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-[1px] h-12 bg-white/30"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;