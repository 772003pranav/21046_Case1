import { useEffect } from 'react';
import './App.css';
import StockList from './components/StockList';
import StocksView from './components/WatchList';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useDispatch, useSelector } from 'react-redux';
import { updatePrice } from './store/StockSlice';

function App() {
  // useEffect(() => {
  //   const connect = () => {
  //     const socket = new WebSocket("wss://ws.finnhub.io?token=clnd5j9r01qkjffn5tn0clnd5j9r01qkjffn5tng");
  //     socket.onopen = () => {
  //       console.log("connected");
  //       socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}));
  //       socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AMZN'}));
  //     }
  //     socket.onmessage = (e) => {
  //       console.log(JSON.parse(e.data));
  //     }; 
  //     }
  //   connect();
  // }, []);
  const dispatch = useDispatch();
  const stockToSubscribe = useSelector(store => store["stock-data"].stockToSubscribe);

  useEffect(() => {
    if(stockToSubscribe) {
      console.log("sending");
      sendJsonMessage(
        {'type':'subscribe', 'symbol': stockToSubscribe}
      )
    }
  }, [stockToSubscribe]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket("wss://ws.finnhub.io?token=clnd5j9r01qkjffn5tn0clnd5j9r01qkjffn5tng", 
    {
      share: false,
      shouldReconnect: true
    }
  );
  useEffect(() => {
    console.log("ready state");
    if(readyState === ReadyState.OPEN) {
      console.log("sending");
      // sendJsonMessage(
      //   {'type':'subscribe', 'symbol': 'AAPL'}
      // )
    }
  }, [readyState]);

  useEffect(() => {
    if(!lastJsonMessage) return;
    const {data} = lastJsonMessage;
    if(!data) return;
    const { p, s} = data[0];
    dispatch(updatePrice({ name: s, price: p}));
  }, [lastJsonMessage]);
  return (
    <>
    <div className="font-bold text-3xl bg-red-600 text-white text-center p-5">
      Stock Market Data
    </div>
    <div className='flex gap-10'>
      <StockList />
      <StocksView />
    </div>
    </>
  );
}

export default App;
