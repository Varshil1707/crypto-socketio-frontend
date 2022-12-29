import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name : null,
    price : null,
    symbol : null,
    marketcap : null,
    volume : null,
    priceChange : null,
    image : null
}

const descriptionSlice = createSlice({
  name: "description",
  initialState,
  reducers: {
    descriptionPage : (state,action) =>{
        state.name = action.payload.name
        state.price = action.payload.price
        state.symbol = action.payload.symbol
        state.marketcap = action.payload.marketcap
        state.volume = action.payload.volume
        state.priceChange = action.payload.priceChange
        state.image = action.payload.image
    }
  }
});

export const {descriptionPage} = descriptionSlice.actions

export default descriptionSlice.reducer