import React from 'react';
import Button from '@mui/material/Button';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModalRemoveCardProps from "./interface/ModalRemoveCard";
import Stack from "@mui/material/Stack";
import {modalStyle} from "../../../../../../../../../../assets/themes/modalStyle";
import {
    getColumnById,
    getColumnFromBackend,
    removeColumnToBackend
} from "../../../../../../../../../../services/columnService";
import {_Data} from "../../../../../../../../../../interfaces/DataBoard";
import {removeCardToBackend} from "../../../../../../../../../../services/cardService";

export default function ModalRemoveCard(props:ModalRemoveCardProps) {
    const removeCard = () => {
            removeCardToBackend(props.id)
                .then(res => {
                    getColumnById(props.columnId)
                        .then( res => {
                                if(res) {
                                    props.handleDataChange({
                                        ...props.data,
                                        columnList: {
                                            ...props.data.columnList,
                                            [props.columnId]: res
                                        }

                                    })
                                }
                            }
                        )
                    // tutaj możesz wykonywać operacje na otrzymanym id
                })
        };


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.modalDelete}
            onClose={props.modalDeleteClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={props.modalDelete}>
                <Stack sx={modalStyle} spacing={3}>
                    <Grid>
                    <Typography color={'textPrimary'} id="transition-modal-title" variant="body1" component="h2" sx={{textAlign:"center"}}>
                        Are you sure you want to delete card: {props.title}?
                    </Typography>
                    </Grid>
                    <Grid style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => props.modalDeleteClose()}
                            variant="contained"
                        >
                            Close
                        </Button>
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => removeCard()}
                            variant="contained"
                        >
                            Delete
                        </Button>
                    </Grid>
                </Stack>
            </Fade>
        </Modal>
    );
}