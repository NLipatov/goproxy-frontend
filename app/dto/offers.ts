import type {ApiResponse} from "~/dto/apiResponse";

export type Offer = {
    id: string;
    name: string;
    features: string[] | null;
    prices: Price[],
};

export type Price = {
    currency: "USD" | "EUR" | "RUB";
    amount: number;
    periodicity: "ONE_TIME" | "MONTHLY" | "PERIOD_90_DAYS" | "PERIOD_180_DAYS" | "PERIOD_YEAR";
};

export type OffersResponse = ApiResponse<Offer[]>;
