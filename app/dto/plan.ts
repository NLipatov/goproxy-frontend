export interface PlanFeature {
    name: string;
    description: string;
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
    prices: { cents: number; currency: string }[] | null;
    price?: string | null;
    currency?: string | null;
    formattedDuration?: string;
}

