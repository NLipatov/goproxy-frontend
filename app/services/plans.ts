import type {Plan} from "~/dto/plan";
import {ACCOUNTING_API_BASE_URL, ACCOUNTING_API_GET_PlANS_URL} from "../../constants";
import {getUserCurrency} from "~/services/localistation";

export const GetPlans = async (): Promise<Plan[]> => {
    const userCurrency = getUserCurrency();

    try {
        const response = await fetch(`${ACCOUNTING_API_BASE_URL}/${ACCOUNTING_API_GET_PlANS_URL}`);
        if (!response.ok) {
            console.error(`Failed to fetch plans: ${response.status} ${response.statusText}`);
            return [];
        }

        const data: { payload: Plan[] } = await response.json();

        return data.payload.map((plan) => {
            const prices = plan.prices || [];
            const userPrice = prices.find((p) => p.currency === userCurrency) || null;

            const features = plan.features.map((feature: { name: string; description: string }) => ({
                name: feature.name,
                description: feature.description,
            }));

            const duration =
                plan.duration_days === 31
                    ? "month"
                    : plan.duration_days === 1
                        ? "1 day"
                        : `${plan.duration_days} days`;

            return {
                ...plan,
                features,
                price: userPrice ? (userPrice.cents / 100).toFixed(2) : null,
                currency: userPrice ? userPrice.currency : null,
                formattedDuration: duration,
            };
        });
    } catch (error) {
        console.error(`Error fetching plans: ${error.message}`);
        return [];
    }
};
