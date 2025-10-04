import apiBase from "../axios/api-base";

const urlDefault = '/auth';

export const authApis = {
    login: (data: any) => {
        return apiBase.post(`${urlDefault}/login`, data);
    },
    register: (data: any) => {
        return apiBase.post(`${urlDefault}/register`, data);
    },
    refresh: () => {
        return apiBase.get(`${urlDefault}/refresh`);
    },
    logout: () => {
        return apiBase.get(`${urlDefault}/logout`, );
    },
}