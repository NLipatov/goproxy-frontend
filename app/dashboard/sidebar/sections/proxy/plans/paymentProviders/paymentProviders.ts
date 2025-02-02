export type PaymentProviderType = "bank" | "crypto";

export interface PaymentProvider {
    id: string;
    name: string;
    type: PaymentProviderType;
    description?: string;
    logoUrl?: string;
    docsUrl?: string;
}

export const paymentProviders: PaymentProvider[] = [
    {
        id: "crypto-1",
        name: "CryptoCloud",
        type: "crypto",
        description: "CryptoCloud — a reliable way to easily and conveniently accept payments from around the world in the most popular cryptocurrencies.",
        logoUrl: "https://brand.cryptocloud.plus/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2F0qmF7ZfuUysWkk3Ugz0i%2Fblobs%2FiLCCqV5aGRlH06swUT6M%2FMain%2520logo.png&width=768&dpr=4&quality=100&sign=373be6e5&sv=2",
    },
];
