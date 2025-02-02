import { useState } from "react";
import type { ApiResponse } from "~/dto/apiResponse";
import { FREE_PLAN_BILLING_API, FREE_PLAN_BILLING_BILLING_API_CREATE_INVOICE_URL } from "../../../../../../../constants";

interface InvoiceResponse {
    plan_assigned: boolean;
}

interface FreePlanBillingError {
    code: number;
    message: string | null;
}

export function useFreeBilling() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<FreePlanBillingError | null>(null);

    async function activateFreePlan(planId: number): Promise<ApiResponse<InvoiceResponse>> {
        setLoading(true);
        setError(null);

        const url = `${FREE_PLAN_BILLING_API}/${FREE_PLAN_BILLING_BILLING_API_CREATE_INVOICE_URL}`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ plan_id: planId }),
        });

        const result: ApiResponse<InvoiceResponse> = await response.json();
        console.log(result);

        if (result.error_code !== null && result.error_code > 0) {
            setError({
                code: result.error_code,
                message: result.error_message
            })
        }

        setLoading(false);
        return result;
    }

    return { activateFreePlan, loading, error, setError };
}
