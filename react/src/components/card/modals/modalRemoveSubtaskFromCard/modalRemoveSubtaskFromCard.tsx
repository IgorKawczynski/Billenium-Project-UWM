import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import {modalStyle} from "@/assets/themes/modalStyle";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {removeSubtask} from "@/services/utils/cardUtils/subtaskUtils";
import {
    ModalRemoveSubtaskFromCardProps
} from "@/components/card/interfaces/modalRemoveSubtaskFromCard/modalRemoveSubtaskFromCard";
import {useTranslation} from "react-i18next";


const ModalRemoveSubtaskFromCard = (props:ModalRemoveSubtaskFromCardProps) =>{
    const { t } = useTranslation();
    return (
        <Modal
            style={{zIndex:'13'}}
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
                            {t('DeleteSubtask')} {props.title} {t('fromCard')} {props.cardTitle} ?
                        </Typography>
                    </Grid>
                    <Grid style={{display:"flex",
                        justifyContent:"space-between",
                        width:"100%"}}
                    >
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => closeModal(props.setModalDelete)}
                            variant="outlined"
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            sx={{maxHeight:'50px'}}
                            variant="contained"
                            onClick={() => removeSubtask(
                                props.id,
                                props.cardTitle,
                                props.data,
                                props.setData
                            )}
                        >
                            {t('delete')}
                        </Button>
                    </Grid>
                </Stack>
            </Fade>
        </Modal>
    )
}

export default ModalRemoveSubtaskFromCard
