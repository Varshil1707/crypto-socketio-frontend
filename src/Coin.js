import React, { useState } from "react";
import "./Coin.css";
import { useDispatch } from "react-redux";
import { descriptionPage } from "./features/descriptionSlice";
import { useNavigate } from "react-router-dom";

const Coin = ({
  name,
  id,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  return (
    <div className="coin-container">

      <div
        className="coin-row"
        onClick={() => {
          dispatch(
            descriptionPage({
              id : id,
              name: name,
              price: price,
              symbol: symbol,
              marketcap: marketcap,
              volume: volume,
              image: image,
              priceChange: priceChange,
            })
          );
          navigate(`/${symbol}`)
        }}
      >
        <div className="coin">
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
          <p className="coin-symbol">{symbol}</p>
        </div>
        <div className="coin-data">
          <p className="coin-price">${price}</p>
        </div>

        <div className="coin-data">
          <p className="coin-volume">${volume.toLocaleString()}</p>
        </div>
        <div className="coin-data">
          {priceChange < 0 ? (
            <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
          ) : (
            <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
          )}
        </div>

        <span className="coin-marketcap">${marketcap.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Coin;
