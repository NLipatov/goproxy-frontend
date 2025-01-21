import React, { useState } from "react";
import { PaymentProviders } from "./paymentProviders";

const availablePlans = [
    { name: "Free", price: 0, description: "Limited access, 300MB/day." },
    { name: "Plus", price: 5, description: "Unlimited bandwidth, $5/month." },
    { name: "Pro", price: 45, description: "Annual plan, $45/year." },
];

export function Plans() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

    const handlePlanSelect = (planName: string, planPrice: number) => {
        if (planPrice === 0) {
            alert(`The ${planName} plan has been activated!`);
        } else {
            setSelectedPlan(planName);
        }
    };

    const handleProviderSelect = (provider: string) => {
        setSelectedProvider(provider);
        alert(`Proceeding with ${provider} for the ${selectedPlan} plan.`);
    };

    return (
        <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-6">Select Your Payment Plan</h1>
            {!selectedPlan ? (
                <div className="space-y-4">
                    {availablePlans.map((plan) => (
                        <div
                            key={plan.name}
                            className="bg-zinc-800 p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
                            onClick={() => handlePlanSelect(plan.name, plan.price)}
                        >
                            <h2 className="text-xl font-semibold">{plan.name}</h2>
                            <p className="text-gray-400">{plan.description}</p>
                            <p className="text-green-500 mt-2">
                                {plan.price === 0 ? "Free" : `$${plan.price}`}
                            </p>
                        </div>
                    ))}
                </div>
            ) : selectedProvider ? (
                <div className="text-center">
                    <p className="text-lg text-green-500 mb-4">
                        You selected <strong>{selectedProvider}</strong> as your payment provider for the {selectedPlan} plan.
                    </p>
                    <button
                        onClick={() => alert(`Plan ${selectedPlan} activated with ${selectedProvider}.`)}
                        className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-6 rounded transition duration-300"
                    >
                        Confirm and Activate
                    </button>
                </div>
            ) : (
                <PaymentProviders onProviderSelect={handleProviderSelect} />
            )}
        </div>
    );
}
