import React, { useState } from "react";
import { useFetchPlans } from "~/hooks/useFetchPlans";
import type { Plan } from "~/dto/plan";
import { PaymentProviders } from "./paymentProviders";
import { PlanCard } from "~/sharedComponent/PlanCard";
import {
    ACCOUNTING_API_BASE_URL,
    ACCOUNTING_API_POST_INVOICES_URL,
} from "../../../../../../constants";
import {Button} from "~/sharedComponent/Button";

export function Plans() {
    const { plans, loading, error } = useFetchPlans();
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [showProviders, setShowProviders] = useState(false);

    const handleSelectPlan = (plan: Plan) => {
        setSelectedPlan(plan);
        setShowProviders(true);
    };

    const handleProviderSelect = async (provider: string) => {
        if (!selectedPlan) return;

        try {
            const response = await fetch(
                `${ACCOUNTING_API_BASE_URL}/${ACCOUNTING_API_POST_INVOICES_URL}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        plan_id: selectedPlan.id,
                        currency: selectedPlan.price.currency,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`Payment request failed: ${response.statusText}`);
            }

            alert("Invoice created successfully!");
        } catch {
            alert("Failed to process payment. Please try again.");
        } finally {
            setSelectedPlan(null);
            setShowProviders(false);
        }
    };

    if (loading) return <div className="text-gray-400">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <section className="py-16 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-white mb-6">Our Plans</h2>
            <p className="text-gray-400 mb-12">Choose the plan that suits your needs best.</p>

            <div className="flex flex-wrap justify-center gap-8 container mx-auto px-6">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-zinc-800 rounded-lg shadow-lg p-6 text-white flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 max-w-xs"
                    >
                        <PlanCard plan={plan} />

                        <Button onClick={() => handleSelectPlan(plan)}label={"Select"} />
                    </div>
                ))}
            </div>

            {showProviders && (
                <div className="mt-8 text-center">
                    <h3 className="text-2xl font-bold text-green-500 mb-2">Choose Payment Provider</h3>
                    <PaymentProviders onProviderSelect={handleProviderSelect} />
                </div>
            )}
        </section>
    );
}
