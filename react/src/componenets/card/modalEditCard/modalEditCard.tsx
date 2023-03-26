import React, {useState, useEffect} from 'react';
import {Modal, Stack, Typography, Fade, Backdrop, Button, TextField, Box} from "@mui/material";
import ModalEditCardProps from "@/componenets/card/interfaces/modalEditcardInterface/ModalEditCard";
import {modalBigStyle} from "@/assets/themes/modalStyle";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import {updateCard} from "@/services/utils/cardUtils/cardUtils";
import CardMenu from "@/componenets/card/modalEditCardMenu/modalEditCardMenu";
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
                    <Stack sx={modalBigStyle} spacing={2}>
                        <Typography color={'textPrimary'} id="transition-modal-title" variant="h6" component="h2">
                            {props.title}
                        </Typography>
                        <Box
                            display={'flex'}
                        >
                            <Box
                            display={'flex'}
                            flexDirection={'column'}
                            width={'50%'}
                            paddingX={1}
                            >
                                    <TextField
                                        sx={{margin:'0 0 8px 0'}}
                                        id="outlined-basic"
                                        label="Title"
                                        variant="outlined"
                                        value={title}
                                        onChange={handleNameChange}
                                    />
                                    <TextField
                                        sx={{margin:'0 0 8px 0'}}
                                        id="outlined-basic"
                                        label="Desc"
                                        variant="outlined"
                                        multiline={true}
                                        maxRows={5}
                                        value={desc}
                                        onChange={handleDescChange}
                                    />
                            </Box>
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
                            <Button
                                sx={{maxHeight:'50px', width:'100px'}}
                                onClick={() => updateCard(props.id,
                                                        title,
                                                        desc,
                                                        props.setData,
                                                        props.data,
                                                        props.setModalEdit
                                                        )}
                                variant="contained"
                            >
                                Edit
                            </Button>
                        </Box>
                    </Stack>
                </Fade>
            </Modal>
    );
}