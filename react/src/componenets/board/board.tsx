import React, {useEffect, useState} from 'react'
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import Column from './componetns/column/column'
import Typography from "@mui/material/Typography";
import AddColumnButton from "./componetns/column/components/addColumnButton/addColumnButton";
import Stack from "@mui/material/Stack";
import {_Data} from "../../interfaces/DataBoard";
import {loadBoardFromBackend, loadDefaultData} from "../../services/boardService";
import {Grid, useTheme} from "@mui/material";
import Button from "@mui/material/Button";
import {ColorModeContext} from "../../App";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {moveColumnToBackend} from "../../services/boardService";
import {getColumnById, getColumnFromBackend, removeColumnToBackend} from "../../services/columnService";
import {moveCardToAnotherColumn, moveCardInColumn} from "../../services/cardService";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import {editBoardToBackend} from "../../services/boardService";
import DataFromBackend from "../../interfaces/DataFromBackend";
import '../../assets/styles/board.css'
import ModalEditBoard from "./componetns/modalEditTitle/modalEditBoard";

function withPositionInRange(lowerBound: number, upperBound: number, columns:_Data["data"]['columnList']){
    const x = Object.values(columns).filter((column) => {
        return column.position >= lowerBound && column.position <= upperBound;
    });
    return x;
}

function changePositionToRight(columns:DataFromBackend['columnList']){
    return Object.values(columns).map((column) => {
        column.position = column.position + 1
    });
}
function changePositionToLeft(columns:DataFromBackend['columnList']){
    return Object.values(columns).map((column) => {
        column.position = column.position - 1
    });
}

const onDragEnd = (result: any, columns:_Data["data"]['columnList'], setData:_Data["setData"], data:_Data["data"]) => {
    if (!result.destination) return
    const {source, destination} = result;
    if(result.type === 'column') {
        if(destination.index < columns[result.draggableId].position){
            const columnsToChange = withPositionInRange(destination.index, source.index, columns);
            console.log(columnsToChange)
            const changedColumns = changePositionToRight(columnsToChange)
        }if(destination.index > columns[result.draggableId].position){
            const columnsToChange = withPositionInRange(source.index, destination.index, columns);
            const changedColumns = changePositionToLeft(columnsToChange)
        }
        columns[result.draggableId].position = destination.index
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
    if(result.type === 'task') {
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
            moveCardToAnotherColumn(result.draggableId, destination.droppableId, destination.index)
                .then(res => {
                    getColumnFromBackend(data.id)
                        .then(res => {
                            if (res) {
                                setData({
                                    ...data,
                                    columnList: {
                                        ...res,
                                        [source.droppableId]: {
                                            ...res[source.droppableId],
                                            cards: res[source.droppableId].cards
                                        },
                                        [destination.droppableId]:{
                                            ...res[destination.droppableId],
                                            cards: res[destination.droppableId].cards
                                        }
                                    }

                                })
                            }
                        })
                })
            }else{
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
                }})

            moveCardInColumn(result.draggableId, destination.index)
                .then(res => {
                    getColumnById(result.draggableId)
                        .then(res => {
                            if (res) {
                                setData({
                                    ...data,
                                    columnList: {
                                        ...columns,
                                        [res.id]: {
                                            ...column,
                                            cards: copiedItems
                                        }
                                    }})
                            }
                        })
                })
        }
    }
    }

const Board = () => {
    const [data, setData] = useState<_Data['data']> (loadDefaultData);
    const [modalEdit, setModalEdit] = React.useState(false);
    const modalEditOpen = () => setModalEdit(true);
    const modalEditClose = () => setModalEdit(false);
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const bodyStyle = { backgroundColor: theme.palette.background.default };
    useEffect(() => {
        document.body.style.backgroundImage = 'none';
        document.body.style.overflow = 'scroll';
        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.overflow = '';// Resetuj styl tła body przy usuwaniu komponentu
        };
    }, []);

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
            <Grid sx={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                <Grid sx={{width:'200px'}}>

                </Grid>
                <Grid>
            <Typography variant={'h3'} color={'textPrimary'} style={{textAlign:"center"}}>
                {data.title}
                <IconButton
                aria-label="settingsColumn"
                onClick={modalEditOpen}
            >
                <SettingsIcon />
            </IconButton></Typography>
            <AddColumnButton
                data={data}
                handleDataChange={setData}
            />
                </Grid>
                <Grid>
                <Button onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode == 'light' && (<Typography sx={{display:'flex', justifyContent:'center', alignItems:"center" }}>Dark Mode <Brightness4Icon/></Typography>)}
                    {!(theme.palette.mode == 'light') && (<Typography sx={{display:'flex', justifyContent:'center', alignItems:"center" }}>Light Mode <Brightness4Icon/></Typography>)}
                </Button>
                <Grid sx={{textAlign:'center'}}>
                    <Typography color={'textPrimary'} variant={'h4'} >Kanban Table</Typography>
                    <Typography color={theme.palette.primary.main} variant={'h5'} >by MAGI</Typography>
                </Grid>
            </Grid>
            </Grid>
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
            <ModalEditBoard id={data.id} title={data.title} modalEdit={modalEdit} modalEditClose={modalEditClose} data={data} handleDataChange={setData}/>
        </Stack>
    );
}

export default Board