import React from "react";
import {Draggable, Droppable} from 'react-beautiful-dnd'
import Card from "@mui/material/Card"
import {Tooltip, useTheme} from "@mui/material"
import CardProps from '@/components/card/interfaces/cardInterface/Card'
import EditCardButton from '@/components/card/editCardButton/editCardButton'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardUsers from "@/components/card/cardUsers/cardUsers";
import {CardPercentageCompleted} from "@/components/card/cardPercentageCompleted/cardPercentageCompleted";
import LockIcon from "@mui/icons-material/Lock";

const Task = (props:CardProps) => {
    const theme = useTheme()
    return(
        <Draggable
            key={props.id}
            draggableId={props.id}
            index={props.index}
            isDragDisabled={props.isLocked}
        >
            {(provided:any, snapshot:any) => {
                return (
                    <Droppable droppableId={props.id+"c"} type={'user'}>
                        {(providedDrop) => {
                            return(
                                <Card
                                    variant="outlined"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}

                                    sx={{
                                        border:'Primary',
                                        userSelect: 'none',
                                        margin: '0 0 8px 0',
                                        minHeight: '50px',
                                        width:230,
                                        flexWrap:'wrap',
                                        background: snapshot.isDragging ? theme.palette.background.drag : theme.palette.background.default,
                                        color: 'black',
                                        ...provided.draggableProps.style,
                                        display:'flex',

                                    }}
                                >
                                    <Box style={{
                                        maxWidth:'300px',
                                        width:'100%',
                                        display:"flex",
                                        justifyContent:"space-between",

                                    }}
                                         {...providedDrop.droppableProps}
                                         ref={providedDrop.innerRef}
                                    >
                                        {props.color == 'default' && (
                                            <Box
                                                height={'100%'}
                                                width={'10px'}
                                                bgcolor={theme.palette.text.secondary}
                                            />
                                        )}
                                        {props.color != 'default' && (
                                            <Box
                                                height={'100%'}
                                                width={'10px'}
                                                bgcolor={props.color}
                                            />
                                        )}
                                        <Box
                                            width={'100%'}
                                            paddingY={'8px'}
                                            paddingX={'16px'}
                                        >
                                            <Box
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                                width={'100%'}
                                            >
                                                <Box
                                                    display={"flex"}
                                                    alignItems={"center"}
                                                >
                                                    {props.isLocked && (
                                                        <Tooltip title={'Card is Locked'} placement={"top"}>
                                                            <LockIcon sx={{
                                                                color:theme.palette.primary.main,
                                                                fontSize:'14px'
                                                                 }}
                                                            />
                                                        </Tooltip>
                                                    )}
                                                    <Typography
                                                        color={'textPrimary'}
                                                        variant={'body2'}
                                                    >
                                                        {props.title.length > 18 && (props.title.slice(0,18) + "...")}
                                                        {props.title.length <= 18 && (props.title)}
                                                    </Typography>
                                                </Box>
                                                <EditCardButton
                                                    id={props.id}
                                                    cellId={props.cellId}
                                                    title={props.title}
                                                    desc={props.desc}
                                                    assignedUsers={props.assignedUsers}
                                                    subtasks={props.subtasks}
                                                    isLocked={props.isLocked}
                                                    data={props.data}
                                                    setData={props.setData}

                                                />
                                            </Box>
                                            <Box display={"flex"} justifyContent={"space-between"} marginTop={1}>
                                                {props.subtasks.length > 0 && (
                                                    <CardPercentageCompleted subtasks={props.subtasks}/>
                                                )}
                                                {props.subtasks.length == 0 && (
                                                    <Box/>
                                                )}
                                                <Box
                                                    maxHeight={'25px'}
                                                    maxWidth={'25px'}
                                                >
                                                    {providedDrop.placeholder}
                                                </Box>
                                                <CardUsers
                                                    providedDrop={providedDrop}
                                                    id={props.id}
                                                    assignedUsers={props.assignedUsers}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                            )
                        }}
                    </Droppable>
                )
            }}
        </Draggable>

    )
}
export default Task