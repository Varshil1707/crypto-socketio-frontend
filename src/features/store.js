import { configureStore } from "@reduxjs/toolkit";
import descriptionReducer from './descriptionSlice'

export const store = configureStore({
    reducer : {
        description : descriptionReducer
    }
})