import { useRef } from "react";
import { STOCKS_LIST } from "../constants";
import { useDispatch } from "react-redux";
import { onAddStock } from "../store/StockSlice";

const StockList = () => {
    const stockRef = useRef("");
    const dispatch = useDispatch();
    const stockChangeHandler = () => {
        console.log(stockRef.current.value);
        dispatch(onAddStock(stockRef.current.value));
        
    }
    return <div className="flex flex-col justify-center border border-gray-400 rounded-md p-5 m-5 w-[500px] text-center gap-1">
        <p className="text-red-500 font-bold text-3xl">Add Stocks to WatchList</p>
        <div className="flex justify-center">
        <select name="stocks" className="border mt-2 w-32 p-1 h-8 border-black rounded-sm" ref={stockRef}>
            {STOCKS_LIST.map(stock => <option value={stock} key={stock}>{stock}</option>)}
        </select>
        <button type="button" className="bg-red-500 text-white border rounded-md h-8 w-32 mt-2 p-1 mx-4" onClick={stockChangeHandler}>Add</button>
        </div>
    </div>
};
export default StockList;