import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Board from "./componenets/board"

const itemsFromBacked = [
    {id:uuidv4(), content: 'FirstTask', desc:'Description to task 1'},
    {id:uuidv4(), content: 'SecondTask', desc:'Description to task 2'},
    {id:uuidv4(), content: 'ThirdTask', desc:'Description to task 3'}
]

const columnsFromBackend = {
        [uuidv4()]: {
            title: 'Open',
            items: itemsFromBacked
        },
        [uuidv4()]: {
            title: 'Progress',
                items: []

        },
        [uuidv4()]: {
        title: 'Done',
        items: []

    }

    };

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);

    return (
        <Board
            columns={columns}
            setColumns={setColumns}
        >
        </Board>
    )
}

export default App
