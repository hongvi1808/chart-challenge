import { metricsApis } from "@/base/apis/metrics.api";
import { ListParams } from "@/base/models/common";
import { MetricsModel } from "@/base/models/metrics";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createMetricsThunk = createAsyncThunk<any, any>(
    'metrics/createMetricsThunk',
    async (data: MetricsModel, thunkAPI) => {
        try {
            const res = await metricsApis.create(data);
            return res
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data?.error || error);

        }
    },
);
export const updateMetricsThunk = createAsyncThunk<any, any>(
    'metrics/updateMetricsThunk',
    async (data: MetricsModel, thunkAPI) => {
        try {
            const res = await metricsApis.update(data);
            return res
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data?.error || error);

        }
    },
);
export const deleteMetricsThunk = createAsyncThunk<any, any>(
    'metrics/deleteMetricsThunk',
    async (id:string, thunkAPI) => {
        try {
            const res = await metricsApis.delete(id);
            return res
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data?.error || error);

        }
    },
);
export const getMetricsThunk = createAsyncThunk<any, any>(
    'metrics/getMetricsThunk',
    async (params: ListParams, thunkAPI) => {
        try {
            const res = await metricsApis.getList(params);
            return res
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data?.error || error);

        }
    },
);
export const getMetricsByDateThunk = createAsyncThunk<any, any>(
    'metrics/getMetricsByDateThunk',
    async (data: {fromDate: number, toDate: number, previousDate: number}, thunkAPI) => {
        try {
            const res = await metricsApis.getListByDate(data);
            return res
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data?.error || error);

        }
    },
);