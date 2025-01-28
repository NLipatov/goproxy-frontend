import { useEffect, useState } from "react";
import { GetPlans } from "~/services/plansService";
import type { Plan } from "~/dto/plan";

export const useFetchPlans = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setLoading(true);
                const fetchedPlans = await GetPlans();
                setPlans(fetchedPlans);
            } catch (err) {
                setError("Failed to load plans");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        void fetchPlans();
    }, []);

    return { plans, loading, error };
};
