import React, { useState } from "react";
import { useFetchPlans } from "~/hooks/useFetchPlans";
import type { Plan } from "~/dto/plan";
import { PlanCard } from "~/sharedComponent/PlanCard";
import { Button } from "~/sharedComponent/Button";
import { usageHook } from "~/dashboard/sidebar/sections/proxy/usage/hooks/usageHook";
import { PaymentSelection } from "~/dashboard/sidebar/sections/proxy/plans/paymentSelection";
import { useFreeBilling } from "./paymentProviders/useFreePlanBilling";

export function Plans() {
    const { plans, loading, error } = useFetchPlans();
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [showProviders, setShowProviders] = useState(false);
    const { usage } = usageHook();
    const { activateFreePlan, loading: freePlanLoading } = useFreeBilling();

    const handleSelectPlan = (plan: Plan) => {
        if (plan.price.cents === 0) {
            activateFreePlan(plan.id)
                .then(() => console.log(`Free plan ${plan.name} activated successfully`))
                .catch(err => console.error(`Error activating free plan: ${err.message}`));
        } else {
            setSelectedPlan(plan);
            setShowProviders(true);
        }
    };

    if (loading) return <div className="text-gray-400">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <section className="py-16 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-white mb-6">Our Plans</h2>
            <p className="text-gray-400 mb-12">
                Choose the plan that suits your needs best.
            </p>

            <div className="flex flex-wrap justify-center gap-8 container mx-auto px-6">
                {plans.map((plan) => {
                    const isActive = usage?.payload?.name === plan.name;
                    const isFreePlan = plan.price.cents === 0;

                    return (
                        <div
                            key={plan.name}
                            className={`relative rounded-lg p-6 text-white flex flex-col justify-between max-w-xs transition-shadow duration-300 ${
                                isActive
                                    ? "bg-zinc-900 border border-green-500 shadow-xl"
                                    : "bg-zinc-800 shadow-lg hover:shadow-2xl"
                            }`}
                        >
                            {isActive && (
                                <span className="absolute top-2 right-2 text-xs text-green-500 font-medium border border-green-500 rounded-full px-2 py-1">
                                  Current Plan
                                </span>
                            )}
                            <PlanCard plan={plan} />

                            <Button
                                onClick={() => handleSelectPlan(plan)}
                                label={isFreePlan ? (freePlanLoading ? "Activating..." : "Activate Free Plan") : "Select"}
                            />
                        </div>
                    );
                })}
            </div>

            {showProviders && selectedPlan && (
                <div className="mt-8 text-center">
                    <h3 className="text-2xl font-bold text-green-500 mb-2">
                        Choose Payment Provider
                    </h3>
                    <PaymentSelection />
                </div>
            )}
        </section>
    );
}
