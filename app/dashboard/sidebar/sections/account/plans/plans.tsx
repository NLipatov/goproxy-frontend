import React, {useState} from "react";
import {useFetchPlans} from "~/hooks/useFetchPlans";
import pricingStyles from "./pricing.module.css";
import {PaymentProviders} from "./paymentProviders";
import {PlanCard} from "~/sharedComponent/PlanCard";

export function Plans() {
    const {plans, loading, error} = useFetchPlans();
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [showProviders, setShowProviders] = useState(false);

    const handleSelectPlan = (planName: string) => {
        const plan = plans.find((p) => p.name === planName);
        if (plan?.price === "0.00" || !plan?.price) {
            alert(`You have selected the Free plan!`);
        } else {
            setSelectedPlan(planName);
            setShowProviders(true);
        }
    };

    const handleProviderSelect = (provider: string) => {
        alert(`You selected the ${selectedPlan} plan with ${provider} as the payment provider.`);
        setShowProviders(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Select Your Plan</h1>
            <div className="flex flex-wrap justify-center gap-6">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="bg-zinc-800 rounded-lg shadow-lg p-6 text-white flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 max-w-xs">
                        <PlanCard
                            name={plan.name}
                            price={plan.price}
                            currency={plan.currency}
                            formattedDuration={plan.formattedDuration}
                            features={plan.features}/>
                        <button
                            onClick={() => handleSelectPlan(plan.name)}
                            className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition-all duration-300">
                            {plan.name === "Free" ? "Get Free" : `Get ${plan.name}`}
                        </button>
                    </div>
                ))}
            </div>
            {showProviders && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Choose Payment Provider</h2>
                    <PaymentProviders onProviderSelect={handleProviderSelect}/>
                </div>
            )}
        </div>
    );
}
