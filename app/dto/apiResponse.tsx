export type ApiResponse<T> = {
    payload: T | null;
    errorCode: number | null;
    errorMessage: string | null;
};