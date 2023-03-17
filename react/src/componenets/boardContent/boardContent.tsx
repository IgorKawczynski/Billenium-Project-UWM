import React from "react";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {onDragEnd} from "@/services/utils/boardUtils/boardUtils";
import {Box, Stack} from "@mui/material";
import Column from "@/componenets/column/column";
import {boardContentProps} from "@/interfaces/boardContentInterface/BoardContent";


const BoardContent = (props:boardContentProps) =>{


    return(
        <Box sx={{overflowX:'auto'}}>
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
                                        cards={column.cards}
                                        data={props.data}
                                        setData={props.setData}
                                        isDragging={snapshot.isDraggingOver}
                                    />
                                ))}
                            {provided.placeholder}

                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    )
}

export default BoardContent