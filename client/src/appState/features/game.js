import { createSlice } from "@reduxjs/toolkit"
const code = sessionStorage.getItem("code") !== null ? sessionStorage.getItem("code") : null
const initialState = {
    code : code,
}

export const gameSlice = createSlice({
    name:'code',
    initialState,
    reducers:{
        addCode: (state, action) => {
            state.code = action.payload
            state.relode = !state.relode
            sessionStorage.setItem("code",action.payload)
        },
        removeCode: (state) => {
            state.code = null
            sessionStorage.removeItem("code")
        },
    }
})

export const {addCode,removeCode} = gameSlice.actions
export default gameSlice.reducer