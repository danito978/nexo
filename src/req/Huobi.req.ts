import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const HuobiAxios = (symbol: string) => {

    const [huobiPrice, setHuobiPrice] = useState(String);

    useEffect(() => {
        axios.get("https://api.huobi.pro/market/trade?symbol=" + symbol.toLowerCase(), {
        }).then((res: { data: { tick: { data: { price: React.SetStateAction<string>; }[]; }; }; }) => setHuobiPrice(res.data.tick.data[0].price))
    }, []);

    

    return huobiPrice


}

export default HuobiAxios 