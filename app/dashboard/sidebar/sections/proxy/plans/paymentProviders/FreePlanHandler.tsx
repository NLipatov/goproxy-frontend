import {useFreeBilling} from "./useFreePlanBilling";
import {Button} from "~/sharedComponent/Button";
import {useAuth} from "~/hooks/useAuth";
import {AlertBox} from "~/sharedComponent/AlertBox";

interface FreePlanHandlerProps {
    planId: number;
}

export function FreePlanHandler({planId}: FreePlanHandlerProps) {
    const {activateFreePlan, loading, error, setError} = useFreeBilling();
    const {login} = useAuth()

    const handleActivation = async () => {
        if (loading) return;
        setError(null);
        await activateFreePlan(planId);
    };


    return (
        <div className="flex flex-col items-center space-y-4">
            {error && (
                <div className="w-full flex flex-col items-center">
                    <AlertBox
                        type="warning"
                        message={error.message ?? "Not available at the moment"}
                    />
                    {error.code === 401 && <Button label="Re-login" onClick={login} />}
                </div>
            )}

            {!error && <Button label={loading ? "Activating..." : "Select"} onClick={handleActivation} />}
        </div>
    );
}
