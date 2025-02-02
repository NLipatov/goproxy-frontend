import { useCryptoCloudBilling } from "./useCryptoCloudBilling";
import { Button } from "~/sharedComponent/Button";
import { AlertBox } from "~/sharedComponent/AlertBox";
import {getUserCurrency} from "~/services/localistation";

interface PaidPlanHandlerProps {
    planId: number;
}

export function PaidPlanHandler({ planId }: PaidPlanHandlerProps) {
    const { purchasePlan, loading, error, paymentLink, setError } = useCryptoCloudBilling();
    const currency = getUserCurrency()

    const handlePurchase = async () => {
        if (loading) return;
        setError(null);

        await purchasePlan(planId, currency);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {error && <AlertBox type="error" message={error.message ?? "An unexpected error occurred"} />}
            {paymentLink ? (
                <Button label="Go to payment" onClick={() => window.open(paymentLink, "_blank")} /> // ✅ Открываем оплату в новом окне
            ) : (
                <Button label={loading ? "Processing..." : "Purchase"} onClick={handlePurchase} />
            )}
        </div>
    );
}
