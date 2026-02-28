import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MagneticLink = ({ children, href, onClick }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            onClick={onClick}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="relative px-4 py-2 text-sm font-medium text-brand-light/70 hover:text-white transition-colors uppercase tracking-wider group"
        >
            <span className="relative z-10">{children}</span>
            <span className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-md"></span>
        </motion.a>
    );
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Collapse navbar when scrolled past 100px
            setScrolled(window.scrollY > 100);
            if (window.scrollY <= 100) {
                setMenuOpen(false); // Auto-close menu if scrolled back to top
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <AnimatePresence>
                {!scrolled && (
                    <motion.nav
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed top-0 left-0 w-full z-50 bg-transparent py-6"
                    >
                        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                            {/* Brand Logo */}
                            <motion.div
                                className="font-display text-xl md:text-2xl font-bold tracking-tighter"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <a href="#" className="relative group flex items-baseline">
                                    <span className="text-white">NIKHIL</span>
                                    <span className="text-brand-accent">.DEV</span>
                                </a>
                            </motion.div>

                            {/* Desktop Links */}
                            <div className="hidden md:flex items-center space-x-2">
                                <MagneticLink href="#home">Home</MagneticLink>
                                <MagneticLink href="#about">About</MagneticLink>
                                <MagneticLink href="#skills">Skills</MagneticLink>
                                <MagneticLink href="#projects">Projects</MagneticLink>
                                <MagneticLink href="#contact">Contact</MagneticLink>
                            </div>

                            {/* Action Button */}
                            <div className="hidden md:block border border-white/20 rounded-full overflow-hidden hover:border-pink-500 transition-colors">
                                <MagneticLink href="#contact" onClick={(e) => {
                                    // Make sure it doesn't just do the default text hover
                                    e.currentTarget.classList.add("hover:text-pink-500");
                                }}>Let's Talk</MagneticLink>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Floating 3-Dot Collapsed Menu */}
            <AnimatePresence>
                {scrolled && (
                    <motion.div
                        onMouseLeave={() => setMenuOpen(false)}
                        initial={{ y: -100, x: "-50%", opacity: 0 }}
                        animate={{ y: 0, x: "-50%", opacity: 1 }}
                        exit={{ y: -100, x: "-50%", opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed top-6 left-1/2 z-[100] flex flex-col items-center"
                    >
                        <motion.button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="glass px-6 py-3 rounded-full flex items-center space-x-2 border border-white/10 hover:border-brand-accent/50 transition-colors group cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex space-x-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-brand-accent transition-colors duration-300" />
                                <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-brand-accent transition-colors duration-300 delay-75" />
                                <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-brand-accent transition-colors duration-300 delay-150" />
                            </div>
                            <span className="ml-2 font-display text-xs tracking-widest uppercase text-white font-bold hidden sm:block pointer-events-none">
                                {menuOpen ? "Close" : "Menu"}
                            </span>
                        </motion.button>

                        {/* Expanded Menu Dropdown */}
                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                                    className="absolute top-full pt-4 min-w-[200px]"
                                >
                                    <div className="glass border border-white/10 rounded-3xl p-4 flex flex-col space-y-1">
                                        <MagneticLink href="#home" onClick={() => setMenuOpen(false)}>Home</MagneticLink>
                                        <MagneticLink href="#about" onClick={() => setMenuOpen(false)}>About</MagneticLink>
                                        <MagneticLink href="#skills" onClick={() => setMenuOpen(false)}>Skills</MagneticLink>
                                        <MagneticLink href="#projects" onClick={() => setMenuOpen(false)}>Projects</MagneticLink>
                                        <MagneticLink href="#contact" onClick={() => setMenuOpen(false)}>Contact</MagneticLink>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Brand Logo when scrolled (optional nice touch) */}
            <AnimatePresence>
                {scrolled && (
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="fixed top-6 left-6 md:left-12 z-50 pointer-events-none"
                    >
                        <div className="font-display text-xl font-bold tracking-tighter mix-blend-difference flex items-baseline">
                            <span className="text-white">NIKHIL</span>
                            <span className="text-brand-accent">.DEV</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
