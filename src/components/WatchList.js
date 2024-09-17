import { useSelector } from "react-redux";
import Stock from "./Stock";

const WatchList = () => {
    const stocks =  useSelector(store => store["stock-data"].stocks);
    if(!stocks) return;
    return <div className="border border-gray-500 rounded-md p-5 m-5 flex flex-col w-[300px]">
        <p className="text-3xl text-red-500 font-bold">Watch List</p>
        {stocks.map(stock => <Stock name={stock.name} price={stock.price} key={stock.name}/>)}
    </div>
};
export default WatchList;