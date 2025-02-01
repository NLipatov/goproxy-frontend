import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ApiResponse } from "~/dto/apiResponse";
import { useAuth } from "~/hooks/useAuth";
import { FREE_PLAN_BILLING_API, FREE_PLAN_BILLING_BILLING_API_CREATE_INVOICE_URL } from "../../../../../../../constants";

interface InvoiceResponse {
    plan_assigned: boolean;
}

export function useFreeBilling() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    async function activateFreePlan(planId: number) {
        setLoading(true);
        setError(null);

        try {
            const url = `${FREE_PLAN_BILLING_API}/${FREE_PLAN_BILLING_BILLING_API_CREATE_INVOICE_URL}`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ plan_id: planId }),
            });

            const result: ApiResponse<InvoiceResponse> = await response.json();

            if (result.error_code !== null && result.error_code > 0) {
                if (result.error_code === 401) {
                    login();
                    return;
                }
                setError(result.error_message || "Unknown error");
                throw new Error(`code: ${result.error_code}. message: ${result.error_message}`);
            }

            handleActivation(result);
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    function handleActivation(response: ApiResponse<InvoiceResponse>) {
        if ((response.error_code ?? 0) > 0) {
            if (response.error_code === 401) {
                login();
                return;
            }
            throw new Error(`code: ${response.error_code}. message: ${response.error_message}`);
        }

        if (response.payload?.plan_assigned) {
            console.log("Free plan activated successfully.");
        } else {
            console.error("Plan activation failed.");
        }
    }

    return { activateFreePlan, loading, error };
}
