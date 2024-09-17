import { configureStore } from "@reduxjs/toolkit";
import StockSlice from "./StockSlice";

const Store = configureStore({
    reducer: {
        "stock-data": StockSlice
    }
});
export default Store;