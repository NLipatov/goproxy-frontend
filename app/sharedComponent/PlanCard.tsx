import React from "react";
import {FaDollarSign, FaEuroSign, FaRubleSign} from "react-icons/fa";

interface PlanCardProps {
    name: string;
    price: string | null | undefined;
    currency: string | null | undefined;
    formattedDuration: string | null | undefined;
    features: { description: string }[];
}

export const PlanCard: React.FC<PlanCardProps> = ({name, price, currency, formattedDuration, features}) => {
    return (
        <div>
            <h3 className="text-2xl font-bold mb-2">{name}</h3>
            <div className="text-4xl font-extrabold mb-6 flex items-center">
                {price ? (
                    <>
                        {currency === "USD" && <FaDollarSign className="mr-2"/>}
                        {currency === "EUR" && <FaEuroSign className="mr-2"/>}
                        {currency === "RUB" && <FaRubleSign className="mr-2"/>}
                        {price}
                        <span className="text-xl font-normal text-gray-400 ml-2">
                            {formattedDuration ? `/ ${formattedDuration}` : ""}
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
                        {feature.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};
