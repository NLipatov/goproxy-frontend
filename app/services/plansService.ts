export const plans = [
    {
        name: "Free",
        description: "Start exploring secure and private browsing for free.",
        currency: "$",
        price: "0",
        period: "/day",
        features: [
            "Limited bandwidth (300MB/day)",
            "Up to 1 Gbps connection speed",
            "Up to 25 simultaneous connections",
            "No activity logging",
            "Blocked for 30 seconds upon exceeding rate limits",
        ],
    },
    {
        name: "Plus",
        description: "Advanced features for everyday secure browsing.",
        currency: "$",
        price: "5",
        period: "/month",
        features: [
            "Unlimited bandwidth",
            "Up to 1 Gbps connection speed",
            "Up to 25 simultaneous connections",
            "No activity logging",
            "Blocked for 30 seconds upon exceeding rate limits",
        ],
    },
    {
        name: "Pro",
        description: "Ultimate performance and security for professionals.",
        currency: "$",
        price: "45",
        period: "/year",
        features: ["Includes everything in Plus", "25% cheaper than Plus"],
    },
];

export const GetPlans = () => {
    return plans;
};
