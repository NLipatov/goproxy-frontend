import { FaRocket, FaServer, FaUser, FaQuestionCircle } from "react-icons/fa";

export const SECTIONS = [
    {
        slug: "start",
        label: "Start",
        icon: FaRocket,
        tabs: [
            { slug: "google-chrome", label: "Google Chrome" },
            { slug: "firefox", label: "Firefox" },
            { slug: "ios", label: "iOS" },
            { slug: "windows", label: "Windows" },
            { slug: "linux", label: "Linux" },
        ],
    },
    {
        slug: "proxy",
        label: "Proxy",
        icon: FaServer,
        tabs: [
            { slug: "usage", label: "Usage" },
            { slug: "credentials", label: "Credentials" },
        ],
    },
    {
        slug: "account",
        label: "Account",
        icon: FaUser,
        tabs: [
            { slug: "plans", label: "Plans" },
            { slug: "billing", label: "Billing" },
            { slug: "settings", label: "Settings" },
        ],
    },
    {
        slug: "support",
        label: "Support",
        icon: FaQuestionCircle,
        tabs: [
            { slug: "help-center", label: "Help Center" },
            { slug: "contact-us", label: "Contact Us" },
        ],
    },
];
