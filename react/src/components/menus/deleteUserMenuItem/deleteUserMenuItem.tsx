import React from "react";
import {Avatar, Box, IconButton, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {DeleteUserMenuItemProps} from "@/components/menus/interfaces/deleteUserMenuItem";
import {unassignUserFromBoard} from "@/services/utils/boardUtils/boardUtils";

const DeleteUserMenuItem = (props:DeleteUserMenuItemProps) =>{
    const theme = useTheme()

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
            <IconButton
                size={"small"}
                sx={{
                    maxWidth:'35px',
                    maxHeight:'35px',
                }}
                onClick={() => unassignUserFromBoard(
                                                        props.data.id,
                                                        props.userId,
                                                        props.data,
                                                        props.setData
                                                    )}
            >
                <PersonRemoveIcon
                    sx={{
                        color:theme.palette.primary.main,
                    }}
                />
            </IconButton>
        </Box>
    )
}
export default DeleteUserMenuItem