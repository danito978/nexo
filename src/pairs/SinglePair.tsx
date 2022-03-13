import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Symbol {
  symbol: String
}

const SinglePair = (symbol: Symbol) => {

  const [huobiPriceMoving, setHuobiPriceMoving] = useState<string>(String);
  const [binancePriceMoving, setBinancePriceMoving] = useState<string>(String);
  const [errorMsgB, setErrorMsgB] = useState<string>("")
  const [errorMsgH, setErrorMsgH] = useState<string>("")
  //check if pair exists

  const fetchhuobi = () => {
    axios.get("https://api.huobi.pro/market/trade?symbol=" + symbol.symbol.toLowerCase(), {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    }).then((res) => setHuobiPriceMoving(res.data.tick.data[0].price)).catch((error) => {
      console.log(error)
      setErrorMsgH("Something went wrong! Crypto Pair may not exist on Huobi")
    });
  }




  const fetchbinance = () => {
    axios.get("https://api.binance.com/api/v3/ticker/price?symbol=" + symbol.symbol, {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    }).then((res: { data: { price: React.SetStateAction<string>; }; }) => setBinancePriceMoving(res.data.price)).catch((error) => {
      console.log(error)
      setErrorMsgB("Something went wrong! Crypto Pair may not exist on Binance")
    });
  }

  const second = 1000;
  useEffect(() => {
    const interval = setInterval(() => {
    }, second);
    return () => clearInterval(interval);
  }, [])

  fetchhuobi();
  fetchbinance();
  return (
    <div>SinglePair {symbol.symbol.toString()}
    <div>Binance: {binancePriceMoving}</div>
    <div>Huobi: {huobiPriceMoving}</div>
    <div>{errorMsgB}</div>
    <div>{errorMsgH}</div>
    </div>

  )
}

export default SinglePair