import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Background3D from "./Background3D";

const projectsData = [
    {
        title: "HostelFit AI",
        tagline: "Smart, AI-driven fitness and nutrition optimization tailored to hostel lifestyles.",
        overview: "A platform designed to solve the common challenge of maintaining fitness while living in a hostel, focusing on diet optimization based on available mess menus and personalized workout routines.",
        highlights: [
            "Automated diet recommendations tailored to specific mess meal availability.",
            "AI-powered workout planning for hybrid training (strength + cardio).",
            "Real-time tracking features for consistent progress in limited-resource environments."
        ],
        color: "from-blue-500/20 to-purple-500/20",
        image: "/projects/hostelfit.png",
        link: "#" // Placeholder for actual link
    },
    {
        title: "AnalytixAI",
        tagline: "Intelligent data analysis engine for real-time insights and decision-making.",
        overview: "A sophisticated analytical platform built for hackathon problem statements, focusing on processing complex datasets to provide actionable business or operational intelligence. (PS-HK20_INNOATIVE-CHAMPS)",
        highlights: [
            "Advanced data processing pipeline for real-time insight generation.",
            "Built to solve high-impact, industry-specific challenges in data analytics.",
            "Focuses on scalability and accuracy in decision-support systems."
        ],
        color: "from-brand-accent/20 to-orange-500/20",
        image: "/projects/analytix.png",
        link: "#"
    },
    {
        title: "Food Adulteration Detection",
        tagline: "Leveraging computer vision to ensure food safety and quality control.",
        overview: "An AI-based computer vision system that identifies impurities and adulterants in food products, helping to bridge the gap between food safety technology and consumer health.",
        highlights: [
            "Uses image processing/deep learning to detect anomalies in food samples.",
            "Provides a scalable solution for quality control in food supply chains.",
            "Demonstrates expertise in applying ML to real-world social and health issues."
        ],
        color: "from-emerald-500/20 to-teal-500/20",
        image: "/projects/food.png",
        link: "#"
    },
    {
        title: "Tourist Safety Website",
        tagline: "A comprehensive digital ecosystem for real-time traveler security and emergency response.",
        overview: "A robust full-stack solution designed for the tourism sector, focusing on geo-fencing, incident reporting, and real-time safety monitoring to ensure a secure travel experience.",
        highlights: [
            "Integrated SOS and emergency alert system for rapid response.",
            "Geospatial tracking features to provide real-time safety updates to users.",
            "Full-stack implementation ensuring secure data handling and user management."
        ],
        color: "from-pink-500/20 to-rose-500/20",
        image: "/projects/tourist.png",
        link: "#"
    }
];

