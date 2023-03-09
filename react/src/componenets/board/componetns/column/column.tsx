import React, {useState} from 'react'
import {Droppable, Draggable} from 'react-beautiful-dnd';
import Task from "./components/card/card";
import ColumnProps from './interface/Column'
import AddCardButton from "./components/card/componetnts/addCardButton/addCardButton";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import ModalEditColumn from "./components/modalEditColumn/modalEditColumn";
import ModalRemoveColumn from "./components/modalRemoveColumn/modalRemoveColumn";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

const Column = (props:ColumnProps) => {
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = React.useState(false);
    const modalDeleteOpen = () => setModalDelete(true);
    const modalDeleteClose = () => setModalDelete(false);
    const modalEditOpen = () => setModalEdit(true);
    const modalEditClose = () => setModalEdit(false);

    return(
        <Grid style={{display:'flex', flexDirection:'column', alignItems:'center', background: props.cards.length > props.cardsLimit
            && props.cardsLimit != 0
            && props.position != 0 && props.position != Object.keys(props.data.columnList).length-1 ? 'rgba(253,0,8,0.35)' : 'transparent'}}
        >
            <Draggable draggableId={props.id} index={props.position}>
                {provided => (
                    <Grid
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                <Grid style={{width:'100%', display:"flex", justifyContent:"space-around"}}>
                <Grid
                    {...provided.dragHandleProps}
                    style={{display:"flex", alignItems:"center"}}>
                    <Typography color={'textPrimary'} variant={'h5'}>
                        {props.title}
                    </Typography>
                    { props.cardsLimit != 0 &&
                        (<Typography color={'textSecondary'} sx={{
                            marginLeft:'8px',
                            height:'80%',
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'end'}}
                                     variant={'caption'}> <Box></Box>
                            Limit: {props.cardsLimit}
                        </Typography>)}
                </Grid>
                <Grid>
                <IconButton
                    aria-label="settingsColumn"
                    onClick={() => modalEditOpen()}
                >
                    <SettingsIcon />
                </IconButton>
                {props.position !== 0 && props.position !== Object.keys(props.data.columnList).length-1 && (
                    <IconButton
                        aria-label="delete"
                        onClick={() => modalDeleteOpen()}
                    >
                        <DeleteIcon />
                    </IconButton>

                )}
                </Grid>
            </Grid>
            <Grid style={{margin:8}}>
                <AddCardButton columnId={props.id} data={props.data} handleDataChange={props.handleDataChange}/>
                <Droppable droppableId={props.id} type="task">
                    {(provided, snapshot) =>{
                        return(
                            <Box
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    backgroundColor:
                                        props.cards
                                        && props.cards.length > props.cardsLimit
                                        && props.cardsLimit != 0
                                        && props.position != 0
                                        && props.isDragging ? 'rgba(154,154,154,0.11)': 'transparent',
                                    padding: 4,
                                    width: 250,
                                    minHeight:150
                                }}
                            >
                                { props.cards && props.cards.map((item:any, index:number) => {
                                        return (
                                            <Task
                                                key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                desc={item.description}
                                                index={index}
                                                columnId={props.id}
                                                handleDataChange={props.handleDataChange}
                                                data={props.data}
                                            />
                                        )
                                    }
                                )}
                                {provided.placeholder}
                            </Box>
                        )}}
                </Droppable>
            </Grid>
        </Grid>
      )}
            </Draggable>
            <ModalEditColumn
                id={props.id}
                title={props.title}
                cardsLimit={props.cardsLimit}
                position={props.position}
                modalEdit={modalEdit}
                modalEditClose={modalEditClose}
                data={props.data}
                handleDataChange={props.handleDataChange}
            />

            <ModalRemoveColumn
                id={props.id}
                title={props.title}
                modalDeleteClose={modalDeleteClose}
                modalDelete={modalDelete}
                data={props.data}
                handleDataChange={props.handleDataChange}
            />
        </Grid>
    )
}


export default Column
