import React, { useState } from "react";
import { useFetchPlans } from "~/hooks/useFetchPlans";
import pricingStyles from "./pricing.module.css";
import { PaymentProviders } from "./paymentProviders";
import { PlanCard } from "~/sharedComponent/PlanCard";
import { ACCOUNTING_API_BASE_URL, ACCOUNTING_API_POST_INVOICES_URL } from "~/../constants";

export function Plans() {
    const { plans, loading, error } = useFetchPlans();
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [selectedOffer, setSelectedOffer] = useState<{ offer_id: string; currency: string } | null>(null);
    const [showProviders, setShowProviders] = useState(false);

    const handleSelectPlan = (planName: string) => {
        const plan = plans.find((p) => p.name === planName);
        if (!plan) return;

        console.log(plan);

        if (plan.price.cents === 0) {
            alert(`You have selected the Free plan!`);
        } else {
            setSelectedPlan(planName);
            setSelectedOffer({
                offer_id: plan.id.toString(),
                currency: plan.price.currency,
            });
            setShowProviders(true);
        }
    };

    const handleProviderSelect = async (provider: string) => {
        if (!selectedOffer) return;

        const payload = {
            offer_id: selectedOffer.offer_id,
            currency: selectedOffer.currency,
            payment_method: provider,
        };

        try {
            const response = await fetch(`${ACCOUNTING_API_BASE_URL}/${ACCOUNTING_API_POST_INVOICES_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Failed to process payment: ${response.statusText}`);
            }

            alert("Payment successfully processed!");
        } catch (error) {
            console.error("Payment error:", error);
            alert("Failed to process payment. Please try again.");
        } finally {
            resetSelection();
        }
    };

    const resetSelection = () => {
        setSelectedPlan(null);
        setSelectedOffer(null);
        setShowProviders(false);
    };

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Select Your Plan</h1>
            <div className="flex flex-wrap justify-center gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-zinc-800 rounded-lg shadow-lg p-6 text-white flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 max-w-xs"
                    >
                        <PlanCard plan={plan} />
                        <button
                            onClick={() => handleSelectPlan(plan.name)}
                            className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition-all duration-300"
                        >
                            {plan.name === "Free" ? "Get Free" : `Get ${plan.name}`}
                        </button>
                    </div>
                ))}
            </div>
            {showProviders && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Choose Payment Provider</h2>
                    <PaymentProviders onProviderSelect={handleProviderSelect} />
                </div>
            )}
        </div>
    );
}
