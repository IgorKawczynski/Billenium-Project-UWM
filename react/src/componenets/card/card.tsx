import React from "react";
import {Draggable} from 'react-beautiful-dnd'
import Card from "@mui/material/Card"
import Avatar from '@/componenets/avatar/avatar'
import {useTheme} from "@mui/material"
import CardProps from '@/interfaces/cardInterface/Card'
import EditCardButton from '@/componenets/editCardButton/editCardButton'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const Task = (props:CardProps) => {
    const theme = useTheme()
    return(
        <Draggable
            key={props.id}
            draggableId={props.id}
            index={props.index}
        >
            {(provided:any, snapshot:any) => {
                return (
                    <Card
                        variant="outlined"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        
                        sx={{
                            boder:'Primary',
                            userSelect: 'none',
                            paddingX: '16px',
                            paddingY:'8px',
                            margin: '0 0 8px 0',
                            minHeight: '50px',
                            minWidth:200,
                            background: snapshot.isDragging ? theme.palette.background.drag : theme.palette.background.default,
                            color: 'black',
                            ...provided.draggableProps.style

                        }}
                    >
                        <Box style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}>
                            <Box
                                width={'100%'}
                            >
                                <Box
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                    width={'100%'}
                                >
                                    <Typography
                                        color={'textPrimary'}
                                        variant={'subtitle1'}
                                    >
                                        {props.title}
                                    </Typography>
                                    <EditCardButton
                                        id={props.id}
                                        columnId={props.columnId}
                                        title={props.title}
                                        desc={props.desc}
                                        data={props.data}
                                        setData={props.setData}
                                    />
                                </Box>
                                <Typography
                                    color={'textPrimary'}
                                    variant={'caption'}
                                >
                                    {props.desc}
                                </Typography>

                            </Box>
                        </Box>
                    </Card>
                )
            }}
        </Draggable>

    )
}
export default Task