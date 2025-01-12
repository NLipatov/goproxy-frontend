import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { SellingSection } from "~/selling-section/selling-section";
import headerStyles from "./header.module.css";

export function Header() {
    return (
        <div>
            <header className={`${headerStyles["header"]} fixed top-0 w-full backdrop-blur-md bg-black/50 z-50 shadow-md p-4`}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="text-white text-xl font-semibold">ηProxy</span>
                    </div>

                    <nav className="flex space-x-6">
                        <a
                            href="#Pricing"
                            className="text-white/80 hover:text-green-500 transition-colors duration-300"
                        >
                            Pricing
                        </a>
                        <a
                            href="#FAQ"
                            className="text-white/80 hover:text-green-500 transition-colors duration-300"
                        >
                            FAQ
                        </a>
                    </nav>


                    <a
                        href="#Login"
                        className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition-all duration-300"
                    >
                        Log in
                    </a>


                </div>
            </header>
            <SellingSection />
        </div>
    );
}
