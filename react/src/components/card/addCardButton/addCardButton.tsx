import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import AddCardButtonProps from "@/components/card/interfaces/addCardButton/AddCardButton";
import ModalAddCard from "@/components/card/modals/modalAddCard/modalAddCard";
import Typography from "@mui/material/Typography";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {useTranslation} from "react-i18next";

export default function AddCardButton(props:AddCardButtonProps) {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    return (
        <Box>
            <Box
                style={{
                    display:"flex",
                    width:'100%',
                    flexDirection:"row",
                    justifyContent:"flex-end",
                    alignItems:"center"
                }}
            >
                <Button
                    onClick={() => openModal(setOpen)}
                    sx={{
                        maxHeight:"50px",
                    }}
                    variant="text"
                >
                    <Typography variant={"button"}> {t('addCard')} &nbsp;</Typography>
                    <AddCircleOutlineOutlinedIcon/>
                </Button>
            </Box>
            <ModalAddCard
                open={open}
                setOpen={setOpen}
                cellId={props.cellId}
                data={props.data}
                setData={props.setData}
            />

        </Box>
    );
}