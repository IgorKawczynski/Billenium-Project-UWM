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
import {addColumnToBackend, getColumnFromBackend} from "../../../../../../../../../../services/columnService";
import {_Data} from "../../../../../../../../../../interfaces/DataBoard";
import {addCardToBackend} from "../../../../../../../../../../services/cardService";
import {modalStyle} from "../../../../../../../../../../assets/themes/modalStyle";

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
        addCardToBackend(props.columnId, name, desc)
            .then(res => {
                getColumnFromBackend(props.data.id)
                    .then( res => {
                            if(res) {
                                const columns:_Data["data"]['columnList'] = res
                                props.handleDataChange({
                                    ...props.data,
                                    columnList: columns

                                })
                                props.handleClose();
                                setName("")
                                setDesc("")
                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            })
            .catch(error => {
                console.error(error);
                // obsługa błędów
            });
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
                    <Box sx={modalStyle}>
                        <Typography color={'textPrimary'} id="transition-modal-title" variant="h6" component="h2">
                            Add card
                        </Typography>
                        <Box style={{display:"flex",flexDirection:'column', justifyContent:"space-between"}}>
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
                            <Button
                                onClick={() => addCard(name,desc)}
                                variant="contained"
                            >
                                Dodaj
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
    );
}