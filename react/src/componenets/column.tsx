import React, {useState} from 'react'
import {Droppable} from 'react-beautiful-dnd';
import Task from "./card";
import ColumnProps from '../interfaces/Column'
import AddCardButton from "./addCardButton";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import CardProps from "../interfaces/Card";
import ModalEditColumn from "./modalEditColumn";
import ModalRemoveColumn from "./modalRemoveColumn";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Column = (props:ColumnProps) => {
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = React.useState(false);
    const modalDeleteOpen = () => setModalDelete(true);
    const modalDeleteClose = () => setModalDelete(false);
    const modalEditOpen = () => setModalEdit(true);
    const modalEditClose = () => setModalEdit(false);

    return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <h2 style={{width:'100%', display:"flex", justifyContent:"space-around"}}>
                <div style={{display:"flex", alignItems:"center"}}>
                    {props.title }
                </div>
                ( {props.cardsLimit} )
                <div>
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
                </div>
            </h2>
            <div style={{margin:8}}>
                {props.position === 0 && <AddCardButton data={props.data} handleDataChange={props.handleDataChange}/>}
                <Droppable droppableId={props.id} key={props.id}>
                    {(provided, snapshot) =>{
                        return(
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    backgroundColor: props.cards && props.cards.length > props.cardsLimit && props.cardsLimit != 0 && props.position != 0 && props.position != Object.keys(props.data.columnList).length-1 ? '#f24e53' : 'white',
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
                                                desc={item.desc}
                                                index={index}
                                                columnId={props.id}
                                                handleDataChange={props.handleDataChange}
                                                data={props.data}
                                            />
                                        )
                                    }
                                )}
                                {provided.placeholder}
                            </div>
                        )}}
                </Droppable>
            </div>
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
                modalDeleteClose={modalDeleteClose}
                modalDelete={modalDelete}
                data={props.data}
                handleDataChange={props.handleDataChange}
            />
        </div>
    )
}


export default Column
