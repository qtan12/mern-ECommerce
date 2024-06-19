import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'
                                            // product tên tương ứng với name bên productSlice 
export const getCurrent = createAsyncThunk('user/current', async(data, {rejectWithValue}) =>{
    const response = await apis.apiGetCurrent()
    if(!response.success) return rejectWithValue(response)
    return response.rs
})