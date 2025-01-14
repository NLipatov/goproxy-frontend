import React from "react";
import {
    FaBars,
    FaServer,
    FaUser,
    FaRocket,
    FaQuestionCircle,
} from "react-icons/fa";
import sidebarStyles from "./sidebar.module.css";

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    activeSection: string;
    setActiveSection: (value: string) => void;
    activeTab: string;
    setActiveTab: (value: string) => void;
}

const sections = [
    { name: "Start", tabs: ["Google Chrome", "Firefox", "iOS", "Android", "Linux", "MacOS", "Windows"], icon: FaRocket },
    { name: "Proxy", tabs: ["Locations", "Settings"], icon: FaServer },
    { name: "Account", tabs: ["Billing", "Settings"], icon: FaUser },
    { name: "Support", tabs: ["Help Center", "Contact Us"], icon: FaQuestionCircle },
];

export function Sidebar({
                            isCollapsed,
                            setIsCollapsed,
                            activeSection,
                            setActiveSection,
                            activeTab,
                            setActiveTab,
                        }: SidebarProps) {
    return (
        <aside
            className={`fixed left-0 top-0 h-full ${
                isCollapsed ? sidebarStyles["sidebar-collapsed"] : sidebarStyles["sidebar"]
            }`}
        >
            <div className={`p-4 flex items-center justify-between border-b border-gray-700 ${
                isCollapsed ? sidebarStyles["sidebar-collapsed"] : sidebarStyles["sidebar"]
            }`}>
                {!isCollapsed && (
                    <h1 className="text-2xl font-bold text-white">ηProxy</h1>
                )}
                <button
                    className="text-gray-400 hover:text-green-500 transition-all"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <FaBars className="text-2xl" />
                </button>
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
                                setActiveTab(section.tabs[0]);
                            }}
                        >
                            <section.icon className="text-xl" />
                            {!isCollapsed && (
                                <span className="ml-3 font-medium">{section.name}</span>
                            )}
                        </div>

                        {!isCollapsed && activeSection === section.name && (
                            <ul className="mt-2 space-y-2 pl-8">
                                {section.tabs.map((tab) => (
                                    <li
                                        key={tab}
                                        className={`cursor-pointer ${
                                            activeTab === tab
                                                ? "text-green-400 font-semibold"
                                                : "text-gray-500"
                                        } hover:text-green-500 transition-all`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
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
