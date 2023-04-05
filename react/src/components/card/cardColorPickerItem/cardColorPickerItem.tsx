import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {cardColorPickerItemProps} from "@/components/card/interfaces/cardColorPickerItem/cardColorPickerItem";
import {changeCardColor} from "@/services/utils/colorUtils/colorUtils";

const CardColorPickerItem = (props:cardColorPickerItemProps) =>{
    const Change = () => {
        changeCardColor(props.cardId, props.cardTitle , props.title, props.colorValue, props.setData, props.data)
        props.setAnchorEl(null);
    };

    return(
        <MenuItem key={props.colorId} onClick={Change} disableRipple>
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