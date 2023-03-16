import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import ModalEditCardProps from "@/interfaces/modalEditcardInterface/ModalEditCard";
import Stack from "@mui/material/Stack";
import {modalStyle} from "@/assets/themes/modalStyle";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {updateCard} from "@/services/utils/cardUtils/cardUtils";
export default function ModalEditCard(props:ModalEditCardProps) {
    const [title, setTitle] = useState(props.title);
    const [desc, setDesc] = useState(props.desc);

    useEffect(() => {
        // kiedy zadanie zostanie załadowane, ustawiamy jego wartość w stanie
        setTitle(props.title);
    }, [props.title]);

    useEffect(() => {
        // kiedy zadanie zostanie załadowane, ustawiamy jego wartość w stanie
        setDesc(props.desc);
    }, [props.desc]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value);
    };

    return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.modalEdit}
                onClose={() => closeModal(props.setModalEdit)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.modalEdit}>
                    <Stack sx={modalStyle} spacing={2}>
                        <Typography color={'textPrimary'} id="transition-modal-title" variant="h6" component="h2">
                            Editing card: {props.title}
                        </Typography>
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    id="outlined-basic"
                                    label="Title"
                                    variant="outlined"
                                    value={title}
                                    onChange={handleNameChange}
                                />
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    id="outlined-basic"
                                    label="Desc"
                                    variant="outlined"
                                    multiline={true}
                                    maxRows={5}
                                    value={desc}
                                    onChange={handleDescChange}
                                />
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => updateCard(props.id,
                                                    title,
                                                    desc,
                                                    props.columnId,
                                                    props.setData,
                                                    props.data,
                                                    props.setModalEdit
                                                    )}
                            variant="contained"
                        >
                            Edit
                        </Button>
                    </Stack>
                </Fade>
            </Modal>
    );
}