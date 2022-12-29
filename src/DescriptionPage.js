import React from 'react'
import { useSelector } from "react-redux"; 
import "./DescriptionPage.css"

const DescriptionPage = () => {
    const name = useSelector((data)=>data.description.name)
    const image = useSelector((data)=> data.description.image)
    const price = useSelector((data)=> data.description.price)
    const symbol = useSelector((data)=>data.description.symbol)
    const marketCap = useSelector((data)=>data.description.marketCap)
    const volume = useSelector((data)=>data.description.volume)
    const priceChange = useSelector((data)=>data.description.priceChange)
  return (
    <div className='descriptionPageContainer' >
        
        <div className='image' >
            <img src={image} />
            </div>
            <div className='description' >
            <p id='name'>Name : {name}</p>
            <p id='symbol'>Symbol : {symbol}</p>
            <p id='price'>Price : {price}</p>
            <p id='marketCap' >marketCap : {marketCap}</p>
            <p id='volume'>Volume : {volume}</p>
            <p id = 'priceChange' >Price Change : {priceChange}</p>
        </div>
    </div>
  )
}

export default DescriptionPage