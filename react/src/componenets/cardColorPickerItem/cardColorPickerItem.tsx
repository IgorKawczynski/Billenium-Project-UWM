import React from "react";
import Box from "@mui/material/Box";
import CardColor from "@/assets/themes/colors";
import MenuItem from "@mui/material/MenuItem";
import {cardColorPickerItemProps} from "@/interfaces/cardColorPickerItemInterface/cardColorPickerItem";
const CardColorPickerItem = (props:cardColorPickerItemProps) =>{

    return(
        <MenuItem onClick={props.handleClose} disableRipple>
            <Box
                width={'20px'}
                height={'20px'}
                borderRadius={'50%'}
                bgcolor={props.color}
                marginRight={1}
            />
            {props.title}
        </MenuItem>
    )
}

export default CardColorPickerItem