import React, {useEffect, useState} from 'react'
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import Stack from "@mui/material/Stack";
import ModalEditBoardProps from "./interface/ModalEditBoard";
import {modalStyle} from "../../../../assets/themes/modalStyle";
import {editBoardToBackend, getBoardTitleFromBackend} from "../../../../services/boardService";

const ModalEditBoard = (props:ModalEditBoardProps) => {
    const [name, setName] = useState(props.title);
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    useEffect(() => {
        // kiedy zadanie zostanie załadowane, ustawiamy jego wartość w stanie
        setName(props.title);
    }, [props.title]);
    const editBoard = (newTitle: string) => {
        editBoardToBackend(props.id, newTitle,)
            .then(res => {
                getBoardTitleFromBackend(props.id)
                    .then( res => {
                            if(res) {
                                props.handleDataChange({
                                    ...props.data,
                                    title:res

                                })
                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            })
            .catch(error => {
                // console.log(error.response.fieldName);
                // obsługa błędów
            });
        props.modalEditClose()
    }

    return(
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.modalEdit}
                onClose={props.modalEditClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.modalEdit}>
                    <Stack sx={modalStyle} spacing={2} direction={'column'}>
                        <Typography color={'textPrimary'} id="transition-modal-title" variant="h6" component="h2">
                            Editing Board: {props.title}
                        </Typography>
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => editBoard(name)}
                            variant="contained"
                        >
                            Edit
                        </Button>
                    </Stack>
                </Fade>
            </Modal>
    )
}

export default ModalEditBoard
