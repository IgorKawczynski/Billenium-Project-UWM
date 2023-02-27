import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {v4 as uuidv4} from "uuid";
import AddCardButtonProps from "../interfaces/AddCardButton";
import AddCardButton from "../interfaces/AddCardButton";
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

export default function AddColumnButton(props:AddCardButtonProps) {
    const [open, setOpen] = React.useState(false);
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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const addCard = (name: string, desc: string) => {
        const newItemId = uuidv4();
        const newItem = { id: newItemId, content: name, desc: desc };
        const firstColumnId = Object.keys(props.columns)[0];
        console.log(Object.keys(props.columns)[0]);
        const updatedItems = [...props.columns[firstColumnId].items, newItem];
        const updatedColumns = { ...props.columns, [firstColumnId]: { ...props.columns[firstColumnId], items: updatedItems } };
        props.setColumns(updatedColumns);
        handleClose();
    };

    return (
        <div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <Button
                    onClick={handleOpen}
                    sx={{width:"100%", maxHeight:"50px"}}
                    variant="outlined"
                >
                    +
                </Button>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
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
        </div>
    );
}