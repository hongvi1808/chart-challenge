import { AuthModel } from "@/base/models/auth";
import { MetricsModel } from "@/base/models/metrics";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    loading: boolean,
    items: MetricsModel[] | undefined;
    total: number;
    page: number;
    limit: number;
    totalPage: number;
}
const initialState: AuthState = {
    loading: false,
    items: [],
    total: 0,
    page: 0,
    limit: 0,
    totalPage: 0


}

export const metricsSlice = createSlice({
    name: 'metrics',
    initialState,
    reducers: {
        // setSession: (state, action) => {
        //     state.loggedIn = true
        //     state.user = action.payload
        // },
    },
   
})

export const {} = metricsSlice.actions
export default metricsSlice.reducer 