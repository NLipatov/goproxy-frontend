import React, { useState } from "react";
import { usePaymentProviders } from "./paymentProviders/usePaymentsProviders";
import { CryptoCloudHandler } from "~/dashboard/sidebar/sections/proxy/plans/paymentProviders/cryptoCloud/cryptoCloudHandler";
import { FaBitcoin, FaCreditCard } from "react-icons/fa";
import { paymentProviders, type PaymentProviderType } from "./paymentProviders/paymentProviders";

interface PaymentSelectionProps {
    planId: number;
}

export function PaymentSelection({ planId }: PaymentSelectionProps) {
    const { selectedType, setSelectedType, getPaymentOptions } = usePaymentProviders();
    const [activeTab, setActiveTab] = useState<PaymentProviderType>("crypto");

    const availableMethods = Array.from(new Set(paymentProviders.map((provider) => provider.type)));

    const tabIcons: Record<PaymentProviderType, React.ReactNode> = {
        crypto: <FaBitcoin className="text-xl text-yellow-400" />,
        bank: <FaCreditCard className="text-xl text-blue-400" />,
    };

    return (
        <div className="p-6 bg-zinc-900 text-white rounded-lg shadow-md max-w-fit mx-auto border border-zinc-800 space-y-4">
            <div className="flex justify-center space-x-6 text-gray-400 text-lg border-b border-gray-700 pb-2 mb-4">
                {availableMethods.map((method) => (
                    <button
                        key={method}
                        onClick={() => setActiveTab(method)}
                        className={`flex items-center space-x-2 transition-colors ${
                            activeTab === method ? "text-green-500 font-semibold" : "hover:text-gray-200"
                        }`}
                    >
                        {tabIcons[method]}
                        <span>{method === "crypto" ? "Crypto" : "Bank Card"}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {getPaymentOptions(activeTab).map((provider) => (
                    <div
                        key={provider.id}
                        className="flex items-center justify-between px-4 py-3 bg-zinc-800 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition"
                    >
                        <div className="flex items-center space-x-3">
                            {provider.logoUrl && (
                                <img src={provider.logoUrl} alt={provider.name} className="max-w-20 rounded" />
                            )}
                            <div>
                                <span className="text-lg text-gray-300 font-medium">{provider.name}</span>
                                {provider.description && (
                                    <p className="text-gray-500 text-xs">{provider.description}</p>
                                )}
                            </div>
                        </div>
                        <div className="min-w-[8rem] flex justify-end">
                            <CryptoCloudHandler planId={planId} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
