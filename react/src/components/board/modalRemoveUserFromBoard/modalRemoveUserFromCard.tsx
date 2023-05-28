import React, {SetStateAction} from 'react';
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
import {unassignUserFromBoard} from "@/services/utils/boardUtils/boardUtils";
import {_Data} from "@/services/utils/boardUtils/DataBoard";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";

interface ModalRemove{
    userId:string,
    firstName:string,
    lastName:string,
    data:_Data["data"]
    setData:_Data["setData"]
    modalDelete:boolean
    setModalDelete:React.Dispatch<SetStateAction<boolean>>
}

const ModalRemoveUserFromBoard = (props:ModalRemove) => {
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
                        {t('deleteUserFromBoardMessage')} {props.firstName} {props.lastName} {t('fromBoard')} ?
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
                            onClick={() => unassignUserFromBoard(
                                props.data.id,
                                props.userId,
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
export default ModalRemoveUserFromBoard
