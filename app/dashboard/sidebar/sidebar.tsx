import React from "react";
import { FaServer, FaUser, FaRocket, FaQuestionCircle } from "react-icons/fa";
import sidebarStyles from "./sidebar.module.css";

interface SidebarProps {
    section: string;
    tab: string;
    onSectionTabChange: (section: string, tab: string) => void;
}

const sections = [
    {
        name: "Start",
        tabs: [
            { name: "Google Chrome" },
            { name: "Firefox" },
            { name: "iOS" },
            { name: "Windows" },
            { name: "Linux" },
        ],
        icon: FaRocket,
    },
    {
        name: "Proxy",
        tabs: [
            { name: "Usage" },
            { name: "Credentials" },
        ],
        icon: FaServer,
    },
    {
        name: "Account",
        tabs: [
            { name: "Plans" },
            { name: "Billing" },
            { name: "Settings" },
        ],
        icon: FaUser,
    },
    {
        name: "Support",
        tabs: [
            { name: "Help Center" },
            { name: "Contact Us" },
        ],
        icon: FaQuestionCircle,
    },
];

export function Sidebar({ section, tab, onSectionTabChange }: SidebarProps) {
    return (
        <aside className={`fixed left-0 top-0 h-full ${sidebarStyles["sidebar"]}`}>
            <div className="p-4 flex items-center border-b border-gray-700">
                <h1 className="text-2xl font-bold text-white">ηProxy</h1>
            </div>

            <div className="p-4 space-y-4">
                {sections.map((s) => (
                    <div key={s.name}>
                        {/* Заголовок секции */}
                        <div
                            className={`flex items-center cursor-pointer p-3 rounded-lg ${
                                section === s.name
                                    ? sidebarStyles["bg-active"]
                                    : "text-gray-400 hover:text-green-500 hover:bg-gray-800"
                            } transition-all duration-300`}
                            onClick={() => onSectionTabChange(s.name, s.tabs[0].name)}
                        >
                            <s.icon className="text-xl" />
                            <span className="ml-3 font-medium">{s.name}</span>
                        </div>

                        {/* Список вкладок (открывается только в активной секции) */}
                        {section === s.name && (
                            <ul className="mt-2 space-y-2 pl-8">
                                {s.tabs.map((t) => (
                                    <li
                                        key={t.name}
                                        className={`cursor-pointer ${
                                            tab === t.name
                                                ? "text-green-400 font-semibold"
                                                : "text-gray-500"
                                        } hover:text-green-500 transition-all`}
                                        onClick={() => onSectionTabChange(s.name, t.name)}
                                    >
                                        {t.name}
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
