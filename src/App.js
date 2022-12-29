import React from 'react'
import Mainpage from './Mainpage'
import { Routes, Route } from "react-router-dom";
import DescriptionPage from './DescriptionPage';

const App = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<Mainpage/>} />
        <Route path='/:symbol' element = {<DescriptionPage/>} />
        </Routes>

    </div>
  )
}

export default App