import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    code : "",
    currUsers:[]
}

export const gameSlice = createSlice({
    name:'code',
    initialState,
    reducers:{
        addCode: (state, action) => {
            state.code = action.payload
        },
        removeCode: (state) => {
            state.code = ""
        },

    }
})

export const {addCode,removeCode} = gameSlice.actions
export default gameSlice.reducer