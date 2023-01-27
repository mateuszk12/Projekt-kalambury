import {configureStore} from "@reduxjs/toolkit"
import gameRed from "./features/game"
import authRed from "./features/auth"
import customizeRed from "./features/custom"
export const store = configureStore({
    reducer:{
        game: gameRed,
        auth: authRed,
        customize: customizeRed
    }
})

