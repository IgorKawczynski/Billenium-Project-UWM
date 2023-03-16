import React from "react";
import Box from "@mui/material/Box"
import {ColumnCellProps} from "@/interfaces/columnCellInterface/ColumnCell";
import Task from "@/componenets/card/card";
import {Droppable} from "react-beautiful-dnd";
const ColumnCell = (props:ColumnCellProps) =>{

    return(
        <Droppable
            droppableId={props.id}
            type="task"
        >
            {(provided, snapshot) =>{
                return(
                    <Box
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            backgroundColor:
                                props.cards
                                && props.cards.length > props.cardsLimit
                                && props.cardsLimit != 0
                                && props.position != 0
                                && props.position != Object.keys(props.data.columnList).length-1 ? '#f24e53' : 'transparent'
                                && props.isDragging ? 'rgba(154,154,154,0.11)': 'transparent',
                            padding: 4,
                            width: 250,
                            minHeight:150
                        }}
                    >
                        { props.cards && props.cards.map((item:any, index:number) => {
                                return (
                                    <Task
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        desc={item.description}
                                        index={index}
                                        columnId={props.id}
                                        setData={props.setData}
                                        data={props.data}
                                    />
                                )
                            }
                        )}
                        {provided.placeholder}
                    </Box>
                )}}
        </Droppable>
    )
}

export default ColumnCell