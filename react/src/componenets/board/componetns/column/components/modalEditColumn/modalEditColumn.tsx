import React, {useEffect, useState} from 'react'
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import ModalEditColumnProps from "./interface/ModalEditColumn";
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from "@mui/material/Stack";
import {getColumnFromBackend, updateColumnToBackend} from "../../../../../../services/columnService";
import {_Data} from "../../../../../../interfaces/DataBoard";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalEditColumn = (props:ModalEditColumnProps) => {
    const [name, setName] = useState(props.title);
    const [limit, setLimit] = useState(props.cardsLimit);
    const [checkLimit, setCheckLimit] = useState(false);
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setLimit(value);
    };

    const handleCheckLimitChange = () => {
        setCheckLimit((prevState) => !prevState);
    };
    const editColumn = (newTitle: string, limit: number, id:string) => {
        updateColumnToBackend(id, newTitle, limit, checkLimit)
            .then(res => {
                getColumnFromBackend(props.data.id)
                    .then( res => {
                            if(res) {
                                const columns:_Data["data"]['columnList'] = res
                                props.handleDataChange({
                                    ...props.data,
                                    columnList: columns

                                })
                                props.modalEditClose();
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
                    <Stack sx={style} spacing={2} direction={'column'}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Editing column: {props.title}
                        </Typography>
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                                <TextField
                                    disabled={checkLimit}
                                    sx={{margin:'0 0 8px 8px'}}
                                    id="outlined-basic"
                                    label="Limit"
                                    variant="outlined"

                                    type="number"
                                    value={limit}
                                    onChange={handleLimitChange}
                                />
                                <FormControlLabel
                                    label="Unlimited"
                                    control={<Checkbox checked={checkLimit} onChange={handleCheckLimitChange}/>}
                                    labelPlacement="top"

                                />
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => editColumn(name,limit, props.id)}
                            variant="contained"
                        >
                            Edit
                        </Button>
                    </Stack>
                </Fade>
            </Modal>
    )
}

export default ModalEditColumn
