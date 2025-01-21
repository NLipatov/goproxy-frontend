import pricingStyles from "./pricing.module.css"
import {GetPlans} from "~/services/plansService";


export function Pricing() {
    const plans = GetPlans();
    return (
        <section id="Pricing" className={`${pricingStyles["section-pricing"]} py-16 scroll-mt-4`}>
            <div className="container mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Pricing</h2>
                <p className="text-gray-400">
                    Choose the plan that suits your needs best.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-6">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="bg-zinc-800 rounded-lg shadow-lg p-6 text-white flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <p className="text-gray-400 mb-4">{plan.description}</p>
                            <div className="text-4xl font-extrabold mb-6">
                                {plan.currency}
                                {plan.price}
                                <span className="text-xl font-normal text-gray-400">
                {plan.period}
            </span>
                            </div>
                            <ul className="mb-6">
                                {plan.features.map((feature, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center mb-2 text-gray-300"
                                    >
                                        <span className="text-green-500 mr-2">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

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