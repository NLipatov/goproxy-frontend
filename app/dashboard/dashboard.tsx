import { Sidebar } from "./sidebar/sidebar";
import dashboardStyles from "./dashboard.module.css";
import { useState } from "react";

export function Dashboard() {
    const [activeSection, setActiveSection] = useState("Proxy");
    const [activeTab, setActiveTab] = useState("Available Proxies");

    return (
        <div className={`${dashboardStyles["dashboard"]} flex`}>
            <Sidebar />
            <main className="flex-grow p-6 bg-gradient-to-b from-black to-zinc-800 text-white">
                <h1 className="text-3xl font-bold mb-4">{activeSection} - {activeTab}</h1>
                <div className="bg-zinc-800 p-4 rounded-lg shadow-lg text-gray-300">
                    <p>Content for {activeTab} will appear here. This area dynamically changes based on the active tab and section selected from the sidebar.</p>
                </div>
            </main>
        </div>
    );
}
