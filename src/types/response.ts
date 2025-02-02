export type ResponseMeta = {
    current_page: number;
    last_page: number;
    from: number;
    total: number;
};

export type ApiResponse<T> = {
    data?: T;
    message: string;
    code: number;
    type?: string;
    showToast?: boolean;
    meta?: ResponseMeta;
};

export type RequestParams = {
    page?: number;
    handle?: string;
    per_page?: number;
};
