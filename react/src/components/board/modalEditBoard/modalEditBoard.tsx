import React, {useEffect, useState} from 'react'
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ModalEditBoardProps from "@/components/board/interfaces/modalEditBoardInterface/ModalEditBoard";
import {modalBigStyle} from "@/assets/themes/modalStyle";
import {editBoard} from "@/services/utils/boardUtils/boardUtils";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import Box from "@mui/material/Box";
import ColorSetter from "@/components/color/colorSetter/colorSetter";

const ModalEditBoard = (props:ModalEditBoardProps) => {
    const [title, setTitle] = useState(props.title);
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    useEffect(() => {
        // kiedy zadanie zostanie załadowane, ustawiamy jego wartość w stanie
        setTitle(props.title);
    }, [props.title]);

    return(
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.modalEdit}
                onClose={() => closeModal(props.setModalEdit)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.modalEdit}>
                    <Stack
                        sx={modalBigStyle}
                        spacing={2}
                        direction={'column'}
                    >
                        <Typography
                            color={'textPrimary'}
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Editing Board: {props.title}
                        </Typography>
                        <Box display={'flex'} width={'100%'}>
                            <Box  display={'flex'} width={'50%'} sx={{justifyContent:'start'}}>
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </Box>
                            <ColorSetter
                                colors={props.data.colorList}
                                data={props.data}
                                setData={props.setData}
                            />
                        </Box>
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => editBoard(
                                                    props.id,
                                                    title,
                                                    props.data,
                                                    props.setData,
                                                    props.setModalEdit
                                                )}
                            variant="contained"
                        >
                            Edit
                        </Button>
                    </Stack>
                </Fade>
            </Modal>
    )
}

export default ModalEditBoard
