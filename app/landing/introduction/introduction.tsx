import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import sellingSectionStyles from "./introduction.module.css"

const messages = [
    "values you",
    "cares about your privacy",
    "not introduction your online activity data",
    "not tracking your online activity",
    "not hiding its source code",
    "you can rely on",
];

export function Introduction() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={`${sellingSectionStyles["section"]} bg-black min-h-screen flex flex-col items-center justify-center text-center`}>
            <p className="text-lg text-green-500 mb-4">
                Level up your online security
            </p>

            <h1 className={`text-5xl font-bold mb-6 ${sellingSectionStyles["animated-gradient"]}`}>
                Use proxy that:
            </h1>
            <div className="relative w-full h-40 overflow-hidden flex items-center justify-center">
                <AnimatePresence>
                    <motion.div
                        key={currentIndex}
                        initial={{ y: "10rem" }}
                        animate={{ y: "0" }}
                        exit={{ y: "-10rem" }}
                        transition={{ duration: 0.8 }}
                        className={`${sellingSectionStyles["animated-text"]} absolute w-full text-5xl font-semibold text-green-500 text-center`}
                    >
                        {messages[currentIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>
            <p className="text-gray-400 mt-6">
                Transparent, open-source, and privacy-first approach.
            </p>

            <button className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition-all duration-300 m-2">
                Get Started
            </button>


        </section>
    );
}
