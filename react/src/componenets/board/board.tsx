import React, {useEffect, useState} from 'react'
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import Column from './componetns/column/column'
import Typography from "@mui/material/Typography";
import AddColumnButton from "./componetns/column/components/addColumnButton/addColumnButton";
import Stack from "@mui/material/Stack";
import {_Data} from "../../interfaces/DataBoard";
import {loadBoardFromBackend, loadDefaultData} from "../../../../../../Inżynierka/Do prezentacji/core1/src/services/boardService";
import {Grid, useTheme} from "@mui/material";
import Button from "@mui/material/Button";
import {ColorModeContext} from "../../App";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {moveColumnToBackend} from "../../../../../../Inżynierka/Do prezentacji/core1/src/services/boardService";
import {getColumnById, getColumnFromBackend, removeColumnToBackend} from "../../services/columnService";
import {moveCardToAnotherColumn, moveCardInColumn} from "../../services/cardService";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import {editBoardToBackend} from "../../../../../../Inżynierka/Do prezentacji/core1/src/services/boardService";
import DataFromBackend from "../../interfaces/DataFromBackend";
import '../../assets/styles/board.css'
import ModalEditBoard from "./componetns/modalEditTitle/modalEditBoard";
import {onDragEnd, usersData} from "../../../../../../Inżynierka/Do prezentacji/core1/src/services/boardService";
const Board = () => {
    const [data, setData] = useState<_Data['data']> (loadDefaultData);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [isFirst, setIsFirst] = useState(true)
    const modalEditOpen = () => setModalEdit(true);
    const modalEditClose = () => setModalEdit(false);
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const bodyStyle = { backgroundColor: theme.palette.background.default };
    useEffect(() =>{
        document.body.style.backgroundImage = 'none';
        document.body.style.overflowY = 'scroll';
        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.overflowY = '';
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
                    <Typography color={'textPrimary'} variant={'h4'} >Kanban Board</Typography>
                    <Typography color={theme.palette.primary.main} variant={'h5'} >by MAGI</Typography>
                </Grid>
            </Grid>
            </Grid>
            <Grid container spacing={{xs: 2, md:3}} columns={{ xs: 4, sm: 8, md: 12 }} sx={{overflowX:'scroll'}}>
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
                            <Grid>
                                <Grid sx={{display:"flex", flexDirection:'column'}}>
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
                                                            isFirst={isFirst}
                                                        />
                                                    ))}
                                                {provided.placeholder}

                                            </Stack>
                                        </Grid>
                            </Grid>
                        )}
                    </Droppable>
                </DragDropContext>
            </Grid>
            <ModalEditBoard id={data.id} title={data.title} modalEdit={modalEdit} modalEditClose={modalEditClose} data={data} handleDataChange={setData}/>
        </Stack>
    );
}

export default Board