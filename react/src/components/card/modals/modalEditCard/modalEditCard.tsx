import React, {useEffect, useState} from 'react';
import {Backdrop, Box, Fade, Modal, Stack} from "@mui/material";
import ModalEditCardProps from "@/components/card/interfaces/modalEditcard/ModalEditCard";
import {modalBigStyle} from "@/assets/themes/modalStyle";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import CardMenu from "@/components/card/modals/modalEditCardMenu/modalEditCardMenu";
import ModalEditCardSubtasks from "@/components/card/modals/modalEditCardSubtasks/modalEditCardSubtasks";
import EditCardTitle from "@/components/card/modals/editCardTitile/editCardTitle";
import EditCardDesc from "@/components/card/modals/editCardDesc/editCardDesc";
import AddChildComponent from "@/components/card/modals/addChildComponent/addChildComponent";

export default function ModalEditCard(props:ModalEditCardProps) {
    const [title, setTitle] = useState(props.title);
    const [desc, setDesc] = useState(props.desc);

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
                        <EditCardTitle
                            cardId={props.id}
                            handleChangeText={handleNameChange}
                            text={title}
                            desc={desc}
                            isLocked={props.isLocked}
                            setModalEdit={props.setModalEdit}
                            data={props.data}
                            setData={props.setData}
                        />
                    </Box>
                    <Box
                        display={'flex'}
                    >
                        <Stack
                            direction={'column'}
                            width={'50%'}
                            spacing={2}
                        >
                            <EditCardDesc cardId={props.id}
                                          handleChangeText={handleDescChange}
                                          text={title}
                                          desc={desc}
                                          isLocked={props.isLocked}
                                          setModalEdit={props.setModalEdit}
                                          data={props.data}
                                          setData={props.setData}/>

                            <ModalEditCardSubtasks
                                cardId={props.id}
                                cardTitle={props.title}
                                subtasks={props.subtasks}
                                data={props.data}
                                setData={props.setData}
                                window={props.setModalEdit}
                            />
                        </Stack>
                        <Stack
                            width={'50%'}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Box
                                mt={2}
                            >
                                <CardMenu
                                    cardId={props.id}
                                    cardTitle={props.title}
                                    assignedUsers={props.assignedUsers}
                                    isLocked={props.isLocked}
                                    children={props.children}
                                    setModalDelete={props.setModalDelete}
                                    modalDelete={props.modalDelete}
                                    data={props.data}
                                    setData={props.setData}
                                />
                            </Box>
                            <Box
                                mt={5}
                                width={'100%'}
                                display={'flex'}
                                justifyContent={'center'}
                            >
                                <AddChildComponent
                                    boardId={props.data.id}
                                    cardId={props.id}
                                    data={props.data}
                                    setData={props.setData}
                                />
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Fade>
        </Modal>
    );
}