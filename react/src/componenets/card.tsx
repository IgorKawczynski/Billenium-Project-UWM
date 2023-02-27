import React from "react";
import {Draggable} from 'react-beautiful-dnd'
import Card from "@mui/material/Card"
import Avatar from './avatar'
import {CardActionArea} from "@mui/material"
import _task from '../interfaces/Task'
import EditCardButton from './editCardButton'
const Task = (props:_task) => {
    return(
        <Draggable key={props.id} draggableId={props.id} index={props.index}>
            {(provided:any, snapshot:any) => {
                return (
                    <Card
                        variant="outlined"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            userSelect: 'none',
                            padding: 16,
                            margin: '0 0 8px 0',
                            minHeight: '50px',
                            background: snapshot.isDragging ? '#d0d0d0' : 'white',
                            color: 'black',
                            ...provided.draggableProps.style

                        }}
                    >
                        <div style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}>
                            <div>
                                <div style={{fontSize:'1.3rem'}}>
                                    {props.content}
                                </div>
                                <br/>
                                {props.index}
                                {props.desc}

                            </div>
                            <div>
                                <div style={{display:"flex", flexDirection:"column",alignItems:"center", minWidth:'50px'}}>
                                <Avatar name={"Maciek"} lastName={"Janek"}/>
                                <Avatar name={"Maciek"} lastName={"Makowski"}/>
                                <Avatar name={"Kuba"} lastName={"laczek"}/>
                                </div>
                            </div>
                        </div>
                        <EditCardButton id={props.id} columnId={props.columnId} columns={props.columns} setColumns={props.setColumns} content={props.content} desc={props.desc}/>
                    </Card>
                )
            }}
        </Draggable>
    )
}
export default Task