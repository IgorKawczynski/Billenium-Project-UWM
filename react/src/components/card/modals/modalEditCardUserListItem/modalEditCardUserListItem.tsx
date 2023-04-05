import React, {useState} from "react";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {Avatar, Box, MenuItem, useTheme} from "@mui/material";
import {
    ModalEditCardUserListItemProps
} from "@/components/card/interfaces/modalEditCardUserListItem/modalEditCardUserListItem";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import ModalRemoveUserFromCard from "@/components/card/modals/modalRemoveUserFromCard/modalRemoveUserFromCard";
import Typography from "@mui/material/Typography";

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
                    <Avatar
                        src={props.userAvatarPath && props.userAvatarPath}
                        sx={{
                            width: 35,
                            height: 35,
                            marginRight:1,
                            bgcolor:props.userAvatarColor
                        }}
                    >
                        <Typography variant={"body1"}>
                            {props.userName[0].toUpperCase() + props.userLastName[0].toUpperCase()}
                        </Typography>
                    </Avatar>
                {props.userName + " " + props.userLastName}
                <PersonRemoveIcon
                    sx={{
                        color:theme.palette.primary.main,
                        fontSize:'18px',
                        marginLeft:1
                }}
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