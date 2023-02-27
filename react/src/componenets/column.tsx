import React from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Task from "./card";
import _column from '../interfaces/Column'
import AddCardButton from "./addCardButton";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Icon} from "@mui/material";
const Column = (props:_column) => {
    const removeColumn = (columnId: string, columns: Record<string, any>, setColumns: React.Dispatch<React.SetStateAction<Record<string, any>>>) => {
        // utwórz nową tablicę bez usuwanej kolumny
        const newColumns = { ...columns };
        delete newColumns[columnId];
        // przypisz nową tablicę do state'u
        setColumns(newColumns);
    }

    return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <h2 style={{width:'100%', display:"flex", justifyContent:"space-around"}}>
                <div style={{display:"flex", alignItems:"center"}}>
                {props.title }
                </div>
                {props.index !== 0 && props.index !== Object.keys(props.columns).length-1 && (
                    <IconButton
                        aria-label="delete"
                        onClick={() => removeColumn(props.id, props.columns, props.setColumns)}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}
            </h2>
            <div style={{margin:8}}>
                {props.index === 0 && <AddCardButton columns={props.columns} setColumns={props.setColumns}/>}
                <Droppable droppableId={props.id} key={props.id}>
                    {(provided, snapshot) =>{
                        return(
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    backgroundColor: props.items.length > 3 && props.index != 0 && props.index != Object.keys(props.columns).length-1 ? '#f24e53' : 'white',
                                    padding: 4,
                                    width: 250,
                                    minHeight:150
                                }}
                            >
                                {props.items.map((item:any, index:any) => {
                                        return (
                                            <Task
                                                key={item.id}
                                                id={item.id}
                                                index={index}
                                                content={item.content}
                                                desc={item.desc}
                                                columnId={props.id}
                                                columns={props.columns}
                                                setColumns={props.setColumns}
                                            />
                                        )
                                    }
                                )}
                                {provided.placeholder}
                            </div>
                        )}}
                </Droppable>
            </div>
        </div>
    )
}

export default Column
