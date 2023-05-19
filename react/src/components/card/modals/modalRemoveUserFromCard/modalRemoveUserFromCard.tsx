import React from 'react';
import Button from '@mui/material/Button';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import {modalStyle} from "@/assets/themes/modalStyle";
import {
    ModalRemoveUserFromCardProps
} from "@/components/card/interfaces/modalRemoveUserFromCard/modalRemoveUserFromCard";
import {removeUserFromCard} from "@/services/utils/cardUtils/cardUtils";
import {useTranslation} from "react-i18next";

const ModalRemoveUserFromCard = (props:ModalRemoveUserFromCardProps) => {
    const handleClose = () => {
        props.setAnchorEl(null);
    };
    const { t } = useTranslation();

    return (
        <Modal
            style={{zIndex:'13'}}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.modalDelete}
            onClose={handleClose}
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
                        {t('deleteUserMessage')} {props.userName} {props.userLastName} {t('fromCard')} {props.cardTitle} ?
                    </Typography>
                    </Grid>
                    <Grid style={{display:"flex",
                        justifyContent:"space-between",
                        width:"100%"}}
                    >
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => handleClose()}
                            variant="contained"
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            sx={{maxHeight:'50px'}}
                            variant="contained"
                            onClick={() => removeUserFromCard(
                                props.cardId,
                                props.userId,
                                props.userName,
                                props.userLastName,
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
    );
}
export default ModalRemoveUserFromCard
