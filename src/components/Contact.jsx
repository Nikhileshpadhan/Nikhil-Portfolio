import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

// Custom Magnetic Button for the Contact form
const MagneticButton = ({ children, className, ...props }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 }); // pull heavily
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative overflow-hidden group ${className}`}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            <span className="absolute inset-0 bg-brand-accent transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></span>
        </motion.button>
    );
};

// Custom Input field with glowing animated bottom border
const FloatingInput = ({ label, type = "text", id, textarea = false, value, onChange, name, required = false }) => {
    const [focused, setFocused] = useState(false);
    const hasValue = value && value.length > 0;

    return (
        <div className="relative w-full mb-8">
            {textarea ? (
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full bg-transparent border-b border-white/20 text-white font-sans text-lg py-3 focus:outline-none resize-none hide-scrollbar"
                    rows={4}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full bg-transparent border-b border-white/20 text-white font-sans text-lg py-3 focus:outline-none"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            )}

            <label
                htmlFor={id}
                className={`absolute left-0 cursor-text font-sans transition-all duration-300 pointer-events-none ${focused || hasValue
                    ? "-top-4 text-xs text-brand-accent font-bold uppercase tracking-widest"
                    : "top-3 text-brand-light/50 text-base"
                    }`}
            >
                {label}
            </label>

            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-brand-accent origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focused ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ width: "100%" }}
            />
        </div>
    );
};

const Contact = () => {
    const containerRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\n\nMessage:\n${formData.message}`
        );

        window.location.href = `mailto:nikhilesh.coder@gmail.com?subject=${subject}&body=${body}`;

        setFormData({ name: "", email: "", company: "", message: "" });
    };

    // Subtle scroll parallax for the section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    // 3D Parallax Mouse Tracking for the Left Side Text
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
    const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-30px", "30px"]);
    const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-30px", "30px"]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

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
            id="contact"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-screen w-full bg-brand-dark flex items-center justify-center overflow-hidden noise-bg px-6 py-24 md:p-12 lg:p-24"
        >
            {/* Cinematic Background Glows */}
            <motion.div
                style={{ y: yBackground }}
                className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
            >
                <div className="w-[80vw] h-[80vw] max-w-4xl max-h-4xl bg-brand-accent/5 blur-[200px] rounded-full mix-blend-screen"></div>
            </motion.div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">

                {/* LEFT SIDE: Massive 3D Parallax Typography */}
                <div className="flex flex-col justify-center h-full perspective-[1200px] pointer-events-none lg:pointer-events-auto">
                    <motion.div
                        style={{
                            rotateX,
                            rotateY,
                            x: translateX,
                            y: translateY,
                            transformStyle: "preserve-3d"
                        }}
                        className="relative"
                    >
                        <h2 className="font-display font-black text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/20 drop-shadow-2xl">
                            LET'S
                            <br />
                            <span className="text-brand-accent">TALK.</span>
                        </h2>

                        <p className="font-sans text-brand-light/60 text-lg md:text-xl font-light max-w-sm mt-8" style={{ transform: "translateZ(40px)" }}>
                            Have an inspired idea, a project in mind, or just want to say hi? I'm always open to discussing new opportunities.
                        </p>
                    </motion.div>

                    {/* Social Links Container */}
                    <div className="mt-12 md:mt-16 flex flex-wrap md:flex-nowrap items-center gap-6 md:space-x-8 pointer-events-auto">
                        <a href="mailto:nikhilesh.coder@gmail.com" className="font-display text-xs tracking-[0.2em] text-white hover:text-brand-accent transition-colors uppercase font-bold relative group">
                            Email
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="https://www.linkedin.com/in/nikhilesh-padhan-57b506308?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="font-display text-xs tracking-[0.2em] text-white hover:text-brand-accent transition-colors uppercase font-bold relative group whitespace-nowrap">
                            LinkedIn
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="https://github.com/Nikhileshpadhan" className="font-display text-xs tracking-[0.2em] text-white hover:text-brand-accent transition-colors uppercase font-bold relative group">
                            GitHub
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </div>
                </div>

                {/* RIGHT SIDE: Interactive Glassmorphic Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-20%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="flex flex-col justify-center"
                >
                    <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">

                        {/* Hover flare top border */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FloatingInput id="name" name="name" label="What's your name?" value={formData.name} onChange={handleChange} required={true} />
                                <FloatingInput id="email" name="email" type="email" label="Your email?" value={formData.email} onChange={handleChange} required={true} />
                            </div>

                            <div className="mt-4">
                                <FloatingInput id="company" name="company" label="Company / Organization (Optional)" value={formData.company} onChange={handleChange} />
                            </div>

                            <div className="mt-4">
                                <FloatingInput id="message" name="message" label="Tell me about your project..." textarea={true} value={formData.message} onChange={handleChange} required={true} />
                            </div>

                            <div className="pt-8 flex justify-end">
                                <MagneticButton
                                    type="submit"
                                    className="px-10 py-5 rounded-full border border-white/20 bg-transparent text-white font-display text-xs tracking-[0.2em] uppercase font-bold transition-colors cursor-pointer"
                                >
                                    <span className="relative z-10 flex items-center">
                                        Send Message
                                        <svg className="w-4 h-4 ml-3 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </MagneticButton>
                            </div>
                        </form>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Contact;
