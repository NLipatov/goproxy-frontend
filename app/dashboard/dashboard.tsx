import { Sidebar } from "./sidebar/sidebar";
import dashboardStyles from "./dashboard.module.css";
import React, { useState } from "react";
import { Credentials } from "~/dashboard/sidebar/sections/proxy/credentials/credentials";
import {Usage} from "~/dashboard/sidebar/sections/proxy/usage/usage"
import {GoogleChrome} from "~/dashboard/sidebar/sections/start/googlechrome/googlechrome";
import {Firefox} from "~/dashboard/sidebar/sections/start/firefox/firefox";
import {IOS} from "~/dashboard/sidebar/sections/start/ios/ios";
import {LinuxProxySetup} from "~/dashboard/sidebar/sections/start/linux/linux";
import {WindowsProxySetup} from "~/dashboard/sidebar/sections/start/windows/windows";

export function Dashboard() {
    const [activeSection, setActiveSection] = useState("Start");
    const [activeTab, setActiveTab] = useState("Google Chrome");

    const contentMap: Record<string, Record<string, React.ReactNode>> = {
        Start: {
            "Google Chrome": <GoogleChrome />,
            "Firefox": <Firefox />,
            "iOS": <IOS />,
            "Windows": <WindowsProxySetup />,
            "Linux": <LinuxProxySetup />,
        },
        Proxy: {
            "Usage": <Usage />,
            "Credentials": <Credentials />,
        },
        Account: {
            "Plans": (
                <div></div>
            ),
            "Billing": (
                <div className="bg-zinc-800 p-4 rounded-lg shadow-lg text-gray-300">
                    <p>Here you can manage your billing information.</p>
                </div>
            ),
            "Settings": (
                <div className="bg-zinc-800 p-4 rounded-lg shadow-lg text-gray-300">
                    <p>Here you can update your account settings.</p>
                </div>
            ),
        },
        "Support": {
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
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <main
                className={`${dashboardStyles["main"]} ${
                        dashboardStyles["main-expanded"]
                }`}
            >
                {renderContent()}
            </main>
        </div>
    );
}
