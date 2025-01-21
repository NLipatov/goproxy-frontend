import type {ApiResponse} from "~/dto/apiResponse";

export type Offer = {
    id: string;
    name: string;
    description: string;
    prices: {
        usd: number;
        eur: number;
    };
    paymentType: "one-time" | "monthly";
};

export type OffersResponse = ApiResponse<Offer[]>;
