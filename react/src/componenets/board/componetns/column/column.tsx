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

const Column = (props:ColumnProps) => {
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = React.useState(false);
    const modalDeleteOpen = () => setModalDelete(true);
    const modalDeleteClose = () => setModalDelete(false);
    const modalEditOpen = () => setModalEdit(true);
    const modalEditClose = () => setModalEdit(false);

    return(
        <Box style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Draggable draggableId={props.id} index={props.position}>
                {provided => (
                    <Box
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                <h2 style={{width:'100%', display:"flex", justifyContent:"space-around"}}>
                <Box
                    {...provided.dragHandleProps}
                    style={{display:"flex", alignItems:"center"}}>
                    {props.title }
                </Box>
                ( {props.cardsLimit} )
                <Box>
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
                </Box>
            </h2>
            <Box style={{margin:8}}>
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
                                        && props.position != Object.keys(props.data.columnList).length-1 ? '#f24e53' : 'transparent'
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
            </Box>
        </Box>
      )}
            </Draggable>
            <ModalEditColumn
                id={props.id}
                title={props.title}
                cardsLimit={props.cardsLimit}
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
        </Box>
    )
}


export default Column
