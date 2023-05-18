import React, {useState} from "react";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {onDragEnd} from "@/services/utils/boardUtils/boardUtils";
import {Box, Stack, useTheme} from "@mui/material";
import Column from "@/components/column/column";
import {boardContentProps} from "@/components/board/interfaces/boardContentInterface/BoardContent";
import BoardUsersMenu from "@/components/board/boardUsersMenu/boardUsersMenu";
import AddRowButton from "@/components/row/addRowButton/addRowButton";

const BoardContent = (props:boardContentProps) =>{
    const theme = useTheme();
    const [isOver, setIsOver] = useState(false);
    const [over, setOver] = useState('');
    const handleOnMouseOver = (parentId:string) => {
        if(!isOver){
            setOver(parentId)
            setIsOver(true)
        }else{
            handleOnMouseLeave()
        }
    }
    const handleOnMouseLeave = () => {
        setOver('')
        setIsOver(false)
    }
    return(
        <DragDropContext
            onDragEnd={(result) =>
                onDragEnd(result, props.data.columnList, props.setData, props.data)
            }
        >
            <Box
                sx={{overflowX:'auto',
                }}
            >
                <Box
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
                                                over={over}
                                                handleOnMouseOver={handleOnMouseOver}
                                                handleOnMouseLeave={handleOnMouseLeave}
                                            />
                                        ))}
                                    {provided.placeholder}
                                </Stack>
                                <AddRowButton data={props.data} setData={props.setData}/>
                            </Stack>
                        )}
                    </Droppable>
                </Box>
            </Box>
            <BoardUsersMenu setData={props.setData} data={props.data} users={props.users} setUsers={props.setUsers}/>
        </DragDropContext>
    )
}

export default BoardContent