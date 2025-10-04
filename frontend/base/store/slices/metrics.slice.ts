import { AuthModel } from "@/base/models/auth";
import { MetricsModel } from "@/base/models/metrics";
import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { createMetricsThunk, deleteMetricsThunk, getMetricsByDateThunk, getMetricsThunk, updateMetricsThunk } from "../thunks/metrics.thunk";
import toast from "react-hot-toast";

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
    },
    extraReducers(builder) {
            builder
                .addCase(getMetricsThunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.items= action.payload.items
                    state.total= action.payload.total
                    state.page= action.payload.page
                    state.limit= action.payload.limit
                    state.totalPage= action.payload.totalPage
                    
                })
                .addCase(getMetricsByDateThunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.items= action.payload
                })
                .addCase(createMetricsThunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.items= [action.payload, ...(state.items || [])]
                    state.total= action.payload.total + 1
                    toast.success('Create Metricts Successfully!')
                })
                .addCase(updateMetricsThunk.fulfilled, (state, action) => {
                    const itemFound = state.items?.find(i => i.id === action.payload.id)
                    state.loading = false;
                    if (itemFound) {
                        itemFound.date = action.payload.date
                        itemFound.pos = action.payload.pos
                        itemFound.eatclub = action.payload.eatclub
                        itemFound.labourCosts = action.payload.labourCosts
                        itemFound.impact = action.payload.impact
                    }
                    toast.success('Update Metricts Successfully!')
                    return state
                })
                .addCase(deleteMetricsThunk.fulfilled, (state, action) => {
                    const items = state.items?.filter(i => i.id !== action.payload.id)
                    state.loading = false;
                    state.items= items
                    state.total= action.payload.total - 1
                    toast.success('Delete Metricts Successfully!')
                })
                .addMatcher(isRejected(createMetricsThunk, updateMetricsThunk, deleteMetricsThunk, getMetricsThunk, getMetricsByDateThunk),
                    (state, action) => {
                        state.loading = false;
                        const errorMes = (action?.payload as any)?.message || action.error.message || 'Error'
                        toast.error(errorMes)
                    })
                .addMatcher(isPending(createMetricsThunk, updateMetricsThunk, deleteMetricsThunk, getMetricsThunk, getMetricsByDateThunk),
                    (state) => { state.loading = true })
        },
   
})

export const {} = metricsSlice.actions
export default metricsSlice.reducer 