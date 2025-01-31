import React from "react";
import sidebarStyles from "./sidebar.module.css";
import { SECTIONS } from "../sections";

interface SidebarProps {
    currentSectionSlug: string;
    currentTabSlug: string;
    onSectionTabChange: (sectionSlug: string, tabSlug: string) => void;
}

export function Sidebar({ currentSectionSlug, currentTabSlug, onSectionTabChange }: SidebarProps) {
    return (
        <aside className={`fixed left-0 top-0 h-full ${sidebarStyles["sidebar"]}`}>
            <div className="p-4 flex items-center border-b border-gray-700">
                <h1 className="text-2xl font-bold text-white">ηProxy</h1>
            </div>
            <div className="p-4 space-y-4">
                {SECTIONS.map((section) => {
                    const isActive = currentSectionSlug === section.slug;
                    return (
                        <div key={section.slug}>
                            <div
                                className={`flex items-center cursor-pointer p-3 rounded-lg ${
                                    isActive
                                        ? sidebarStyles["bg-active"]
                                        : "text-gray-400 hover:text-green-500 hover:bg-gray-800"
                                } transition-all duration-300`}
                                onClick={() => onSectionTabChange(section.slug, section.tabs[0].slug)}
                            >
                                <section.icon className="text-xl" />
                                <span className="ml-3 font-medium">{section.label}</span>
                            </div>
                            {isActive && (
                                <ul className="mt-2 space-y-2 pl-8">
                                    {section.tabs.map((t) => {
                                        const isActiveTab = currentTabSlug === t.slug;
                                        return (
                                            <li
                                                key={t.slug}
                                                className={`cursor-pointer ${
                                                    isActiveTab
                                                        ? "text-green-400 font-semibold"
                                                        : "text-gray-500"
                                                } hover:text-green-500 transition-all`}
                                                onClick={() => onSectionTabChange(section.slug, t.slug)}
                                            >
                                                {t.label}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}
