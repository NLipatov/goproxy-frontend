import React from "react";
import {
    FaServer,
    FaUser,
    FaRocket,
    FaQuestionCircle,
} from "react-icons/fa";
import sidebarStyles from "./sidebar.module.css";
import { Credentials } from "~/dashboard/sidebar/sections/proxy/credentials";
import { Usage } from "~/dashboard/sidebar/sections/proxy/plans/usage";
import {GoogleChrome} from "~/dashboard/sidebar/sections/start/googlechrome/googlechrome";
import {Firefox} from "~/dashboard/sidebar/sections/start/firefox/firefox";
import {IOS} from "~/dashboard/sidebar/sections/start/ios/ios";
import {LinuxProxySetup} from "~/dashboard/sidebar/sections/start/linux/linux";
import {WindowsProxySetup} from "~/dashboard/sidebar/sections/start/windows/windows";

interface SidebarProps {
    activeSection: string;
    setActiveSection: (value: string) => void;
    activeTab: string;
    setActiveTab: (value: string) => void;
}

const sections = [
    {
        name: "Start",
        tabs: [
            { name: "Google Chrome", GoogleChrome: <GoogleChrome />, },
            { name: "Firefox", GoogleChrome: <Firefox />, },
            { name: "iOS", iOS: <IOS />},
            { name: "Windows", iOS: <WindowsProxySetup />},
            { name: "Linux", iOS: <LinuxProxySetup />},
        ],
        icon: FaRocket,
    },
    {
        name: "Proxy",
        tabs: [
            { name: "Usage", component: () => <Usage /> },
            { name: "Credentials", component: () => <Credentials /> },
        ],
        icon: FaServer,
    },
    {
        name: "Account",
        tabs: [
            { name: "Billing", component: () => <div>Billing Details</div> },
            { name: "Available", component: () => <div>Account Settings</div> },
        ],
        icon: FaUser,
    },
    {
        name: "Support",
        tabs: [
            { name: "Help Center", component: () => <div>Help Center Content</div> },
            { name: "Contact Us", component: () => <div>Contact Us Content</div> },
        ],
        icon: FaQuestionCircle,
    },
];

export function Sidebar({
                            activeSection,
                            setActiveSection,
                            activeTab,
                            setActiveTab,
                        }: SidebarProps) {
    return (
        <aside className={`fixed left-0 top-0 h-full ${sidebarStyles["sidebar"]}`}>
            <div className={`p-4 flex items-center border-b border-gray-700`}>
                <h1 className="text-2xl font-bold text-white">ηProxy</h1>
            </div>

            <div className="p-4 space-y-4">
                {sections.map((section) => (
                    <div key={section.name}>
                        <div
                            className={`flex items-center cursor-pointer p-3 rounded-lg ${
                                activeSection === section.name
                                    ? sidebarStyles["bg-active"]
                                    : "text-gray-400 hover:text-green-500 hover:bg-gray-800"
                            } transition-all duration-300`}
                            onClick={() => {
                                setActiveSection(section.name);
                                setActiveTab(section.tabs[0].name);
                            }}
                        >
                            <section.icon className="text-xl" />
                            <span className="ml-3 font-medium">{section.name}</span>
                        </div>

                        {activeSection === section.name && (
                            <ul className="mt-2 space-y-2 pl-8">
                                {section.tabs.map((tab) => (
                                    <li
                                        key={tab.name}
                                        className={`cursor-pointer ${
                                            activeTab === tab.name
                                                ? "text-green-400 font-semibold"
                                                : "text-gray-500"
                                        } hover:text-green-500 transition-all`}
                                        onClick={() => setActiveTab(tab.name)}
                                    >
                                        {tab.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
}
