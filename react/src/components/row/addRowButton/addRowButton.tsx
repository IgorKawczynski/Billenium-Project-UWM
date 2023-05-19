import React, {useState} from "react";
import {Box, Button} from "@mui/material";
import ModalAddRow from "@/components/row/modalAddRow/modalAddRow";
import {AddRowButtonProps} from "@/components/row/interfaces/AddRowButtonInterface/addRowButton";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import {useTranslation} from "react-i18next";


const AddRowButton = (props:AddRowButtonProps) =>{
    const [open, setOpen] = useState(false)
    const { t } = useTranslation();
    return(
        <Box>
            <Button
                onClick={() => openModal(setOpen)}
                variant={"outlined"}
            >
                {t('addRow')}
            </Button>
            <ModalAddRow open={open} setOpen={setOpen} data={props.data} setData={props.setData}/>
        </Box>
    )
}
export default AddRowButton