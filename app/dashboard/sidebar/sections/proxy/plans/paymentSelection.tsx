import { useState } from "react";
import { usePaymentProviders } from "./paymentProviders/usePaymentsProviders";
import { CryptoCloudHandler } from "~/dashboard/sidebar/sections/proxy/plans/paymentProviders/cryptoCloud/cryptoCloudHandler";
import { FaBitcoin, FaCreditCard } from "react-icons/fa";
import type {PaymentProviderType} from "~/dashboard/sidebar/sections/proxy/plans/paymentProviders/paymentProviders";

interface PaymentSelectionProps {
    planId: number;
}

export function PaymentSelection({ planId }: PaymentSelectionProps) {
    const { selectedType, setSelectedType, getPaymentOptions } = usePaymentProviders();
    const [activeTab, setActiveTab] = useState<PaymentProviderType>("crypto");

    const paymentMethods = [
        { type: "crypto", label: "Crypto", icon: <FaBitcoin className="text-xl text-yellow-400" /> },
        { type: "fiat", label: "Bank Card", icon: <FaCreditCard className="text-xl text-blue-400" /> }, // ✅ UI -> "Bank Card"
    ];

    return (
        <div className="p-6 bg-zinc-900 text-white rounded-lg shadow-md max-w-md mx-auto border border-zinc-800 space-y-4">
            <h2 className="text-2xl font-bold text-white text-center mb-4">Payment Options</h2>

            <div className="flex justify-center space-x-6 text-gray-400 text-lg border-b border-gray-700 pb-2 mb-4">
                {paymentMethods.map(({ type, label, icon }) => (
                    <button
                        key={type}
                        onClick={() => setActiveTab(type as PaymentProviderType)}
                        className={`flex items-center space-x-2 transition-colors ${
                            activeTab === type ? "text-green-500 font-semibold" : "hover:text-gray-200"
                        }`}
                    >
                        {icon}
                        <span>{label}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {getPaymentOptions(activeTab).map((provider) => (
                    <div
                        key={provider.id}
                        className="flex items-center justify-between px-4 py-3 bg-zinc-800 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition"
                    >
                        <span className="text-lg text-gray-300 flex-grow">{provider.name}</span>
                        <div className="min-w-[8rem] flex justify-end">
                            <CryptoCloudHandler planId={planId} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
