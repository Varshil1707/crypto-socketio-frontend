import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import socketIo from "socket.io-client";
import "./DescriptionPage.css"

const DescriptionPage = () => {
    const [cryptoData, setCryptoData] = useState([])

    const id = useSelector((data)=>data.description.id)

    let socket
    // const ENDPOINT = "http://localhost:3001/";
    const ENDPOINT = "https://crypt-socketio-backend.onrender.com";
  useEffect(()=> {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on('data-emit',(data)=>setCryptoData(data.filter((item)=> item.id === id)))
  },[])
  console.log(cryptoData)
  return (
    <div className='descriptionPageContainer' >
          {cryptoData.map((data)=>{return(
          <>
          <div className='image' >
            <img src={data.image} />
            </div>
            <div className='description' >
            <p id='name'>Name : {data.name}</p>
            <p id='symbol'>Symbol : {data.symbol}</p>
            <p id='price'>Price : {data.current_price.toLocaleString()}</p>
            <p id='marketCap' >marketCap : {data.total_volume.toLocaleString()}</p>
            <p id='volume'>Volume : {data.market_cap}</p>
            {data.price_change_24h < 0 ? (
            <p >Price-change :<span style={{color : "red"}} > {data.price_change_24h.toFixed(2)}%</span></p>
          ) : (
            <p >Price-change :<span style={{color : "green"}} > {data.price_change_24h.toFixed(2)}%</span></p>
          )}        </div>
          </>)})}
    </div>
  )
}

export default DescriptionPage