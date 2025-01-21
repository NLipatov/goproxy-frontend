import { useState } from "react";

const faqData = [
    {
        question: "What is ηProxy?",
        answer:
            "ηProxy is a secure and open-source HTTP proxy designed to protect your online privacy.",
    },
    {
        question: "Why should I trust your commitment to data protection?",
        answer:
            "Don't trust—verify. Our source code is open because we have nothing to hide from our users",
    },
    {
        question: "How does ηProxy protect my data?",
        answer:
            "We don't track your activity, don't log your data, and our source code is open for review to ensure transparency.",
    },
    {
        question: "What are the benefits of using ηProxy?",
        answer:
            "ηProxy provides fast, secure, and reliable connections with no hidden tracking or data introduction.",
    },
    {
        question: "Is there a free plan available?",
        answer:
            "Yes, we offer a free plan with limited bandwidth of 300MB per day. You can upgrade anytime for more features and no bandwidth restrictions.",
    },
    {
        question: "What is included in the Plus plan?",
        answer:
            "The Plus plan includes unlimited bandwidth, up to 1 Gbps connection speed, support for up to 25 simultaneous connections, and no activity logging.",
    },
    {
        question: "What is included in the Pro plan?",
        answer:
            "The Pro plan includes everything in the Plus plan and is 25% cheaper on an annual basis. It's perfect for professionals who need long-term reliability.",
    },
    {
        question: "What are the limits?",
        answer:
            "nProxy allows up to 25 simultaneous connections per user with a connection speed of up to 1 Gbps. If limits are exceeded, access is temporarily blocked for 30 seconds.",
    },
    {
        question: "Why is rate limiting applied?",
        answer:
            "Rate limiting is implemented to ensure fair usage and prevent misuse such as DDoS attacks, brute force attempts, or other unauthorized activities. If limits are exceeded, access is temporarily blocked for 30 seconds.",
    },
    {
        question: "What is the maximum connection speed?",
        answer:
            "All usage offer connection speeds of up to 1 Gbps, ensuring fast and reliable performance for your needs.",
    },
    {
        question: "How many simultaneous connections are supported?",
        answer:
            "ηProxy supports up to 25 simultaneous connections per user, ensuring flexibility for your browsing or API usage.",
    },
    {
        question: "Can I change my plan later?",
        answer:
            "Yes, you can upgrade or downgrade your plan anytime to suit your needs.",
    }
];


export function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section
            id="FAQ"
            className="bg-black py-16 scroll-mt-4 px-6 md:px-12 text-white text-center"
        >
            <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-4">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-zinc-800 rounded-lg shadow-lg p-4 cursor-pointer transition-all duration-300"
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">{faq.question}</h3>
                            <span
                                className={`transform ${
                                    activeIndex === index ? "rotate-180" : ""
                                } transition-transform duration-300`}
                            >
                                ▼
                            </span>
                        </div>
                        {activeIndex === index && (
                            <p className="mt-4 text-gray-300 text-left">
                                {faq.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
