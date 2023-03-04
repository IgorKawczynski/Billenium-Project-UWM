import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Board from "./componenets/board/board"
import {_Data} from "./interfaces/DataBoard";
import {Simulate} from "react-dom/test-utils";
import axios from "axios";
import change = Simulate.change;
import './App.css'
import transformData from "./services/transromData";
import {loadBoardFromBackend} from "./services/boardService";
import {loadDefaultData} from "./services/boardService";

function KabanTable() {
    const [data, setData] = useState<_Data['data']> (loadDefaultData);
    async function fetchData() {
        const result = await loadBoardFromBackend("1001");
        if (result) {
            try {
                setData(result);
            }
            catch{
                setData(loadDefaultData())
            }
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Board
            data={data}
            handleDataChange={setData}
        >
        </Board>

    )
}

export default KabanTable
