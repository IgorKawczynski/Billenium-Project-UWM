import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import ModalEditCardProps from "./interface/ModalEditCard";
import Stack from "@mui/material/Stack";
import {updateCardToBackend} from "../../../../../../../../../../services/cardService";
import {getColumnFromBackend} from "../../../../../../../../../../services/columnService";
import {_Data} from "../../../../../../../../../../interfaces/DataBoard";
import {modalStyle} from "../../../../../../../../../../assets/themes/modalStyle";

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
    const handleSubmit = ({event}: { event: any }) => {
        event.preventDefault();
        // możesz tutaj przesłać dane do serwera lub zaktualizować stan aplikacji
    };

    const updateCard = (title: string, desc: string) => {
        updateCardToBackend(props.id, title, desc)
            .then(res => {
                if(res == Array){
                    alert(res[0] + res[1])
                }
                getColumnFromBackend(props.data.id)
                    .then( res => {
                            if(res) {
                                const columns:_Data["data"]['columnList'] = res
                                props.handleDataChange({
                                    ...props.data,
                                    columnList: columns

                                })
                                props.modalEditClose();
                                setTitle("")
                                setDesc("")
                            }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            })
            .catch(error => {
                // console.log(error.response.fieldName);
                // obsługa błędów
            });
    };

    return (
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
                            onClick={() => updateCard(title,desc)}
                            variant="contained"
                        >
                            Edit
                        </Button>
                    </Stack>
                </Fade>
            </Modal>
    );
}