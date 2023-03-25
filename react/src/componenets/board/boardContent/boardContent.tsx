import React, {useState} from "react";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {onDragEnd} from "@/services/utils/boardUtils/boardUtils";
import {Box, Button, Stack, useTheme} from "@mui/material";
import Column from "@/componenets/column/column";
import {boardContentProps} from "@/componenets/board/interfaces/boardContentInterface/BoardContent";
import {StyledContentScrollbar} from "@/assets/styles/styledScrollbar";
import BoardUsers from "@/componenets/users/usersMenu/boardUsers";
const BoardContent = (props:boardContentProps) =>{
    const theme = useTheme();
    return(
        <Box
            sx={{overflowX:'auto'}}
        >
            <DragDropContext
                onDragEnd={(result) =>
                    onDragEnd(result, props.data.columnList, props.setData, props.data)
                }
            >
                <Droppable
                    droppableId={props.data.id}
                    direction="horizontal"
                    type="column">
                    {(provided, snapshot) => (
                        <Stack
                            spacing={2}
                            direction={"row"}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            marginLeft={props.users ? '250px' : '0'}
                            sx={{transition: theme.transitions.create(['margin', 'width'], {
                                    easing: theme.transitions.easing.easeOut,
                                    duration: theme.transitions.duration.enteringScreen,
                                }),}}
                        >
                            {Object.values(props.data.columnList)
                                .sort((a, b) => a.position - b.position) // sortowanie po pozycji
                                .map((column) => (
                                    <Column
                                        key={column.id}
                                        id={column.id}
                                        title={column.title}
                                        cardsLimit={column.cardsLimit}
                                        position={column.position}
                                        cells={column.cells}
                                        data={props.data}
                                        setData={props.setData}
                                        isDragging={snapshot.isDraggingOver}
                                    />
                                ))}
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
                <BoardUsers users={props.users} setUsers={props.setUsers}/>
            </DragDropContext>
        </Box>
    )
}

export default BoardContent