import { useState } from "react";
import {
  CRYPTO_CLOUD_BILLING_API,
  CRYPTO_CLOUD_BILLING_API_CREATE_INVOICE_URL,
} from "../../../../../../../constants";
import type {ApiResponse} from "~/dto/apiResponse";
import {useAuth} from "~/hooks/useAuth";
import {useNavigate} from "react-router-dom";

interface InvoiceResponse {
  payment_link: string | null;
}

export function useCryptoCloudBilling() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {login} = useAuth();

  async function createInvoice(planId: number, currency: string) {
    setLoading(true);
    setError(null);

    try {
      const url = `${CRYPTO_CLOUD_BILLING_API}/${CRYPTO_CLOUD_BILLING_API_CREATE_INVOICE_URL}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ plan_id: planId, currency }),
      });

      const result = await response.json();

      if (result.error_code !== null && result.error_code > 0) {
        if (result.error_code === 401) {
          login().then(r => r)
          return
        }
      }

      handlePayment(result);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function handlePayment(response: ApiResponse<InvoiceResponse>) {
    if ((response.error_code ?? 0) > 0) {
      if (response.error_code === 401) {
        login().then(r => r)
        return
      }

      throw new Error(`code: ${response.error_code}. message: ${response.error_message}`)
    }

    if (response.payload?.payment_link !== null
        && response.payload?.payment_link !== ""
        && response.payload?.payment_link !== undefined) {
          window.location.href = response.payload?.payment_link;
      } else {
        console.error("Payment required, but no link provided.");
      }
  }

  return { createInvoice, loading, error };
}
