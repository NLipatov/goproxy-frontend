import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // или @remix-run/react
import { Sidebar } from "./sidebar/sidebar";
import dashboardStyles from "./dashboard.module.css";

import { Credentials } from "~/dashboard/sidebar/sections/proxy/credentials/credentials";
import { Usage } from "~/dashboard/sidebar/sections/proxy/usage/usage";
import { GoogleChrome } from "~/dashboard/sidebar/sections/start/googlechrome/googlechrome";
import { Firefox } from "~/dashboard/sidebar/sections/start/firefox/firefox";
import { IOS } from "~/dashboard/sidebar/sections/start/ios/ios";
import { LinuxProxySetup } from "~/dashboard/sidebar/sections/start/linux/linux";
import { WindowsProxySetup } from "~/dashboard/sidebar/sections/start/windows/windows";
import { Plans } from "~/dashboard/sidebar/sections/account/plans/plans";

export function Dashboard() {
    const { section = "Start", tab = "Google Chrome" } = useParams();
    const navigate = useNavigate();

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
            "Plans": <Plans />,
            "Billing": <div>Billing info</div>,
            "Settings": <div>Account settings</div>,
        },
        Support: {
            "Help Center": <div>Help Center content</div>,
            "Contact Us": <div>Contact form</div>,
        },
    };

    // Смотрим, что рендерить
    const currentSection = contentMap[section];
    const content = currentSection ? currentSection[tab] || <p>Tab not found</p> : <p>Empty</p>;

    // При клике на секцию/таб в сайдбаре
    const handleSectionTabChange = (newSection: string, newTab: string) => {
        navigate(`/dashboard/${newSection}/${newTab}`);
    };

    return (
        <div className={dashboardStyles["dashboard"]}>
            <Sidebar
                section={section}
                tab={tab}
                onSectionTabChange={handleSectionTabChange}
            />
            <main className={`${dashboardStyles["main"]} ${dashboardStyles["main-expanded"]}`}>
                {content}
            </main>
        </div>
    );
}
