import React, { useEffect, useState } from "react";
import pricingStyles from "./pricing.module.css";
import { GetPlans } from "~/services/plans";
import { FaDollarSign, FaEuroSign, FaRubleSign } from "react-icons/fa";
import type { Plan } from "~/dto/plan";
import { localiseKey } from "~/services/localistation";

export function Pricing() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setLoading(true);
                const fetchedPlans = await GetPlans();
                setPlans(fetchedPlans);
            } catch (err) {
                setError("Failed to load plans");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        void fetchPlans();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section id="Pricing" className={`${pricingStyles["section-pricing"]} py-16 scroll-mt-4`}>
            <div className="container mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Pricing</h2>
                <p className="text-gray-400">Choose the plan that suits your needs best.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-6">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="bg-zinc-800 rounded-lg shadow-lg p-6 text-white flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <p className="text-gray-400 mb-4">{plan.name}</p>
                            <div className="text-4xl font-extrabold mb-6">
                                {plan.price ? (
                                    <>
                                        {plan.currency === "USD" && <FaDollarSign className="inline mr-2" />}
                                        {plan.currency === "EUR" && <FaEuroSign className="inline mr-2" />}
                                        {plan.currency === "RUB" && <FaRubleSign className="inline mr-2" />}
                                        {plan.price}
                                        <span className="text-xl font-normal text-gray-400 ml-2">
                                            {plan.formattedDuration ? `/ ${plan.formattedDuration}` : ""}
                                        </span>
                                    </>
                                ) : (
                                    <>Price not available</>
                                )}
                            </div>


                            <ul className="mb-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center mb-2 text-gray-300">
                                        <span className="text-green-500 mr-2">✓</span>
                                        {localiseKey(feature.name, feature.description)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition-all duration-300"
                        >
                            {plan.name === "Free" ? "Get Free" : `Get ${plan.name}`}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
