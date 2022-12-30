import { LinearProgress } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socketIo from "socket.io-client";
import "./DescriptionPage.css";
import Toaster from "./Toaster";

const DescriptionPage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [errorMessage, seterrorMessage] = useState(false);
  const [loader, setLoader] = useState(false);
  const id = useSelector((data) => data.description.id);

  let socket;
  const ENDPOINT = "http://localhost:3001/";
  // const ENDPOINT = "https://crypt-socketio-backend.onrender.com";
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("data-emit", (data) => {
      setLoader(true);
      setCryptoData(data.filter((item) => item.id === id));
      // setLoader(false)
      setTimeout(() => setLoader(false), 100);
    });
    socket.on("data-error", (data) => {
      seterrorMessage(true);
    });
  }, []);
  console.log(cryptoData);
  return (
    <div>
      {loader && (
        <Stack sx={{ width: "100%", color: "red", top: "10%" }} spacing={2}>
          <LinearProgress  color="inherit" />
        </Stack>
      )}
    <div className="descriptionPageContainer">
      {errorMessage ? (
        <Toaster errorMessage={"Something Went Wrong!!!"} />
      ) : (
        <>
          {cryptoData.map((data) => {
            return (
              <>
                <div className="image">
                  <img src={data.image} alt={data.name} />
                </div>
                <div className="description">
                  <p id="name">Name : {data.name}</p>
                  <p id="symbol">Symbol : {data.symbol}</p>
                  <p id="price">
                    Price : {data.current_price.toLocaleString()}
                  </p>
                  <p id="marketCap">
                    marketCap : {data.total_volume.toLocaleString()}
                  </p>
                  <p id="volume">Volume : {data.market_cap.toLocaleString()}</p>
                  {data.price_change_percentage_24h < 0 ? (
                    <p>
                      Price-change :
                      <span style={{ color: "red" }}>
                        {" "}
                        {data.price_change_percentage_24h.toFixed(2)} $
                      </span>
                    </p>
                  ) : (
                    <p>
                      Price-change :
                      <span style={{ color: "green" }}>
                        {" "}
                        {data.price_change_percentage_24h.toFixed(2)} $
                      </span>
                    </p>
                  )}{" "}
                </div>
              </>
            );
          })}
        </>
      )}
    </div>
    </div>
  );
};

export default DescriptionPage;
