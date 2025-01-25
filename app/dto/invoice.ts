import type {ApiResponse} from "~/dto/apiResponse";

export type Invoice = {
    id: string;
    offerId: string;
    currency: "USD" | "EUR";
    payment_method: "paypal" | "stripe";
    status: "pending" | "paid" | "failed";
    createdAt: string;
};

export type CreateInvoiceRequest = {
    offerId: string;
    currency: "USD" | "EUR";
    payment_method: "paypal" | "stripe";
};

export type InvoicesResponse = ApiResponse<Invoice[]>;

export type CreateInvoiceResponse = ApiResponse<Invoice>;
