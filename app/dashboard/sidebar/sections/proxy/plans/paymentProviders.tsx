import React from "react";

interface PaymentProvidersProps {
    onProviderSelect: (provider: string) => void;
}

export function PaymentProviders({ onProviderSelect }: PaymentProvidersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button
                onClick={() => onProviderSelect("MockProviderA")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition-all duration-300"
            >
                Pay with MockProviderA
            </button>
            <button
                onClick={() => onProviderSelect("MockProviderB")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-all duration-300"
            >
                Pay with MockProviderB
            </button>
        </div>
    );
}
