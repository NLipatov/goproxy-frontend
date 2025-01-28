export interface Plan{
    id: number;
    name: string;
    features: string[];
    price: Price;
    duration: string
}

export interface Price {
    currency: string;
    cents: number;
}

export interface PlanApiDto {
    id: number;
    name: string;
    features: string[];
    duration_days: number;
}

export interface PriceApiDto {
    cents: number;
    currency: string;
}