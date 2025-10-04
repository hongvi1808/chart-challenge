import apiBase from "../axios/api-base";

const urlDefault = '/metrics';

export const metricsApis = {
    create: (data: any) => {
        return apiBase.post(`${urlDefault}`, data, {hasAuth: true});
    },
    update: (data: any) => {
        return apiBase.put(`${urlDefault}/${data?.id}`, data,  {hasAuth: true});
    },
    delete: (id: string) => {
        return apiBase.delete(`${urlDefault}/${id}`,  {hasAuth: true});
    },
    getList: (data: any) => {
        return apiBase.get(`${urlDefault}`, {hasAuth: true, params: data} );
    },
    getListByDate: (data: any) => {
        return apiBase.get(`${urlDefault}/compare`, {params: data});
    },
}