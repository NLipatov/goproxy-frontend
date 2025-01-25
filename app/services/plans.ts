import type { Plan, Offer, Price } from "~/dto/plan";
import { ACCOUNTING_API_BASE_URL, ACCOUNTING_API_GET_PlANS_URL } from "../../constants";
import { getUserCurrency } from "~/services/localistation";

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
            const offers = plan.offers?.map((offer: Offer) => ({
                description: offer.description,
                offer_id: offer.offer_id,
                prices: offer.prices,
            })) || [];

            const selectedOffer = offers.find((offer) =>
                offer.prices.some((price) => price.currency === userCurrency)
            );

            const userPrice: Price | undefined = selectedOffer
                ? selectedOffer.prices.find((price) => price.currency === userCurrency)
                : undefined;

            const features = plan.features.map((feature) => ({
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
                offers,
                price: userPrice ? (userPrice.cents / 100).toFixed(2) : null,
                currency: userPrice ? userPrice.currency : null,
                formattedDuration: duration,
                payment_methods: userPrice ? userPrice.payment_method : [],
            };
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error fetching plans: ${error.message}`);
        } else {
            console.error("An unknown error occurred");
        }
        return [];
    }
};
