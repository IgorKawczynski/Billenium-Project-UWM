import React, {useEffect, useState} from 'react'
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ModalEditBoardProps from "@/componenets/board/interfaces/modalEditBoardInterface/ModalEditBoard";
import {modalBigStyle} from "@/assets/themes/modalStyle";
import {editBoard} from "@/services/utils/boardUtils/boardUtils";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import MenuList from "@mui/material/MenuList";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import IconButton from "@mui/material/IconButton";
import ColorSetter from "@/componenets/color/colorSetter/colorSetter";

const ModalEditBoard = (props:ModalEditBoardProps) => {
    const [name, setName] = useState(props.title);
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    useEffect(() => {
        // kiedy zadanie zostanie załadowane, ustawiamy jego wartość w stanie
        setName(props.title);
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
                    <Stack sx={modalBigStyle} spacing={2} direction={'column'}>
                        <Typography color={'textPrimary'} id="transition-modal-title" variant="h6" component="h2">
                            Editing Board: {props.title}
                        </Typography>
                        <Box display={'flex'} width={'100%'}>
                            <Box  display={'flex'} width={'50%'} sx={{justifyContent:'start'}}>
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </Box>
                            <ColorSetter colors={props.data.colorList} data={props.data} setData={props.setData}/>
                        </Box>
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => editBoard(props.id,name, props.data, props.setData, props.setModalEdit)}
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
