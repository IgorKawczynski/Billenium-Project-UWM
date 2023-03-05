import React from "react";
import {Draggable} from 'react-beautiful-dnd'
import Card from "@mui/material/Card"
import Avatar from './componetnts/Avatar/avatar'
import {CardActionArea} from "@mui/material"
import CardProps from './interface/Card'
import EditCardButton from './componetnts/editCardButton/editCardButton'
import Box from "@mui/material/Box";
const Task = (props:CardProps) => {
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
                        <Box style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}>
                            <Box>
                                <Box style={{fontSize:'1.3rem'}}>
                                    {props.title}
                                </Box>
                                {props.index}
                                {props.desc}

                            </Box>
                            <Box>
                                <Box style={{display:"flex", flexDirection:"column",alignItems:"center", minWidth:'50px'}}>
                                <Avatar name={"Maciek"} lastName={"Janek"}/>
                                {/*<Avatar name={"Maciek"} lastName={"Makowski"}/>*/}
                                {/*<Avatar name={"Kuba"} lastName={"laczek"}/>*/}
                                </Box>
                            </Box>
                        </Box>
                        <EditCardButton id={props.id} columnId={props.columnId} title={props.title} desc={props.desc} data={props.data} handleDataChange={props.handleDataChange}/>
                    </Card>
                )
            }}
        </Draggable>

    )
}
export default Task