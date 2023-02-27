import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Board from "./componenets/board"

const itemsFromBacked = [
    {id:uuidv4(), content: 'FirstTask', desc:'Description to task 1'},
    {id:uuidv4(), content: 'SecondTask', desc:'Description to task 2'},
    {id:uuidv4(), content: 'ThirdTask', desc:'Description to task 3'},
    {id:uuidv4(), content: 'ThirdTask', desc:'Description to task 3, Description to task 3, Description to task 3, Description to task 3, Description to task 3'},
    {id:uuidv4(), content: 'ThirdTask', desc:'Description to task 3'},
    {id:uuidv4(), content: 'ThirdTask', desc:'Description to task 3'},
    {id:uuidv4(), content: 'ThirdTask', desc:'Description to task 3'},
    {id:uuidv4(), content: 'ThirdTask', desc:'Description to task 3'}
]

const columnsFromBackend = {
    [uuidv4()]: {
        title: 'Open',
        items: itemsFromBacked,
        index: 0
    },
    [uuidv4()]: {
        title: 'Progress',
        items: [],
        index: 1

    },
    [uuidv4()]: {
        title: 'Done',
        items: [],
        index: 2
    },
    [uuidv4()]: {
        title: 'Saved',
        items: [],
        index: 3
    }
};

function test() {
    const [columns, setColumns] = useState(columnsFromBackend);
    const [items, setItems] = useState(itemsFromBacked);

    return (
        <Board
            columns={columns}
            setColumns={setColumns}
            items={items}
            setItems={setItems}
        >
        </Board>
    )
}

export default test
