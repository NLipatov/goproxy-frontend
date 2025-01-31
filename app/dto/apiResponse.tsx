export type ApiResponse<T> = {
    payload: T | null;
    error_code: number | null;
    error_message: string | null;
};