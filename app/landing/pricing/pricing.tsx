import React from "react";
import pricingStyles from "./pricing.module.css";
import { useFetchPlans } from "~/hooks/useFetchPlans";
import { PlanCard } from "~/sharedComponent/PlanCard";

export function Pricing() {
    const { plans, loading, error } = useFetchPlans();

    if (loading) {
        return null;
    }

    if (!plans || plans.length === 0) {
        return null;
    }

    return (
        <section id="Pricing" className={`${pricingStyles["section-pricing"]} py-16 scroll-mt-4`}>
            <div className="container mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Pricing</h2>
                <p className="text-gray-400">Choose the plan that suits your needs best.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 container mx-auto px-6">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="bg-zinc-800 rounded-lg shadow-lg p-6 text-white flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 max-w-xs">
                        <PlanCard
                            name={plan.name}
                            price={plan.price}
                            currency={plan.currency}
                            formattedDuration={plan.formattedDuration}
                            features={plan.features}
                        />
                        <button
                            className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition-all duration-300">
                            {plan.name === "Free" ? "Get Free" : `Get ${plan.name}`}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
