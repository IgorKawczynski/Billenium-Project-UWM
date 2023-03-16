import React from 'react';
import Button from '@mui/material/Button';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModalRemoveCardProps from "@/interfaces/modalRemoveCardInterface/ModalRemoveCard";
import Stack from "@mui/material/Stack";
import {modalStyle} from "@/assets/themes/modalStyle";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {removeCard} from "@/services/utils/cardUtils/cardUtils";
export default function ModalRemoveCard(props:ModalRemoveCardProps) {


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.modalDelete}
            onClose={() => closeModal(props.setModalDelete)}
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
                    <Typography
                        color={'textPrimary'}
                        id="transition-modal-title"
                        variant="body1"
                        component="h2"
                        sx={{textAlign:"center"}}
                    >
                        Are you sure you want to delete card: {props.title}?
                    </Typography>
                    </Grid>
                    <Grid style={{display:"flex",
                        justifyContent:"space-between",
                        width:"100%"}}
                    >
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => closeModal(props.setModalDelete)}
                            variant="contained"
                        >
                            Close
                        </Button>
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => removeCard(props.id,
                                                    props.columnId,
                                                    props.setData,
                                                    props.data
                                                )}
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