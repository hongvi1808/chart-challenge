export interface ListParams {
    page: number;
    limit: number;
    search?: string;
    [key: string]: any;
}

export interface ListData<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPage: number;
}

export interface DataResponse<T> {
    data: T | ListData<T>;
    success: boolean;
    error: any
}