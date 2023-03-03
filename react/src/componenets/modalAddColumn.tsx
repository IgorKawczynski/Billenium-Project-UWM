import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {v4 as uuidv4} from "uuid";
import ModalAddColumnProps from "../interfaces/ModalAddColumn";

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

export default function ModalAddColumn(props:ModalAddColumnProps) {
    const [columnName, setColumnName] = useState("");
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColumnName(event.target.value);
    };

    const handleSubmit = ({event}: { event: any }) => {
        event.preventDefault();
        console.log(name);
        // możesz tutaj przesłać dane do serwera lub zaktualizować stan aplikacji
    };

    function addColumn(name:string) {
        const newColumnId = uuidv4();
        const columns = props.data.columnList;
        const lastColumnId = Object.keys(columns)[Object.keys(columns).length - 1];
        const newColumn = {
            id: newColumnId,
            title: name,
            cardsLimit: 3,
            cards: [],
            position: Object.keys(columns).length - 1,
        };
        const columnsExceptLast = Object.entries(columns)
            .filter(([id, column]) => id !== lastColumnId)
            .reduce((obj, [id, column]) => {
                return { ...obj, [id]: column };
            }, {});
        props.handleDataChange({
            ...props.data,
                columnList: {
                    ...columnsExceptLast,
                    [newColumnId]: newColumn,
                    [lastColumnId]: {...columns[lastColumnId], position: Object.keys(columns).length},
                }});
        props.handleClose();
        setColumnName("")
    }


    return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Add new column
                        </Typography>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                value={columnName}
                                onChange={handleNameChange}
                            />
                        </Typography>
                        <Button
                            onClick={() => addColumn(columnName)}
                            variant="contained"
                        >
                            Add
                        </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
    );
}