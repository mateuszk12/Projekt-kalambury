import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
const token = sessionStorage.getItem("token") !== null ? sessionStorage.getItem("token"):null
const data = {username:null,token:null,roles:[]}
if (token) {
    const decoded = jwtDecode(token)
    data.username = decoded.username
    data.token = token
    if (decoded.roles.User === 1){
        data.roles.push("user")
    }
    if (decoded.roles.Admin === 1){
        data.roles.push("admin")
    }
}
export const authSlice = createSlice({
    name:"auth",
    initialState: {username:data.username,token:token,roles:data.roles,error:""},
    reducers:{
        login:(state,action) => {
            const {username,token,roles} = action.payload
            state.username = username
            state.token = token
            state.roles = roles
        },
        logout: (state) => {
            state.username = null
            state.token = null
            sessionStorage.removeItem("token")
        },
        error: (state,action) => {
            state.error = action.payload
        }
    }
})

export const {login,logout,error} = authSlice.actions
export default authSlice.reducer