import { useState } from "react";
import type { ApiResponse } from "~/dto/apiResponse";
import {
    CRYPTO_CLOUD_BILLING_API,
    CRYPTO_CLOUD_BILLING_API_CREATE_INVOICE_URL
} from "../../../../../../../../constants";

interface PaidPlanResponse {
    payment_link: string;
}

interface PaidPlanBillingError {
    code: number;
    message: string | null;
}

export function useCryptoCloudBilling() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<PaidPlanBillingError | null>(null);
    const [paymentLink, setPaymentLink] = useState<string | null>(null);

    async function purchasePlan(planId: number, currency: string): Promise<ApiResponse<PaidPlanResponse>> {
        setLoading(true);
        setError(null);
        setPaymentLink(null);

        const url = `${CRYPTO_CLOUD_BILLING_API}/${CRYPTO_CLOUD_BILLING_API_CREATE_INVOICE_URL}`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ plan_id: planId, currency }),
        });

        const result: ApiResponse<PaidPlanResponse> = await response.json();
        console.log("🔹 CryptoCloud API Response:", result);

        if (result.error_code && result.error_code > 0) {
            setError({
                code: result.error_code,
                message: result.error_message || `Error ${result.error_code}`,
            });
        } else {
            setError(null);
            setPaymentLink(result.payload?.payment_link || null);
        }

        setLoading(false);
        return result;
    }

    return { purchasePlan, loading, error, paymentLink, setError };
}
