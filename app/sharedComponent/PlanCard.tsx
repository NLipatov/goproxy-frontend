import React from "react";
import { FaDollarSign, FaEuroSign, FaRubleSign } from "react-icons/fa";
import type { Plan } from "~/dto/plan";

export const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
    const { price, name, features, duration } = plan;
    const formattedPrice = formatPrice(price.cents);

    return (
        <div>
            <h3 className="text-2xl font-bold mb-2">{name}</h3>
            <div className="text-4xl font-extrabold mb-6 flex items-center">
                {price.currency !== "N/A" ? (
                    <>
                        {price.currency === "USD" && <FaDollarSign className="mr-2" />}
                        {price.currency === "EUR" && <FaEuroSign className="mr-2" />}
                        {price.currency === "RUB" && <FaRubleSign className="mr-2" />}
                        {formattedPrice}
                        <span className="text-xl font-normal text-gray-400 ml-2">
                            {duration ? `/ ${duration}` : ""}
                        </span>
                    </>
                ) : (
                    <>Price not available</>
                )}
            </div>
            <ul className="mb-6">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center mb-2 text-gray-300">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const formatPrice = (cents: number): string => {
    const price = cents / 100;
    return price % 1 === 0 ? price.toFixed(0) : price.toFixed(1);
};