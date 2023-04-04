import React, {useEffect, useState} from 'react';
import {
    Backdrop,
    Box,
    Button,
    Fade,
    IconButton,
    Modal,
    Stack,
    TextField,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import ModalEditCardProps from "@/components/card/interfaces/modalEditcard/ModalEditCard";
import {modalBigStyle} from "@/assets/themes/modalStyle";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {updateCard} from "@/services/utils/cardUtils/cardUtils";
import CardMenu from "@/components/card/modals/modalEditCardMenu/modalEditCardMenu";
import ModalEditCardSubtasks from "@/components/card/modals/modalEditCardSubtasks/modalEditCardSubtasks";
import LockIcon from "@mui/icons-material/Lock";
import EditCardTitle from "@/components/card/modals/editCardTitile/editCardTitle";
import EditCardDesc from "@/components/card/modals/editCardDesc/editCardDesc";
import CloseIcon from "@mui/icons-material/Close";

export default function ModalEditCard(props:ModalEditCardProps) {
    const [title, setTitle] = useState(props.title);
    const [desc, setDesc] = useState(props.desc);
    const theme = useTheme()

    useEffect(() => {
        // kiedy zadanie zostanie załadowane, ustawiamy jego wartość w stanie
        setTitle(props.title);
    }, [props.title]);

    useEffect(() => {
        // kiedy zadanie zostanie załadowane, ustawiamy jego wartość w stanie
        setDesc(props.desc);
    }, [props.desc]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value);
    };

    return (
            <Modal
                style={{zIndex:'5'}}
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
                    <Stack sx={modalBigStyle} spacing={1}>
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <EditCardTitle  handleChangeText={handleNameChange} text={title} isLocked={props.isLocked} setModalEdit={props.setModalEdit}/>
                        </Box>
                        <Box
                            display={'flex'}
                        >
                            <Stack
                            direction={'column'}
                            width={'50%'}
                            spacing={2}
                            >
                                <EditCardDesc text={desc} handleChangeText={handleDescChange}/>

                                <ModalEditCardSubtasks
                                    cardId={props.id}
                                    cardTitle={props.title}
                                    subtasks={props.subtasks}
                                    data={props.data}
                                    setData={props.setData}
                                    window={props.setModalEdit}
                                />
                            </Stack>
                            <Box
                                width={'50%'}
                                paddingX={1}
                                display={"flex"}
                                justifyContent={'end'}
                            >
                                <Box>
                                    <CardMenu
                                        cardId={props.id}
                                        cardTitle={props.title}
                                        assignedUsers={props.assignedUsers}
                                        isLocked={props.isLocked}
                                        setModalDelete={props.setModalDelete}
                                        modalDelete={props.modalDelete}
                                        data={props.data}
                                        setData={props.setData}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            width={'100%'}
                            display={'flex'}
                            justifyContent={'center'}
                        >
                        </Box>
                    </Stack>
                </Fade>
            </Modal>
    );
}