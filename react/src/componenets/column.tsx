import React, {useState} from 'react'
import {Droppable} from 'react-beautiful-dnd';
import Task from "./card";
import ColumnProps from '../interfaces/Column'
import AddCardButton from "./addCardButton";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardProps from "../interfaces/Card";

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
    const [name, setName] = useState(props.title);
    const [limit, setLimit] = useState(props.cardsLimit);
    const [modal, setModal] = useState(false);
    const [modalDelete, setModalDelete] = React.useState(false);
    const modalDeleteOpen = () => setModalDelete(true);
    const modalDeleteClose = () => setModalDelete(false);
    const modalOpen = () => setModal(true);
    const modalClose = () => setModal(false);
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setLimit(value);
    };
    const removeColumn = (id:string) => {
        // utwórz nową tablicę bez usuwanej kolumny
        const newColumns = { ...props.data.columnList };
        delete newColumns[id];
        const lastColumnId = Object.keys(newColumns)[Object.keys(newColumns).length - 1];
        Object.values(newColumns).forEach((column:any, index) => {
            if (column.position > index) {
                column.position = index;
            }
        });
        // przypisz nową tablicę do state'u
        props.handleDataChange({
            ...props.data,
            columnList: {
                ...newColumns,
                [lastColumnId]: { ...newColumns[lastColumnId], position: Object.keys(newColumns).length - 1 },
            },
        })

    };
    const editColumn = (newTitle: string, limit: number, id:string) => {
        const newColumns = { ...props.data.columnList };
        newColumns[id] = { ...newColumns[id], title: newTitle, cardsLimit:limit };
        props.handleDataChange({
            ...props.data,
            columnList: {
                ...newColumns
            },
        });
        modalClose()
    }

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
                    onClick={() => modalOpen()}
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
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modal}
                onClose={modalClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modal}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Set column name
                        </Typography>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    id="outlined-basic"
                                    label="Limit"
                                    variant="outlined"
                                    type="number"
                                    value={limit}
                                    onChange={handleLimitChange}
                                />
                            </Typography>
                        </div>
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => editColumn(name,limit, props.id)}
                            variant="contained"
                        >
                            Edit
                        </Button>
                    </Box>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalDelete}
                onClose={modalDeleteClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modalDelete}>
                    <Box sx={style}>
                        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                            <div style={{textAlign:"center", fontSize:"24px"}}>
                                Are you sure?
                            </div>
                            <div style={{ display:"flex", justifyContent:"space-between", width:"100%"}}>
                                <Button
                                    sx={{maxHeight:'50px'}}
                                    onClick={() => modalDeleteClose()}
                                    variant="contained"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    sx={{maxHeight:'50px'}}
                                    onClick={() => removeColumn(props.id)}
                                    variant="contained"
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default Column