const ProjectCard = ({ project, index }) => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 flex-shrink-0 relative">

            {/* Decorative Background Glow based on project color */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-bl ${project.color} blur-[150px] rounded-full opacity-20 pointer-events-none z-0`}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-20%" }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="w-full max-w-5xl h-[550px] md:h-[450px] glass rounded-2xl border border-white/10 flex flex-col md:flex-row relative z-10 overflow-hidden group hover:scale-[1.02] transition-transform duration-500 shadow-2xl"
            >
                {/* Left Side: Image (50%) */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-neutral-900 border-b md:border-b-0 md:border-r border-white/10">
                    <div className="absolute inset-0 animate-pulse bg-neutral-800 -z-10"></div>
                    <img
                        src={project.image}
                        alt={`${project.title} Interface`}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Subtle overlay gradient to blend image nicely */}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-dark/80 md:from-brand-dark/20 to-transparent pointer-events-none"></div>
                </div>

                {/* Right Side: Text Content (50%) */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-6 md:p-10 relative bg-brand-dark/40 backdrop-blur-sm overflow-y-auto">
                    <div className="flex items-center space-x-3 mb-3 md:mb-4">
                        <span className="font-display text-brand-accent uppercase tracking-[0.2em] text-xs font-bold">
                            0{index + 1}
                        </span>
                        <span className="w-8 h-[1px] bg-white/20"></span>
                    </div>

                    <h3 className="font-display text-2xl md:text-4xl text-white tracking-tight leading-[1.1] uppercase mb-3 drop-shadow-md">
                        {project.title}
                    </h3>

                    <p className="font-sans text-xs md:text-sm text-brand-light/70 font-light leading-relaxed mb-4 line-clamp-3 md:line-clamp-4">
                        {project.overview}
                    </p>

                    {/* List exactly 2 highlights to keep it clean */}
                    <ul className="space-y-2 hidden md:block mt-auto border-t border-white/10 pt-4">
                        {project.highlights.slice(0, 2).map((highlight, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="text-brand-accent mr-2 mt-1 opacity-70 text-[10px]">▹</span>
                                <span className="font-sans text-xs text-brand-light/60 leading-relaxed italic line-clamp-2">
                                    {highlight}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* External Button Container (Centered Below the Card) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 relative z-10"
            >
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold bg-white text-brand-dark uppercase tracking-widest text-xs rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(var(--brand-accent),0.4)] transition-all duration-300"
                >
                    <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        View Project
                    </span>
                </a>
            </motion.div>
        </div>
    );
};

const Projects = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Transform scroll progress (0 to 1) into horizontal pixel movement
    // The percentage must match (number of projects - 1) * 100
    // We adjust it dynamically if possible, or keep it strict
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section
            ref={targetRef}
            id="projects"
            // The height dictates how long the user has to scroll to see all projects.
            // 400vh gives 100vh of scrolling per project.
            className="relative h-[400vh] bg-[#0A0A0A] hidden md:block"
        >
            {/* Sticky container that holds the horizontal slider and background effects */}
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">

                {/* 3D Background */}
                <Background3D />


                {/* Section Header (Fixed while scrolling) */}
                <div className="absolute top-8 md:top-12 left-6 md:left-12 z-20 flex items-center space-x-4">
                    <span className="w-8 h-[1px] bg-brand-accent"></span>
                    <span className="font-display text-brand-accent uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold shadow-black drop-shadow-md">
                        Selected Works
                    </span>
                </div>

                {/* The horizontally translating track */}
                <motion.div style={{ x }} className="flex">
                    {projectsData.map((project, index) => (
                        <ProjectCard project={project} index={index} key={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const MobileProjects = () => {
    return (
        <section id="projects-mobile" className="relative w-full bg-[#0A0A0A] md:hidden py-24 overflow-hidden">
            <Background3D />

            <div className="absolute top-8 left-6 z-20 flex items-center space-x-4 mb-12">
                <span className="w-8 h-[1px] bg-brand-accent"></span>
                <span className="font-display text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold shadow-black drop-shadow-md">
                    Selected Works
                </span>
            </div>

            <div className="flex flex-col space-y-20 mt-12 relative z-10 w-full px-4">
                {projectsData.map((project, index) => (
                    <div key={index} className="flex flex-col items-center w-full">
                        <div className="w-full h-[550px] glass rounded-2xl border border-white/10 flex flex-col relative overflow-hidden group shadow-2xl">

                            {/* Top Side: Image */}
                            <div className="w-full h-1/2 relative overflow-hidden bg-neutral-900 border-b border-white/10">
                                <img
                                    src={project.image}
                                    alt={`${project.title} Interface`}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent pointer-events-none"></div>
                            </div>

                            {/* Bottom Side: Text */}
                            <div className="w-full h-1/2 flex flex-col justify-center p-6 relative bg-brand-dark/40 backdrop-blur-sm">
                                <div className="flex items-center space-x-3 mb-3">
                                    <span className="font-display text-brand-accent uppercase tracking-[0.2em] text-xs font-bold">
                                        0{index + 1}
                                    </span>
                                    <span className="w-8 h-[1px] bg-white/20"></span>
                                </div>

                                <h3 className="font-display text-2xl text-white tracking-tight leading-[1.1] uppercase mb-3 drop-shadow-md">
                                    {project.title}
                                </h3>

                                <p className="font-sans text-xs text-brand-light/70 font-light leading-relaxed mb-4 line-clamp-4">
                                    {project.overview}
                                </p>
                            </div>
                        </div>

                        {/* External Button */}
                        <div className="mt-6">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold bg-white text-brand-dark uppercase tracking-widest text-xs rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-300"
                            >
                                <span className="relative z-10">
                                    View Project
                                </span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const ProjectsWrapper = () => {
    return (
        <>
            <Projects />
            <MobileProjects />
        </>
    );
};

export default ProjectsWrapper;
