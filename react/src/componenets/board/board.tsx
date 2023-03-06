import React, {useEffect, useState} from 'react'
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import Column from './componetns/column/column'
import Typography from "@mui/material/Typography";
import AddColumnButton from "./componetns/column/components/addColumnButton/addColumnButton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {_Data} from "../../interfaces/DataBoard";
import {loadBoardFromBackend, loadDefaultData} from "../../services/boardService";
import {useTheme} from "@mui/material";
import Button from "@mui/material/Button";
import {ColorModeContext} from "../../App";
import Brightness4Icon from "@mui/icons-material/Brightness4";
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
        const copiedItems = [...column.cards];
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
const Board = () => {
    const [data, setData] = useState<_Data['data']> (loadDefaultData);
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const bodyStyle = { backgroundColor: theme.palette.background.default };

    React.useEffect(() => {
        // Pobieranie elementu body i ustawienie stylu tła
        document.body.style.backgroundColor = theme.palette.background.default;
    }, [theme]);
    async function fetchData() {
        const result = await loadBoardFromBackend("1001");
        if (result) {
            try {
                setData(result);
            }
            catch{
                setData(loadDefaultData())
            }
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };


    return (
        <Stack spacing={2} display={"flex"} alignItems={"center"}>
            <Typography variant={'h3'} color={'textPrimary'} style={{textAlign:"center"}}>{data.title}</Typography>
            <AddColumnButton
                data={data}
                handleDataChange={setData}
            />
            <Box sx={{display:'flex', width:'100%', justifyContent:'space-around', overflow:'visible'}}>
                <DragDropContext
                    onDragEnd={(result) =>
                        onDragEnd(result, data.columnList, setData, data)
                    }
                >
                    <Droppable
                        droppableId={data.id}
                        direction="horizontal"
                        type="column">
                        {(provided, snapshot) => (
                            <Stack
                                spacing={2}
                                direction={"row"}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {Object.values(data.columnList)
                                    .sort((a, b) => a.position - b.position) // sortowanie po pozycji
                                    .map((column) => (
                                        <Column
                                            key={column.id}
                                            id={column.id}
                                            title={column.title}
                                            cardsLimit={column.cardsLimit}
                                            position={column.position}
                                            cards={column.cards}
                                            data={data}
                                            handleDataChange={setData}
                                            isDragging={snapshot.isDraggingOver}
                                        />
                                    ))}
                                {provided.placeholder}

                            </Stack>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
            <Button sx={{position:'absolute', bottom:'0', left:'0'}} onClick={colorMode.toggleColorMode}>
                {theme.palette.mode == 'light' && (<Typography sx={{display:'flex', justifyContent:'center', alignItems:"center" }}>Dark Mode <Brightness4Icon/></Typography>)}
                {!(theme.palette.mode == 'light') && (<Typography sx={{display:'flex', justifyContent:'center', alignItems:"center" }}>Light Mode <Brightness4Icon/></Typography>)}
            </Button>
        </Stack>
    );
}

export default Board