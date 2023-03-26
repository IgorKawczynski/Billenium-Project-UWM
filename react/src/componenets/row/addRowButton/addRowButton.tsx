import React, {useState} from "react";
import {Button, Box} from "@mui/material";
import ModalAddRow from "@/componenets/row/modalAddRow/modalAddRow";
import {AddRowButtonProps} from "@/componenets/row/interfaces/AddRowButtonInterface/addRowButton";
import {openModal} from "@/services/utils/modalUtils/modalUtils";


const AddRowButton = (props:AddRowButtonProps) =>{
    const [open, setOpen] = useState(false)
    return(
        <Box>
            <Button
                onClick={() => openModal(setOpen)}
                variant={"outlined"}
            >
                Add row
            </Button>
            <ModalAddRow open={open} setOpen={setOpen} data={props.data} setData={props.setData}/>
        </Box>
    )
}
export default AddRowButton