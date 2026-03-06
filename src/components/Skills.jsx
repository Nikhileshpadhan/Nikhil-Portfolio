import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
    FaReact, FaNodeJs, FaPython, FaGitAlt,
    FaChartBar, FaBrain, FaRobot
} from "react-icons/fa";
import { SiDjango, SiFastapi } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

import Waves from "./Waves";

const coreSkills = [
    { name: "React", icon: <FaReact className="text-3xl mb-2 text-[#61DAFB]" /> },
    { name: "Django", icon: <SiDjango className="text-3xl mb-2 text-[#092E20]" /> },
    { name: "FastAPI", icon: <SiFastapi className="text-3xl mb-2 text-[#009688]" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-3xl mb-2 text-[#339933]" /> },
    { name: "Data Analysis", icon: <FaChartBar className="text-3xl mb-2 text-blue-400" /> },
    { name: "Machine Learning", icon: <FaBrain className="text-3xl mb-2 text-pink-400" /> },
    { name: "Generative AI", icon: <FaRobot className="text-3xl mb-2 text-purple-400" /> },
    { name: "Git & GitHub", icon: <FaGitAlt className="text-3xl mb-2 text-[#F05032]" /> },
    { name: "VS Code", icon: <VscVscode className="text-3xl mb-2 text-[#007ACC]" /> },
    { name: "AntiGravity", icon: <span className="text-3xl mb-2 block">🚀</span> }
];

const Skills = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    // Cursor reactive liquid light
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            id="skills"
            className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
        >
            {/* ===== Waves Animated Background ===== */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-80 mix-blend-screen">
                <Waves
                    lineColor="rgba(87, 8, 28, 0.6)"
                    backgroundColor="transparent"
                    waveSpeedX={0.0125}
                    waveSpeedY={0.005}
                    waveAmpX={32}
                    waveAmpY={16}
                    friction={0.925}
                    tension={0.005}
                    maxCursorMove={100}
                    xGap={14}
                    yGap={36}
                />
            </div>

            {/* Cursor reactive glow */}
            <motion.div
                style={{
                    left: smoothX,
                    top: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-brand-accent/20 blur-[150px] z-0"
            />

            {/* Soft vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]/80 pointer-events-none z-0" />

            {/* ===== Content ===== */}
            <div className="max-w-5xl mx-auto w-full relative z-10">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="w-12 h-[1px] bg-brand-accent"></span>
                        <span className="font-display text-brand-accent uppercase tracking-[0.3em] text-xs font-bold">
                            Core Stack
                        </span>
                        <span className="w-12 h-[1px] bg-brand-accent"></span>
                    </div>

                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight uppercase">
                        Skill{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-pink-500">
                            Arsenal
                        </span>
                    </h2>
                </div>

                {/* Glass Skill Container */}
                <div
                    ref={containerRef}
                    className="relative glass rounded-3xl border border-white/10 p-10 md:p-14 overflow-hidden backdrop-blur-xl"
                >
                    {/* Inner glass shine */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-wrap justify-center gap-6 md:gap-8">
                        {coreSkills.map((skill, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{
                                    delay: idx * 0.05,
                                    duration: 0.5,
                                    ease: "easeOut"
                                }}
                                whileHover={{ scale: 1.05, y: -6 }}
                                className="relative group"
                            >
                                <div className="relative flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-2xl border border-white/10 bg-white/5 hover:border-brand-accent hover:bg-brand-accent/10 transition-all duration-300 shadow-lg">
                                    {skill.icon}
                                    <span className="font-display text-[10px] md:text-xs text-center text-white/80 font-bold tracking-widest uppercase group-hover:text-white transition-colors duration-300">
                                        {skill.name}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;