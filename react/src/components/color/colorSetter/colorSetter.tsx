import React from "react";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material";
import ColorSetterRow from "@/components/color/colorSetterRow/colorSetterRow";
import {ColorListProps} from "@/components/color/interfaces/colorListInterface/colorList";

const ColorSetter = (props:ColorListProps) =>{
    const theme = useTheme()

    return(
        <Box maxWidth={'100%'}>

            {props.colors.map((color) =>(
                color.value != 'default' && (
                        <ColorSetterRow
                            key={color.id}
                            color={color.value}
                            title={color.title}
                            id={color.id}
                            data={props.data}
                            setData={props.setData}
                        />
                    )
            ))}

        </Box>
    )
}

export default ColorSetter