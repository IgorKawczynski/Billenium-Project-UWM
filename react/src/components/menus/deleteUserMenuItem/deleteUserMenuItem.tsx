import React, {useState} from "react";
import {Avatar, Box, IconButton, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {DeleteUserMenuItemProps} from "@/components/menus/interfaces/deleteUserMenuItem";
import {unassignUserFromBoard} from "@/services/utils/boardUtils/boardUtils";
import ModalRemoveUserFromBoard from "@/components/board/modalRemoveUserFromBoard/modalRemoveUserFromCard";
import {openModal} from "@/services/utils/modalUtils/modalUtils";
import {useTranslation} from "react-i18next";

const DeleteUserMenuItem = (props:DeleteUserMenuItemProps) =>{
    const theme = useTheme()
    const [deleteUser, setDeleteUser] = useState(false)
    const { t } = useTranslation();
    return(
        <Box
            display={"flex"}
            width={'100%'}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Avatar
                src={props.userAvatarPath && props.userAvatarPath}
                sx={{
                    bgcolor:props.userAvatarColor,
                    width: 35,
                    height: 35,
                    marginRight:1
                }}
            >
                <Typography variant={"body1"}>
                    {props.userName[0].toUpperCase() + props.userLastName[0].toUpperCase()}
                </Typography>
            </Avatar>
            <Typography variant={"subtitle1"} color={theme.palette.text.primary}>
            {props.userName + " " + props.userLastName}
            </Typography>
            {props.userId !== props.data.creatorId && (
                <IconButton
                    size={"small"}
                    sx={{
                        maxWidth:'35px',
                        maxHeight:'35px',
                    }}
                    onClick={() => openModal(setDeleteUser)}
                >
                    <PersonRemoveIcon
                        sx={{
                            color:theme.palette.primary.main,
                        }}
                    />
                </IconButton>
            )}
            {props.userId === props.data.creatorId && (
                <Typography variant={"body1"}> {t('owner')} </Typography>
            )}
            <ModalRemoveUserFromBoard
                userId={props.userId}
                firstName={props.userName}
                lastName={props.userLastName}
                data={props.data}
                setData={props.setData}
                modalDelete={deleteUser}
                setModalDelete={setDeleteUser}
                />
        </Box>
    )
}
export default DeleteUserMenuItem