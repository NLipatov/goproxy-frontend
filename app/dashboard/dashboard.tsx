import { Sidebar } from "./sidebar/sidebar";
import dashboardStyles from "./dashboard.module.css";
import React, { useState } from "react";
import { Credentials } from "./sidebar/Sections/Proxy/credentials";
import {Plans} from "./sidebar/Sections/Proxy/plans"

export function Dashboard() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState("Proxy");
    const [activeTab, setActiveTab] = useState("Available Proxies");

    const contentMap: Record<string, Record<string, React.ReactNode>> = {
        Proxy: {
            "Available Proxies": (
                <div className="bg-zinc-800 p-4 rounded-lg shadow-lg text-gray-300">
                    <p>Here you can see the available proxies.</p>
                </div>
            ),
            Credentials: <Credentials />,
            Plans: <Plans />,

        },
        Account: {
            Billing: (
                <div className="bg-zinc-800 p-4 rounded-lg shadow-lg text-gray-300">
                    <p>Here you can manage your billing information.</p>
                </div>
            ),
            Settings: (
                <div className="bg-zinc-800 p-4 rounded-lg shadow-lg text-gray-300">
                    <p>Here you can update your account settings.</p>
                </div>
            ),
        },
        Support: {
            "Help Center": (
                <div className="bg-zinc-800 p-4 rounded-lg shadow-lg text-gray-300">
                    <p>Visit our Help Center for FAQs and documentation.</p>
                </div>
            ),
            "Contact Us": (
                <div className="bg-zinc-800 p-4 rounded-lg shadow-lg text-gray-300">
                    <p>Contact our support team for assistance.</p>
                </div>
            ),
        },
    };

    const renderContent = () => {
        const section = contentMap[activeSection];
        return section ? section[activeTab] || <p>Tab not found</p> : <p>Oops, nothing here</p>;
    };

    return (
        <div className={dashboardStyles["dashboard"]}>
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <main
                className={`${dashboardStyles["main"]} ${
                    isSidebarCollapsed
                        ? dashboardStyles["main-collapsed"]
                        : dashboardStyles["main-expanded"]
                }`}
            >
                {renderContent()}
            </main>
        </div>
    );
}
