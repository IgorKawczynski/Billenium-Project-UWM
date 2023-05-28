import React from "react";
import Modal from "@mui/material/Modal";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import {modalStyle} from "@/assets/themes/modalStyle";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ModalRemoveRowProps from "@/components/row/interfaces/modalRemoveRowInterface/modalRemoveRow";
import {removeRow} from "@/services/utils/rowUtils/rowUtils";
import {useTranslation} from "react-i18next";

const ModalRemoveRow = (props:ModalRemoveRowProps) =>{
    const { t } = useTranslation();
    return(
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
                    <Grid style={{display:"flex",
                        textAlign:'center',
                        justifyContent:"center"
                    }}
                    >
                        <Typography color={'textPrimary'} variant={'body1'}>
                            {t('deleteRowMessage')}: {props.title}?
                        </Typography>
                    </Grid>
                    <Grid style={{ display:"flex",
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
                            onClick={() => removeRow(
                                props.id,
                                props.title,
                                props.data,
                                props.setData,
                                props.setModalDelete
                            )}
                            variant="contained"
                        >
                            {t('delete')}
                        </Button>
                    </Grid>
                </Stack>
            </Fade>
        </Modal>
    )
}

export default ModalRemoveRow
