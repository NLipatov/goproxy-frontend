import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import sellingSectionStyles from "./introduction.module.css"
import {
    FaChrome,
    FaFirefox,
    FaAndroid,
    FaApple,
    FaLinux,
    FaWindows,
} from "react-icons/fa";
import {Button} from "~/sharedComponent/Button";
import {useAuth} from "~/hooks/useAuth";

const messages = [
    "values you",
    "cares about your privacy",
    "not introduction your online activity data",
    "not tracking your online activity",
    "not hiding its source code",
    "you can rely on",
];

const platforms = [
    { name: "Windows", icon: <FaWindows className="text-3xl" /> },
    { name: "macOS", icon: <FaApple className="text-3xl" /> },
    { name: "Linux", icon: <FaLinux className="text-3xl" /> },
    { name: "Android", icon: <FaAndroid className="text-3xl" /> },
    { name: "Chrome", icon: <FaChrome className="text-3xl" /> },
    { name: "Firefox", icon: <FaFirefox className="text-3xl" /> },
];

export function Introduction() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { login } = useAuth();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={`${sellingSectionStyles["section"]} bg-black min-h-screen flex flex-col items-center justify-center text-center mt-4`}>
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
            <p className="text-gray-400 mt-6 mb-6">
                Transparent, open-source, and privacy-first approach.
            </p>

            <Button onClick={login} label={"Get Started"}/>

            <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-300 mb-4">
                    Supported Platforms
                </h2>
                <div className="flex justify-center space-x-6">
                    {platforms.map((platform) => (
                        <div key={platform.name} className="text-gray-400 hover:text-green-500 transition-colors">
                            <div className="flex flex-col items-center">
                                {platform.icon}
                                <span className="mt-2 text-sm">{platform.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
