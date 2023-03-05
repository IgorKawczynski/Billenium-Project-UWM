import React, { useState, useEffect } from 'react'
import Board from "./componenets/board/board"
import Home from "./componenets/home/home";
import './App.css'
import {Route, Routes} from "react-router-dom";

function KabanTable() {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/board" element={<Board/>}/>
        </Routes>
    )
}

export default KabanTable
