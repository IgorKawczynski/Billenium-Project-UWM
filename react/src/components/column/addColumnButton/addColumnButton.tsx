import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import AddColumnButtonProps from "@/components/column/interfaces/addColumnButtonInterface/AddColumnButton";
import ModalAddColumn from "@/components/column/modalAddColumn/modalAddColumn";
import Typography from "@mui/material/Typography";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import AddIcon from '@mui/icons-material/Add';
import {useTranslation} from "react-i18next";

export default function AddColumnButton(props:AddColumnButtonProps) {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    return (
        <Box>
            <Box style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center"
                }}
            >
                <Button
                    onClick={() => openModal(setOpen)}
                    sx={{
                        maxWidth:"200px",
                        maxHeight:"50px"
                    }}
                    variant="contained"
                >
                <AddIcon/>
                <Typography variant={"button"}> &nbsp; {t('addColumn')} </Typography>

                </Button>
            </Box>
            <ModalAddColumn
                open={open}
                setOpen={setOpen}
                data={props.data}
                setData={props.setData}
            />
        </Box>
    );
}