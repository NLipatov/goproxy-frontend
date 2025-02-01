import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import dashboardStyles from "./dashboard.module.css";
import { Sidebar } from "./sidebar/sidebar";
import { Credentials } from "~/dashboard/sidebar/sections/proxy/credentials/credentials";
import { Usage } from "~/dashboard/sidebar/sections/proxy/usage/usage";
import { GoogleChrome } from "~/dashboard/sidebar/sections/start/googlechrome/googlechrome";
import { Firefox } from "~/dashboard/sidebar/sections/start/firefox/firefox";
import { IOS } from "~/dashboard/sidebar/sections/start/ios/ios";
import { LinuxProxySetup } from "~/dashboard/sidebar/sections/start/linux/linux";
import { WindowsProxySetup } from "~/dashboard/sidebar/sections/start/windows/windows";
import { Plans } from "~/dashboard/sidebar/sections/proxy/plans/plans";

const contentMap: Record<string, Record<string, React.ReactNode>> = {
    start: {
        "google-chrome": <GoogleChrome />,
        firefox: <Firefox />,
        ios: <IOS />,
        windows: <WindowsProxySetup />,
        linux: <LinuxProxySetup />,
    },
    proxy: {
        plans: <Plans />,
        usage: <Usage />,
        credentials: <Credentials />,
    },
    account: {
        billing: <div>Billing info</div>,
        settings: <div>Account settings</div>,
    },
    support: {
        "help-center": <div>Help Center</div>,
        "contact-us": <div>Contact Us</div>,
    },
};

export function Dashboard() {
    const { section = "proxy", tab = "plans" } = useParams();
    const navigate = useNavigate();
    const data = contentMap[section];
    const content = data ? data[tab] || <div>Tab not found</div> : <div>Section not found</div>;
    function handleSectionTabChange(s: string, t: string) {
        navigate(`/dashboard/${s}/${t}`);
    }
    return (
        <div className={dashboardStyles["dashboard"]}>
            <Sidebar
                currentSectionSlug={section}
                currentTabSlug={tab}
                onSectionTabChange={handleSectionTabChange}
            />
            <main className={`${dashboardStyles["main"]} ${dashboardStyles["main-expanded"]}`}>
                {content}
            </main>
        </div>
    );
}
