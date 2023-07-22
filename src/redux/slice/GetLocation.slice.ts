import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiConfig, ApiEndPoint, ApiMethod, returnApiHeader } from '../../api/ApiConfig';
import { Alert } from "react-native";

export const getLocationCall = createAsyncThunk("getLocationCall", async (data) => {
    try {
        let apiObj = {
            url: `${ApiConfig.BASE_URL}${ApiEndPoint.GET_location}`,
            headers: returnApiHeader(),
            method: `${ApiMethod.POST}`,
            data:data
        }
        const response = await axios(apiObj);
        let finalRes = await response?.data
        return finalRes;
    } catch (error) {
        Alert.alert("", error?.message)
    }
})

export interface initialing {
    data: any
    error: boolean
    loading: boolean
}

let initialState: initialing = {
    data: {},
    error: false,
    loading: false
}

const GetLocationSlice = createSlice({
    name: "GetLocationSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getLocationCall.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getLocationCall.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = false;
        });
        builder.addCase(getLocationCall.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.data = action.payload;
        });
    }
})
export default GetLocationSlice.reducer
