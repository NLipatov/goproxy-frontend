import { useState } from "react";
import { paymentProviders, type PaymentProvider, type PaymentProviderType } from "./paymentProviders"; // 'type' перед интерфейсами ускоряет компиляцию

export function usePaymentProviders() {
    const [selectedType, setSelectedType] = useState<PaymentProviderType | null>(null);

    function getPaymentOptions(type: PaymentProviderType): PaymentProvider[] {
        return paymentProviders.filter((provider) => provider.type === type);
    }

    return { selectedType, setSelectedType, getPaymentOptions };
}
