import { createSlice } from "@reduxjs/toolkit";

export const customizeSlice = createSlice({
    name:"customize",
    initialState: {lang:true,theme:true},
    reducers:{
        changeLang:(state) => {
            state.lang = !state.lang
        },
        changeTheme:(state) => {
            state.theme = !state.theme
        }
    }
})
export const {changeLang,changeTheme} = customizeSlice.actions
export default customizeSlice.reducer