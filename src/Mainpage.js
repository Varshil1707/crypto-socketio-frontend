import React, { useState, useEffect } from "react";
import "./App.css";
import Coin from "./Coin";
import socketIo from "socket.io-client";
import Toaster from "./Toaster";
import {  LinearProgress, Stack } from "@mui/material";

function Mainpage() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [erroroccured, setErroroccured] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);
  // const ENDPOINT = "http://localhost:3001/";
  const ENDPOINT = "https://crypt-socketio-backend.onrender.com";
  let socket;

  useEffect(() => {
    setLoader(true);
    
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    
    socket.on("data-emit", (data) => {
      setLoader(true);
      setCoins(data);
      setTimeout(()=>setLoader(false),500)
    });

    socket.on("data-error", (data) => setErrorMessage(data.message));
    socket.on("display-error-message", (errorMessage) =>
      setErroroccured(errorMessage)
    );
  }, []);

  console.log(loader)


  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="coin-app">
      {erroroccured ? (
        <Toaster errorMessage={errorMessage} />
      ) : (
        <>
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
          {loader && (
            <Stack sx={{ width: "60%", color: "red", top: "10%" }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>
          )}
          {filteredCoins.map((coin) => {
            return (
              <Coin
                key = {coin.id}
                id={coin.id}
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
        </>
      )}
    </div>
  );
}

export default Mainpage;
