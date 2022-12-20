import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";
import socketIo from "socket.io-client";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const ENDPOINT = "http://localhost:4500/";

  const getData = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=falsey"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  };

  // useEffect(() => {
  //   getData();
  //   socket.on("connection", ()=>{
  //     console.log("Connection Established")
  //   })
  // }, []);

  useEffect(() => {
    const socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("data-emit", (data) => {
      setCoins(data);
      console.log("first")
    });
    socket.on("data-error", (data) => console.log(data));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
