import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {v4 as uuidv4} from "uuid";
import ModalAddCardProps from "./interface/ModalAddCard";
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

export default function ModalAddCard(props:ModalAddCardProps) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value);
    };
    const handleSubmit = ({event}: { event: any }) => {
        event.preventDefault();
        // możesz tutaj przesłać dane do serwera lub zaktualizować stan aplikacji
    };
    const addCard = (name: string, desc: string) => {
        const newItemId = uuidv4();
        const newItem = { id: newItemId, title: name, description: desc };
        const firstColumnId = Object.keys(props.data.columnList)[0];
        const updatedItems = [...props.data.columnList[firstColumnId].cards, newItem];
        const updatedColumns = { ...props.data.columnList, [firstColumnId]: { ...props.data.columnList[firstColumnId], cards: updatedItems } };
        props.handleDataChange({
            ...props.data,
            columnList: updatedColumns
        });
        props.handleClose();
    };

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
                                    multiline
                                    id="outlined-basic"
                                    label="Description"
                                    variant="outlined"
                                    value={desc}
                                    maxRows={5}
                                    onChange={handleDescChange}
                                />
                            </Typography>
                            <Button
                                onClick={() => addCard(name,desc)}
                                variant="contained"
                            >
                                Dodaj
                            </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
    );
}