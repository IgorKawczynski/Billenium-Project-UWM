import React, {useState, useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditCardButtonProps from "../interfaces/EditCardButton";
import {v4 as uuidv4} from "uuid";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import ModalEditCardProps from "../interfaces/ModalEditCard";

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
    const handleSubmit = ({event}: { event: any }) => {
        event.preventDefault();
        // możesz tutaj przesłać dane do serwera lub zaktualizować stan aplikacji
    };

    const updateCard = (name: string, desc: string) => {
        const newItemId = uuidv4();
        const newItem = { id: newItemId, title: name, desc: desc };
        const column = props.data.columnList[props.columnId];
        const newItems = column.cards.map((card:any) => {
            if (card.id === props.id) {
                // jeśli to jest zadanie, które chcemy zaktualizować, to zwracamy nowe zadanie
                return {
                    ...card,
                    ...newItem
                };
            }
            // w przeciwnym przypadku zwracamy istniejące zadanie bez zmian
            return card;
        });

        // tworzymy nową kolumnę z zaktualizowanymi zadaniami
        const newColumn = {
            ...column,
            cards: newItems
        };

        // zaktualizowana lista kolumn
        const newColumns = {
            ...props.data.columnList,
            [props.columnId]: newColumn
        };

        props.handleDataChange({
            ...props.data,
            columnList: newColumns
        })
        props.modalEditClose();
    };

    return (
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
                            Editing card: {props.title}
                        </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
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
                                </div>
                            </Typography>
                        <div style={{width:'100%', display:"flex", justifyContent:"center"}}>
                        <Button
                            sx={{maxHeight:'50px'}}
                            onClick={() => updateCard(title,desc)}
                            variant="contained"
                        >
                            Edit
                        </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
    );
}