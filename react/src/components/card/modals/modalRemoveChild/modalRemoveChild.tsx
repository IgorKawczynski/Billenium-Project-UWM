import React from 'react';
import Button from '@mui/material/Button';
import Fade from "@mui/material/Fade";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import {modalStyle} from "@/assets/themes/modalStyle";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import ModalRemoveChildProps from "@/components/card/interfaces/modalRemoveChild/ModalRemoveChild";
import {removeChild} from "@/services/utils/cardUtils/cardUtils";
import {useTranslation} from "react-i18next";

export default function ModalRemoveChild(props:ModalRemoveChildProps) {
    const { t } = useTranslation();
    const handleClose = () => {
        props.setAnchorEl(null);
        closeModal(props.setModalDelete)
    }

    return (
        <Modal
            open={props.modalDelete}
            onClose={handleClose}
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
                        {t('deleteChildMessage')}: {props.childTitle}?
                    </Typography>
                    </Grid>
                    <Grid style={{display:"flex",
                        justifyContent:"space-between",
                        width:"100%"}}
                    >
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={handleClose}
                            variant="outlined"
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => removeChild(props.id,
                                                    props.childId,
                                                    props.childTitle,
                                                    props.data,
                                                    props.setData
                                                )}
                            variant="contained"
                        >
                            {t('delete')}
                        </Button>
                    </Grid>
                </Stack>
            </Fade>
        </Modal>
    );
}