import type { Plan, Price, PlanApiDto, PriceApiDto } from "~/dto/plan";
import { PLANS_API_BASE_URL, PLANS_API_GET_PLANS_URL, BILLING_API_BASE_URL, BILLING_API_BASE_GET_PLAN_PRICES_URL } from "../../constants";
import { getUserCurrency, localiseKey } from "~/services/localistation";

export const GetPlans = async (): Promise<Plan[]> => {
    const userCurrency = getUserCurrency();

    try {
        const plansResponse = await fetch(`${PLANS_API_BASE_URL}/${PLANS_API_GET_PLANS_URL}`);

        if (!plansResponse.ok) {
            console.error(`Failed to fetch plans: ${plansResponse.status} ${plansResponse.statusText}`);
            return [];
        }

        const plansApi: PlanApiDto[] = await plansResponse.json();

        return await Promise.all(
            plansApi.map(async (planApi) => {
                try {
                    const pricesUrl = `${BILLING_API_BASE_URL}/${BILLING_API_BASE_GET_PLAN_PRICES_URL + planApi.id}`;
                    const pricesResponse = await fetch(pricesUrl);

                    if (!pricesResponse.ok) {
                        console.error(`Failed to fetch prices for plan ${planApi.id}: ${pricesResponse.status} ${pricesResponse.statusText}`);
                        throw new Error("Prices not available");
                    }

                    const pricesApi: PriceApiDto[] = await pricesResponse.json();

                    const userPrice =
                        pricesApi.find((price) => price.currency.toUpperCase() === userCurrency.toUpperCase()) ||
                        pricesApi.find((price) => price.currency.toUpperCase() === "USD") ||
                        { cents: 0, currency: "N/A" };

                    return {
                        id: planApi.id,
                        name: planApi.name,
                        features: planApi.features.map((feature) => localiseKey(feature, feature)),
                        price: {
                            ...userPrice,
                            formatted: userPrice.cents,
                        },
                        duration: formatDuration(planApi.duration_days),
                    };
                } catch (error) {
                    console.error(`Error fetching prices for plan ${planApi.id}: ${error instanceof Error ? error.message : "Unknown error"}`);
                    return {
                        id: planApi.id,
                        name: planApi.name,
                        features: planApi.features.map((feature) => localiseKey(feature, feature)),
                        price: { cents: 0, currency: "N/A", formatted: "0" },
                        duration: formatDuration(planApi.duration_days),
                    };
                }
            })
        );
    } catch (error) {
        console.error(`Error fetching plans: ${error instanceof Error ? error.message : "Unknown error"}`);
        return [];
    }
};

const formatDuration = (days: number): string => {
    if (days === 31) return "month";
    if (days === 1) return "1 day";
    return `${days} days`;
};