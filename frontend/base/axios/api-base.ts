import { AxiosRequestConfig } from "axios"
import axiosClient from "./client"
import { store } from "../store"
import { DataResponse, ListData } from "../models/common"

type Method = 'get' | 'post' | 'put' | 'delete'

interface RequestOptions {
    hasAuth?: boolean
    isLoading?: boolean,
}
const getAuthHeader = () => {
    const sessionReducer = store.getState().auth;
    const token = sessionReducer.session.accessToken
    return token ?{ Authorization: `Bearer ${token}` } :{}
}

async function request<T = any>(
    method: Method,
    url: string,
    data: any = null,
    options: RequestOptions & AxiosRequestConfig = {}
): Promise<T | ListData<T>> {
    const { hasAuth, params, headers } = options

    const config = {
        method,
        url,
        data,
        params,
        headers: {
            ...(hasAuth ? getAuthHeader() : {}),
            ...headers,
        },
        ...options

    }
    const res: DataResponse<T> = (await axiosClient.request<DataResponse<T>>(config))?.data
    return res?.data
}

// Các method tiện dụng
const apiBase = {
    get: <T = any>(url: string, options?: RequestOptions & AxiosRequestConfig) => request<T>('get', url, null, options),
    post: <T = any>(url: string, data: any, options?: RequestOptions & AxiosRequestConfig) => request<T>('post', url, data, options),
    put: <T = any>(url: string, data: any, options?: RequestOptions & AxiosRequestConfig) => request<T>('put', url, data, options),
    delete: <T = any>(url: string, options?: RequestOptions & AxiosRequestConfig) => request<T>('delete', url, {}, options),
}

export default apiBase
