import React, {useState} from "react";
import Modal from "@mui/material/Modal";
import {closeModal} from "@/services/utils/modalUtils/modalUtils";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import {modalStyle} from "@/assets/themes/modalStyle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {ModalEditRowProps} from "@/components/column/interfaces/modalEditRow/modalEditRow";
import {editRow} from "@/services/utils/rowUtils/rowUtils";

const ModalEditRow = (props:ModalEditRowProps) => {
    const [title, setTitle] = useState(props.title);
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

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
                    sx={modalStyle}
                    spacing={2}
                    direction={'column'}
                >
                    <Typography color={'textPrimary'} id="transition-modal-title" variant="h6" component="h2">
                        Editing row: {props.title}
                    </Typography>
                    <TextField
                        sx={{margin:'0 0 8px 0'}}
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        value={title}
                        onChange={handleNameChange}
                    />
                    <Button
                        sx={{maxHeight:'50px'}}
                        onClick={() => editRow(
                            props.id,
                            title,
                            props.data,
                            props.setData,
                            props.setModalEdit,
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

export default ModalEditRow
