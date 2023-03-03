import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Board from "./componenets/board"
import {_Data} from "./interfaces/Data";
import {Simulate} from "react-dom/test-utils";
import axios from "axios";
import change = Simulate.change;
import './App.css'

const itemsFromBacked = [
    {id:uuidv4(), title: 'FirstTask', desc:'Description to task 1'},
    {id:uuidv4(), title: 'SecondTask', desc:'Description to task 2'},
    {id:uuidv4(), title: 'ThirdTask', desc:'Description to task 3'},
    {id:uuidv4(), title: 'ThirdTask', desc:'Description to task 3, Description to task 3, Description to task 3, Description to task 3, Description to task 3'},
    {id:uuidv4(), title: 'ThirdTask', desc:'Description to task 3'},
    {id:uuidv4(), title: 'ThirdTask', desc:'Description to task 3'},
    {id:uuidv4(), title: 'ThirdTask', desc:'Description to task 3'},
    {id:uuidv4(), title: 'ThirdTask', desc:'Description to task 3'}
]

const users = [
    {id:uuidv4(), name: 'Maciek'}
]

const columnsFromBackend = {
    [uuidv4()]: {
        id: uuidv4(),
        title: 'Open',
        cardsLimit: 0,
        position:0,
        cards: itemsFromBacked,
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
        title: 'Tested',
        cardsLimit: 3,
        position:2,
        cards: [],
    },
    [uuidv4()]: {
        id: uuidv4(),
        title: 'Done',
        cardsLimit: 0,
        position:3,
        cards: [],
    }
};

const dataFromBackEnd = {
    title:"Nazwa Tablicy",
    creatorName: "maciek",
    assignedUsers: users,
    columnList: columnsFromBackend
}
function KabanTable() {

    const [data, setData] = useState(dataFromBackEnd);
    // const apiUrl = 'http://localhost:8080/api/1001';
    // useEffect(() => {
    //     axios.get(apiUrl)
    //         .then(response => {
    //             // Handle successful response
    //             setData(response.data)
    //         })
    //         .catch(error => {
    //             // Handle error
    //             console.error(error);
    //         });
    // }, []);

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
