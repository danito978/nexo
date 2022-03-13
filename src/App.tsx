import React, { useEffect, useState } from 'react';
import BinanceAxios from './req/Binance.req';
import HuobiAxios from './req/Huobi.req';
import { Link, useLocation } from "react-router-dom";
import './css/css.css'
import Pairs from './pairs/Pairs';
import { Route, Routes } from 'react-router';
import SinglePair from './pairs/SinglePair';
import axios from 'axios';

function App() {
  const location = useLocation().pathname.substring(1).toString();

  return (



    <div>

      <Routes>
        <Route path="*" element={<SinglePair symbol={location} />}></Route>

        <Route path="/" element={<Pairs />}></Route>
      </Routes>

    </div>
  );
}

export default App;
