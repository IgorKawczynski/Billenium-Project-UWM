import React, {useState} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import {modalStyle} from "@/assets/themes/modalStyle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {ModalAddBoardProps} from "@/components/userMain/interfaces/modalAddBoard/modalAddBoard";
import {addBoard} from "@/services/utils/UserUtils/userMainUtils";
import {useTranslation} from "react-i18next";


const ModalAddBoard = (props:ModalAddBoardProps) => {
    const [boardName, setBoardName] = useState("");
    const { t } = useTranslation()
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBoardName(event.target.value);
    };



    return (
        <Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.modalAddBoard}
                onClose={() => closeModal(props.setModalAddBoard)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.modalAddBoard}>
                    <Stack sx={modalStyle} spacing={2}>
                        <Typography color={'textPrimary'} id="transition-modal-title" variant="h6" component="h2">
                            {t('addNewBoard')}
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            label={t('name')}
                            variant="outlined"
                            value={boardName}
                            onChange={handleNameChange}
                        />
                        <Box style={{width:'100%'}}>
                            <Button
                                style={{marginTop:'8px', width:'100%'}}
                                onClick={() => addBoard(props.userId, boardName, props.setUserBoards, props.setModalAddBoard, setBoardName)}
                                variant="contained"
                            >
                                {t('add')}
                            </Button>
                        </Box>
                    </Stack>
                </Fade>
            </Modal>
        </Box>
    );

}

export default ModalAddBoard
