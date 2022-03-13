import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Pagination from '../pagination/Pagination'
import BinanceAxios from '../req/Binance.req'
import HuobiAxios from '../req/Huobi.req'
import { useNavigate } from "react-router-dom";

function Pairs() {


    const [allPairs, setAllPairs] = useState<any>([])
    // const [paginationLenght, setpaginationLenght] = useState<number>()
    // const [currentPage, setCurrentPage] = useState(1);

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery();
    const fetchAllSymbols = async (n: number) => {
        const res = await axios("https://api.binance.com/api/v3/exchangeInfo", {});
        // setpaginationLenght(res.data.symbols.length / 10)
        return setAllPairs(res.data.symbols.slice((n - 1) * 10, ((n - 1) * 10) + 10));
    }

    useEffect(() => {

        // TODO: 1st load the data
        const theN = query.get("page")
        if (query.get("page")) {
            fetchAllSymbols(Number(theN))
        }
        else {
            fetchAllSymbols(1)

        }

    }, []);
    if (allPairs) {
        console.log(allPairs)
        // console.log(allPairs.map((x: any) => x.symbol))
    }


    const navigate = useNavigate();
    const [inputText, setInputText] = useState<string>('');

    const handlerEvent = (e: React.FormEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
      };

      const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
         navigate("/" + inputText)
      };

    return (
        <div>
            <h2>Popular Cryptos</h2>

            <div className='flexBox'>
                <div>SYMBOL</div>
                <div>BINANCE</div>
                <div>HUOBI</div>
            </div>
            <div className='flexBox'>
                <div><Link to="/BTCUSDT">BTC/USDT</Link></div>
                <div>{BinanceAxios("BTCUSDT")}</div>
                <div>{HuobiAxios("BTCUSDT")}</div>
            </div>
            <div className='flexBox'>
                <Link to="/ETHUSDT">ETH/USDT</Link>
                <div>{BinanceAxios("ETHUSDT")}</div>
                <div>{HuobiAxios("ETHUSDT")}</div>
            </div>
            <div className='flexBox'>
                <Link to="/LTCUSDT">LTC/USDT</Link>
                <div>{BinanceAxios("LTCUSDT")}</div>
                <div>{HuobiAxios("LTCUSDT")}</div>
            </div>
            <div className='flexBox'>
                <Link to="/SOLUSDT">SOL/USDT</Link>
                <div>{BinanceAxios("SOLUSDT")}</div>
                <div>{HuobiAxios("SOLUSDT")}</div>
            </div>
            <div className='flexBox'>
                <Link to="/DOGEUSDT">DOGE/USDT</Link>
                <div>{BinanceAxios("DOGEUSDT")}</div>
                <div>{HuobiAxios("DOGEUSDT")}</div>
            </div>
            <div className='flexBox'>
                <Link to="/SHIBUSDT">SHIB/USDT</Link>
                <div>{BinanceAxios("SHIBUSDT")}</div>
                <div>{HuobiAxios("SHIBUSDT")}</div>
            </div> 
            <h2>All Cryptos</h2>
            {
                allPairs.map((x: any) => <a className='symbolLink' href={"/" + x.symbol}>{x.symbol}</a>)
            }
            <div>
                <div>
                    {/* <Pagination
                        className="pagination-bar"
                        currentPage={query.get("page")}
                        totalCount={Number(paginationLenght) * 10}
                        pageSize={10}
                        onPageChange={(page: React.SetStateAction<number>) => setCurrentPage(page)}
                    /> */}
                    <ul>
                        <li><a href="/">1</a></li>
                        <li><a href="/?page=2">2</a></li>
                        <li><a href="/?page=3">3</a></li>
                        <li><a href="/?page=4">4</a></li>
                        <li><a href="/?page=5">5</a></li>
                        <li><a href="/?page=6">6</a></li>
                    </ul>
                </div>
                Didn't  find what you are looking for? Search custom crypto pairs
                <form onSubmit={(e) => submitHandler(e)}>
                    <input  onChange={(e) => handlerEvent(e)} type="text" />
                    <button type="submit">Go</button>
                </form>
            </div>
        </div>
    )
}

export default Pairs