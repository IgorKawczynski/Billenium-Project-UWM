import React, {useState} from 'react'
import {DragDropContext} from 'react-beautiful-dnd';
import Column from './column'
import _board from "../interfaces/Board"
import AddColumnButton from "./addColumnButton";

const onDragEnd = (result: any, columns:any, setColumns:any) => {
    if(!result.destination) return
    const {source, destination} = result;
    if (source.droppableId !== destination.droppableId){
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]:{
                    ...destColumn,
                    items: destItems
                }
            }
        )
    }else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        })
    }
}
const Board = (props:_board) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
        <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
            <h2 style={{textAlign:"center"}}>Tablica</h2>
            <AddColumnButton
                columns={props.columns}
                setColumns={props.setColumns}
            />
            <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                <DragDropContext
                    onDragEnd={(result) =>
                        onDragEnd(result, props.columns, props.setColumns)
                    }
                >
                    {Object.entries(props.columns).map(([id, column]) => {
                        return (
                            <Column
                                key={id}
                                id={id}
                                title={column.title}
                                items={column.items}
                                index={column.index}
                                columns={props.columns}
                                setColumns={props.setColumns}
                            />
                        );
                    })}
                </DragDropContext>
                {props.children}
            </div>
        </div>
    );
}

export default Board