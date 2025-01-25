export interface PlanFeature {
    name: string;
    description: string;
}

export interface Price {
    cents: number;
    currency: string;
    paymentMethod: string[];
}

export interface Offer {
    description: string | null;
    offerId: string;
    prices: Price[];
}

export interface Plan {
    name: string;
    limits: {
        bandwidth: {
            isLimited: boolean;
            used: number;
            total: number;
        };
        connections: {
            isLimited: boolean;
            maxConcurrentConnections: number;
        };
        speed: {
            isLimited: boolean;
            maxBytesPerSecond: number;
        };
    };
    features: PlanFeature[];
    duration_days: number;
    offers: Offer[] | null;
    currency?: string | null;
    formattedDuration?: string;
    price?: string | null;
    paymentMethods?: string[];
}
