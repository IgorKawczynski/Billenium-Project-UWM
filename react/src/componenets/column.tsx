import React from 'react'

interface columnData{
    title: string;
    amount: number;
}

const Column = (props:columnData) => {


    return(
        <div className="column">
            <div className="columnTop">
            <div className="columnTitle">{props.title}</div>
            <div className="columnAmount">{props.amount}</div>
            <button className="columnAddTask">+</button>
            </div>
        </div>
    )
}

export default Column