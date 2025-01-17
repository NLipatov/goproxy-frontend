import type {Plan} from "~/dto/plan";

export type ApiResponse<T> = {
    payload: T | null;
    errorCode: number | null;
    errorMessage: string | null;
};

export type PlanResponse = ApiResponse<Plan>;