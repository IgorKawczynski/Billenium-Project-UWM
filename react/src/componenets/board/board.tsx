import React, {useEffect, useState} from 'react'
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import Column from './componetns/column/column'
import Typography from "@mui/material/Typography";
import AddColumnButton from "./componetns/column/components/addColumnButton/addColumnButton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {_Data} from "../../interfaces/DataBoard";
import {loadBoardFromBackend, loadDefaultData} from "../../services/boardService";
import {Grid, useTheme} from "@mui/material";
import Button from "@mui/material/Button";
import {ColorModeContext} from "../../App";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {moveColumnToBackend} from "../../services/boardService";
import {getColumnFromBackend, removeColumnToBackend} from "../../services/columnService";
import {moveCardToAnotherColumn, moveCardInColumn} from "../../services/cardService";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import {editBoardToBackend} from "../../services/boardService";
const onDragEnd = (result: any, columns:any, setData:any, data:any) => {
    if (!result.destination) return
    const {source, destination} = result;
    if(result.type == 'column') {
        moveColumnToBackend(result.draggableId, destination.index)
            .then(res => {
                getColumnFromBackend(data.id)
                    .then(res => {
                        if (res) {
                            const columns: _Data["data"]['columnList'] = res
                            setData({
                                ...data,
                                columnList: columns

                            })
                        }
                    })
            })
    }
    if(result.type == 'task') {
        if (source.droppableId !== destination.droppableId){
            moveCardToAnotherColumn(result.draggableId, destination.droppableId, destination.index)
                .then(res => {
                    getColumnFromBackend(data.id)
                        .then(res => {
                            if (res) {
                                const columns: _Data["data"]['columnList'] = res
                                setData({
                                    ...data,
                                    columnList: columns

                                })
                            }
                        })
                })
            }else{
            moveCardInColumn(result.draggableId, destination.index)
                .then(res => {
                    getColumnFromBackend(data.id)
                        .then(res => {
                            if (res) {
                                const columns: _Data["data"]['columnList'] = res
                                setData({
                                    ...data,
                                    columnList: columns

                                })
                            }
                        })
                })
        }
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

    const editBoard = (id:string, newTitle:string) =>{
            editBoardToBackend(id, newTitle)
                .then(res => {
                    loadBoardFromBackend(data.id)
                        .then( data => {
                            if(data) {
                                setData(data)
                            }})
                })
        };

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
            <Typography variant={'h3'} color={'textPrimary'} style={{textAlign:"center"}}>
                {data.title}<IconButton
                aria-label="settingsColumn"
            >
                <SettingsIcon />
            </IconButton></Typography>
            <AddColumnButton
                data={data}
                handleDataChange={setData}
            />
            <Grid container spacing={{xs: 2, md:3}} columns={{ xs: 4, sm: 8, md: 12 }}>
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
            </Grid>
            <Button sx={{position:'absolute', bottom:'0', left:'0'}} onClick={colorMode.toggleColorMode}>
                {theme.palette.mode == 'light' && (<Typography sx={{display:'flex', justifyContent:'center', alignItems:"center" }}>Dark Mode <Brightness4Icon/></Typography>)}
                {!(theme.palette.mode == 'light') && (<Typography sx={{display:'flex', justifyContent:'center', alignItems:"center" }}>Light Mode <Brightness4Icon/></Typography>)}
            </Button>
            <Grid sx={{position:'absolute', bottom:'0', right:'0', textAlign:'center'}} >
            <Typography color={theme.palette.background.default} variant={'h4'} >Kanban Table</Typography>
            <Typography color={theme.palette.background.default} variant={'h5'} >by MAGI</Typography>
            </Grid>
        </Stack>
    );
}

export default Board