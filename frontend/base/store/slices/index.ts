import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth.slice'
import metricsReducer from './metrics.slice'

export const rootReducer = combineReducers({
    auth: authReducer,
    metrics: metricsReducer,

})