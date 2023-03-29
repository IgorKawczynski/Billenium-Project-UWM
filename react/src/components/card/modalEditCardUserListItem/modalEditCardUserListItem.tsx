import React, {useState} from "react";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {Box, MenuItem, useTheme} from "@mui/material";
import {
    ModalEditCardUserListItemProps
} from "@/components/card/interfaces/modalEditCardUserListItem/modalEditCardUserListItem";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import ModalRemoveUserFromCard from "@/components/card/modalRemoveUserFromCard/modalRemoveUserFromCard";
const ModalEditCardUserListItem = (props:ModalEditCardUserListItemProps) =>{
    const theme = useTheme()
    const [modalDelete, setModalDelete] = useState(false)

    return(
        <MenuItem
            key={props.userId}
            onClick={() => openModal(setModalDelete)}
            disableRipple
        >
            <Box
                display={"flex"}
                width={'100%'}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                {props.userName + " " + props.userLastName}
                <PersonRemoveIcon
                    fontSize={"medium"}
                    sx={{color:theme.palette.primary.main}}
                />
            </Box>
            <ModalRemoveUserFromCard
                cardId={props.cardId}
                cardTitle={props.cardTitle}
                userId={props.userId}
                userName={props.userName}
                userLastName={props.userLastName}
                setModalDelete={setModalDelete}
                setAnchorEl={props.setAnchorEl}
                modalDelete={modalDelete}
                data={props.data}
                setData={props.setData}
                />
        </MenuItem>
    )
}

export default ModalEditCardUserListItem