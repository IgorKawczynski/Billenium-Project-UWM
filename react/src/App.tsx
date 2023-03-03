import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Board from "./componenets/board/board"
import {_Data} from "./interfaces/DataBoard";
import {Simulate} from "react-dom/test-utils";
import axios from "axios";
import change = Simulate.change;
import './App.css'
import transformData from "./services/transromData";

function KabanTable() {

    const [data, setData] = useState<_Data['data']>({
        title:"Nazwa Tablicy",
        creatorName: "Twórca",
        assignedUsers: [{id:uuidv4(), name: 'twórca'}],
        columnList: {
            [uuidv4()]: {
                id: uuidv4(),
                title: 'Open',
                cardsLimit: 0,
                position:0,
                cards: [{id:uuidv4(), title: 'Tak', description:'Task description'}],
            },
            [uuidv4()]: {
                id: uuidv4(),
                title: 'In progress',
                cardsLimit: 3,
                position:1,
                cards: [],

            },
            [uuidv4()]: {
                id: uuidv4(),
                title: 'Done',
                cardsLimit: 0,
                position:2,
                cards: [],
            }
        }
    });
    const apiUrl = 'http://localhost:8080/api/boards/1001';
    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                // Handle successful response
                setData(transformData(response.data))
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
    }, []);
    console.log(data)
    // const handleDataChange = (newData:_Data["data"]) => {
    //     setData(newData);
    // }

    return (
        <Board
            data={data}
            handleDataChange={setData}
        >
        </Board>

    )
}

export default KabanTable
