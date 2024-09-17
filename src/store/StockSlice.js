import { createSlice } from "@reduxjs/toolkit";

const StokcSlice = createSlice({
    name: "stock-data",
    initialState: {
        stocks: [],
        stockToSubscribe: null
    },
    reducers: {
        onAddStock: (state, action) => {
            if(state.stocks.find(stock => stock.name === action.payload)) {
                return state;
            }
            state.stocks.push({ name: action.payload, price: null});
            state.stockToSubscribe = action.payload;
        },
        updatePrice: (state, action) => {
            state.stocks = state.stocks.map(stock => {
                if(stock.name === action.payload.name) {
                    stock.price = action.payload.price;
                }
                return stock;
            })
        }
    }
});
export default StokcSlice.reducer;
export const { onAddStock, updatePrice } = StokcSlice.actions;