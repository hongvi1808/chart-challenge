import { authApis } from '@/base/apis/auth.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { scheduleTokenRefresh } from './auto-refresh';


export const loginThunk = createAsyncThunk(
    'auth/login',
    async (data: any, thunkAPI) => {
        try {
            const res = await authApis.login(data);
            scheduleTokenRefresh(res.expireAt, () => {
                thunkAPI.dispatch(refreshThunk());
            });
            return res
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data?.error || error);
        }
    },
);
export const registerThunk = createAsyncThunk<any, any>(
    'auth/register',
    async (data: { username: string, password: string }, thunkAPI) => {
        try {
            const res = await authApis.register(data);
            return res
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data?.error || error);

        }
    },
);
export const refreshThunk = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        try {
            const res = await authApis.refresh();
            return res
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data?.error || error);

        }
    },
);
export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            const res = await authApis.logout();
            return res
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error?.response?.data?.error || error);

        }
    },
);