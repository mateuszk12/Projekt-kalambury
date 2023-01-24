import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"auth",
    initialState: {username:null,token:null,error:""},
    reducers:{
        login:(state,action) => {
            const {username,token} = action.payload
            state.username = username
            state.token = token
        },
        logout: (state) => {
            state.username = null
            state.token = null
        },
        error: (state,action) => {
            state.error = action.payload
        }
    }
})

export const {login,logout,error} = authSlice.actions
export default authSlice.reducer