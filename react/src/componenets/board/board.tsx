import React, {useState} from 'react'
import {DragDropContext} from 'react-beautiful-dnd';
import Column from './componetns/column/column'
import BoardProps from "./interface/Board"
import AddColumnButton from "./componetns/column/components/addColumnButton/addColumnButton";

const onDragEnd = (result: any, columns:any, setData:any, data:any) => {
    if(!result.destination) return
    const {source, destination} = result;
    if (source.droppableId !== destination.droppableId){
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.cards];
        const destItems = [...destColumn.cards];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setData({
            ...data,
            columnList: {
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    cards: sourceItems
                },
                [destination.droppableId]:{
                    ...destColumn,
                    cards: destItems
                }
            }
        })
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setData({
            ...data,
            columnList: {
                ...columns,
                [source.droppableId]: {
                    ...column,
                    cards: copiedItems
                }
            }
        })
    }
}
const Board = (props:BoardProps) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };


    return (
        <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
            <h2 style={{textAlign:"center"}}>{props.data.title}</h2>
            <AddColumnButton
                data={props.data}
                handleDataChange={props.handleDataChange}
            />
            <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                <DragDropContext
                    onDragEnd={(result) =>
                        onDragEnd(result, props.data.columnList, props.handleDataChange, props.data)
                    }
                >
                    {Object.entries(props.data.columnList).map(([id, column]) => {
                        return (
                            <Column
                                key={id}
                                id={id}
                                title={column.title}
                                cardsLimit={column.cardsLimit}
                                position={column.position}
                                cards={column.cards}
                                data={props.data}
                                handleDataChange={props.handleDataChange}
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