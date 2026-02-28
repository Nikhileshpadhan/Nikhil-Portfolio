import React, { useState, useEffect } from "react";
import Lenis from '@studio-freight/lenis';
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
    const [loading, setLoading] = useState(true);

    // Lock scrolling while loading & Initialize Lenis
    useEffect(() => {
        // Initialize Lenis for ultra-smooth scrolling
        const lenis = new Lenis({
            duration: 1.2, // increased duration for smoother, "faster" feeling glide
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // native-feeling ease
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1.5, // slightly faster wheel scroll
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        if (loading) {
            document.body.style.overflow = 'hidden';
            lenis.stop(); // Stop lenis while loading
        } else {
            document.body.style.overflow = 'auto';
            lenis.start();
        }

        return () => {
            document.body.style.overflow = 'auto';
            lenis.destroy(); // Cleanup on unmount
        };
    }, [loading]);

    return (
        <>
            <CustomCursor />
            <Preloader onLoadingComplete={() => setLoading(false)} />

            {!loading && (
                <main className="min-h-[200vh] bg-brand-dark text-brand-light">
                    <Navbar />
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Contact />
                </main>
            )}
        </>
    );
}

export default App;
