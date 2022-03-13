import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


const BinanceAxios = (symbol: string) => {
    const [binancePrice, setBinancePrice] = useState(String);
    // /api/v1/exchangeInfo https://api.binance.com/api/v3/exchangeInfo
    useEffect(() => {
        axios.get("https://api.binance.com/api/v3/ticker/price?symbol=" + symbol, {

    }).then((res: { data: { price: React.SetStateAction<string>; }; }) => setBinancePrice(res.data.price))


}, []);


    return binancePrice
}

export default BinanceAxios