import React, {useEffect, useState} from 'react'
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import ModalEditBoardProps from "@/components/board/interfaces/modalEditBoardInterface/ModalEditBoard";
import {modalBigStyle} from "@/assets/themes/modalStyle";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import Box from "@mui/material/Box";
import ColorSetter from "@/components/color/colorSetter/colorSetter";
import EditBoardTitle from "@/components/board/editBoardTitle/editBoardTitle";
import EditBoardWipLimit from "@/components/board/editBoardWipLimit/editBoardWipLimit";

const ModalEditBoard = (props:ModalEditBoardProps) => {
    const [title, setTitle] = useState(props.title);
    const [wipLimit, setWipLimit] = useState(props.data.wipLimit);
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    const handleWipLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWipLimit(event.target.value);
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
                        <EditBoardTitle text={title} setText={setTitle} handleTextChange={handleTitleChange} data={props.data} setData={props.setData} setModalEdit={props.setModalEdit}/>
                        <Box display={'flex'} width={'100%'}>
                            <Box
                                display={'flex'}
                                width={'50%'}
                                justifyContent={"start"}
                                flexDirection={"column"}
                            >
                                <EditBoardWipLimit text={wipLimit} setText={setWipLimit} handleTextChange={handleWipLimitChange} data={props.data} setData={props.setData}/>
                            </Box>
                            <ColorSetter
                                colors={props.data.colorList}
                                data={props.data}
                                setData={props.setData}
                            />
                        </Box>
                    </Stack>
                </Fade>
            </Modal>
    )
}

export default ModalEditBoard
