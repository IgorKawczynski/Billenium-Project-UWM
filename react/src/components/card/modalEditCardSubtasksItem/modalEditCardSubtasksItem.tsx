import React, {useState} from "react";
import {Checkbox, FormControlLabel, useTheme} from "@mui/material";
import {
    ModalEditCardSubtasksItemProps
} from "@/components/card/interfaces/modalEditCardSubtasksItem/modalEditCardSubtasksItem";

const ModalEditCardSubtasksItem = (props:ModalEditCardSubtasksItemProps) =>{
    const theme = useTheme()
    const [isChecked, setIsChecked] = useState(props.isChecked)


    const handleClickCheckbox = () => {
        setIsChecked(prevState => !prevState)
    }

    return(
        <FormControlLabel
            sx={{color:theme.palette.text.secondary, margin:0}}
            control={
                <Checkbox
                    checked={isChecked}
                    onClick={handleClickCheckbox}
                />
            }
            label={props.title}
        />
    )
}
export default ModalEditCardSubtasksItem