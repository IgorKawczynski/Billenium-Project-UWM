import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {Typography, useTheme} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import * as React from "react";
import {useState} from "react";
import ModalRemoveChild from "@/components/card/modals/modalRemoveChild/modalRemoveChild";
import {ChildrenPickerItemProps} from "@/components/card/interfaces/childrenPickerItem/childrenPickerItem";
import {openModal} from "@/services/utils/modalUtils/modalUtils";

const ChildrenPickerItem = (props:ChildrenPickerItemProps) => {
    const theme = useTheme()
    const [remove, setRemove] = useState(false)
    return(
        <MenuItem
            onClick={() => openModal(setRemove)}
        >
            <Box
                width={'100%'}
                display={"flex"}
                justifyContent={"space-between"}
            >
                <Typography variant={"body1"}>
                    {props.childTitle}
                </Typography>
                <Box
                    display={"flex"}
                    justifyContent={"end"}
                    alignItems={"center"}
                    width={'100%'}
                >
                    <RemoveIcon sx={{
                        color:theme.palette.primary.main,
                    }}/>
                </Box>
            </Box>
            <ModalRemoveChild
                id={props.cardId}
                childTitle={props.childTitle}
                childId={props.childId}
                setModalDelete={setRemove}
                modalDelete={remove}
                setAnchorEl={props.setAnchorEl}
                data={props.data}
                setData={props.setData}
            />
        </MenuItem>
    )
}
export default ChildrenPickerItem