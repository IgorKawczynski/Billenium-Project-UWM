import React, {useState} from 'react'
import ColumnProps from '../interfaces/Column'
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ModalEditColumnProps from "../interfaces/ModalEditColumn";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalEditColumn = (props:ModalEditColumnProps) => {
    const [name, setName] = useState(props.title);
    const [limit, setLimit] = useState(props.cardsLimit);
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setLimit(value);
    };
    const editColumn = (newTitle: string, limit: number, id:string) => {
        const newColumns = { ...props.data.columnList };
        newColumns[id] = { ...newColumns[id], title: newTitle, cardsLimit:limit };
        props.handleDataChange({
            ...props.data,
            columnList: {
                ...newColumns
            },
        });
        props.modalEditClose()
    }

    return(
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.modalEdit}
                onClose={props.modalEditClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.modalEdit}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Set column name
                        </Typography>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                                <TextField
                                    sx={{margin:'0 0 8px 0'}}
                                    id="outlined-basic"
                                    label="Limit"
                                    variant="outlined"
                                    type="number"
                                    value={limit}
                                    onChange={handleLimitChange}
                                />
                            </Typography>
                        </div>
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => editColumn(name,limit, props.id)}
                            variant="contained"
                        >
                            Edit
                        </Button>
                    </Box>
                </Fade>
            </Modal>
    )
}

export default ModalEditColumn
