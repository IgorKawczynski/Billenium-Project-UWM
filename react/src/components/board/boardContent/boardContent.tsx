import React from "react";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {onDragEnd} from "@/services/utils/boardUtils/boardUtils";
import {Box, Stack, useTheme} from "@mui/material";
import Column from "@/components/column/column";
import {boardContentProps} from "@/components/board/interfaces/boardContentInterface/BoardContent";
import BoardUsers from "@/components/users/usersMenu/boardUsers";
import AddRowButton from "@/components/row/addRowButton/addRowButton";

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
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            marginLeft={props.users ? '250px' : '0'}
                            sx={{transition: theme.transitions.create(['margin', 'width'], {
                                    easing: theme.transitions.easing.easeOut,
                                    duration: theme.transitions.duration.enteringScreen,
                                }),}}
                        >
                            <Stack
                                spacing={2}
                                direction={"row"}
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
                            <AddRowButton data={props.data} setData={props.setData}/>
                        </Stack>
                    )}
                </Droppable>
                <BoardUsers setData={props.setData} data={props.data} users={props.users} setUsers={props.setUsers}/>
            </DragDropContext>
        </Box>
    )
}

export default BoardContent