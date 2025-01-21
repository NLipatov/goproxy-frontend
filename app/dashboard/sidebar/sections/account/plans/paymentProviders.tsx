import React from "react";
import { FaPaypal, FaStripe } from "react-icons/fa";

interface PaymentProvidersProps {
    onProviderSelect: (provider: string) => void;
}

export function PaymentProviders({ onProviderSelect }: PaymentProvidersProps) {
    const providers = [
        { name: "PayPal", icon: <FaPaypal className="text-3xl text-blue-500" /> },
        { name: "Stripe", icon: <FaStripe className="text-3xl text-purple-500" /> },
    ];

    return (
        <div className="space-y-4">
            {providers.map((provider) => (
                <div
                    key={provider.name}
                    className="flex items-center space-x-4 bg-zinc-800 p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
                    onClick={() => onProviderSelect(provider.name)}
                >
                    {provider.icon}
                    <span className="text-lg font-medium text-white">{provider.name}</span>
                </div>
            ))}
        </div>
    );
}
