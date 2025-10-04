import { AuthModel } from "@/base/models/auth";
import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, refreshThunk, registerThunk } from "../thunks/auth.thunk";
import toast from "react-hot-toast";

const emptySession = { accessToken: '', expiredAt: 0, userId: '', username: '' }
export interface AuthState {
    loading: boolean,
    session: AuthModel;
    loggedIn: boolean,
}
const initialState: AuthState = {
    loading: false,
    session: emptySession,
    loggedIn: false,
}

export const sessionSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loggedIn = true;
                state.session = action.payload;
                toast.success('Login Successfully!')
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loggedIn = false;
                // state.session = action.payload;
                toast.success('Register Successfully!')
            })
            .addCase(logoutThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loggedIn = false;
                state.session = emptySession;
                toast.success('Logout Successfully!')
            })
            .addCase(refreshThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loggedIn = true;
                state.session = action.payload ;
            })
            .addMatcher(isRejected(loginThunk, registerThunk, logoutThunk),
                (state, action) => {
                    state.loading = false;
                    const errorMes = (action?.payload as any)?.message || action.error.message || 'Error'
                    toast.error(errorMes)
                })
            .addMatcher(isPending(loginThunk, registerThunk, logoutThunk),
                (state) => { state.loading = true })
    },

})

export const { } = sessionSlice.actions
export default sessionSlice.reducer 