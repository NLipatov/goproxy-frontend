import { useFreeBilling } from "./useFreePlanBilling";
import { Button } from "~/sharedComponent/Button";
import { useAuth } from "~/hooks/useAuth";
import { AlertBox } from "~/sharedComponent/AlertBox";

interface FreePlanHandlerProps {
    planId: number;
}

export function FreePlanHandler({ planId }: FreePlanHandlerProps) {
    const { activateFreePlan, loading, error, setError } = useFreeBilling();
    const { login } = useAuth();

    const handleActivation = async () => {
        if (loading) return;
        setError(null);
        await activateFreePlan(planId);
    };

    return (
        <div className="flex flex-col items-center space-y-4 w-full">
            {error && (
                <div className="w-full flex flex-col items-center">
                    <AlertBox
                        type="error"
                        message={error.message ?? "Not available at the moment"}
                    />
                    {error.code === 401 && <Button label="Re-login" onClick={login} />}
                </div>
            )}

            <div className="flex w-full justify-center">
                {!error && <Button label={loading ? "Activating..." : "Select"} onClick={handleActivation} className="w-full min-h-[48px]" />}
            </div>
        </div>
    );
}
