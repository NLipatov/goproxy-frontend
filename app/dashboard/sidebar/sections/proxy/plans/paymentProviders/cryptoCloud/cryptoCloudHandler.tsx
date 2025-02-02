import { useCryptoCloudBilling } from "./useCryptoCloudBilling";
import { Button } from "~/sharedComponent/Button";
import { AlertBox } from "~/sharedComponent/AlertBox";
import { getUserCurrency } from "~/services/localistation";

interface PaidPlanHandlerProps {
    planId: number;
}

export function PaidPlanHandler({ planId }: PaidPlanHandlerProps) {
    const { purchasePlan, loading, error, paymentLink, setError } = useCryptoCloudBilling();
    const currency = getUserCurrency();

    const handlePurchase = async () => {
        if (loading) return;
        setError(null);

        const result = await purchasePlan(planId, currency);

        if (result.payload?.payment_link) {
            window.open(result.payload.payment_link, "_blank");
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {error && <AlertBox type="error" message={error.message ?? "An unexpected error occurred"} />}

            <Button label={loading ? "Processing..." : "Purchase"} onClick={handlePurchase} />

            {paymentLink && (
                <div className="flex flex-col items-center text-center space-y-1">
                    <span className="text-gray-400 text-sm">Your payment link:</span>
                    <a
                        href={paymentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-300 transition flex items-center space-x-1"
                    >
                        <span>🔗 Open Payment</span>
                    </a>
                </div>
            )}
        </div>
    );
}
