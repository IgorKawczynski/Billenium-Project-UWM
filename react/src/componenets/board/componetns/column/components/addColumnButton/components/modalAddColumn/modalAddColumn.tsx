import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import {Grid} from "@mui/material";
import ModalAddColumnProps from "./interface/ModalAddColumn";
import {addColumnToBackend, getColumnFromBackend} from "../../../../../../../../services/columnService";
import {_Data} from "../../../../../../../../interfaces/DataBoard";
import {modalStyle} from '../../../../../../../../assets/themes/modalStyle'

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
        addColumnToBackend(props.data.id, name)
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
                            setColumnName("")
                        }
                        }
                    )
                // tutaj możesz wykonywać operacje na otrzymanym id
            })
            .catch(error => {
                console.error(error);
                // obsługa błędów
            });
    }


    return (
        <Grid>
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
                    <Stack sx={modalStyle} spacing={2}>
                        <Typography color={'textPrimary'} id="transition-modal-title" variant="h6" component="h2">
                            Add new column
                        </Typography>
                        <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                value={columnName}
                                onChange={handleNameChange}
                        />
                        <Box style={{width:'100%'}}>
                        <Button
                            style={{marginTop:'8px', width:'100%'}}
                            onClick={() => addColumn(columnName)}
                            variant="contained"
                        >
                            Add
                        </Button>
                        </Box>
                    </Stack>
                </Fade>
            </Modal>
        </Grid>
    );
}