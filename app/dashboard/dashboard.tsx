import { Sidebar } from "./sidebar/sidebar";
import dashboardStyles from "./dashboard.module.css";
import { useState } from "react";

export function Dashboard() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState("Proxy");
    const [activeTab, setActiveTab] = useState("Available Proxies");

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
                <h1 className="text-3xl font-bold mb-4">
                    {activeSection} - {activeTab}
                </h1>
                <div className="bg-zinc-800 p-4 rounded-lg shadow-lg text-gray-300">
                    <p>
                        Content for {activeTab} will appear here. This area dynamically
                        changes based on the active tab and section selected from the
                        sidebar.
                    </p>
                </div>
            </main>
        </div>
    );
}
