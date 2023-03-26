import React from "react";
import AvatarProps from "@/componenets/card/interfaces/avatarInterface/Avatar"
import Box from "@mui/material/Box";
import {Grid,Avatar, Badge, Tooltip, Typography, useTheme} from "@mui/material";
import {Draggable} from "react-beautiful-dnd";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";

const UserAvatar = (props:AvatarProps) => {
    const initials = props.name[0].toUpperCase() + props.lastName[0].toUpperCase()
    const name = props.name + " " + props.lastName
    const theme = useTheme()
    return(
        <Grid item
            xs={3}
        >
        <Draggable
            key={'userId'}
            draggableId={props.userId}
            index={1}
        >
            {(provided, snapshot) => {
                return(
                    <Box display={"flex"} alignItems={"center"}>
                    <Tooltip title={name} placement={'top'}
                             sx={{
                                 width:35,
                                 height:35,
                             }}>
                            <Avatar
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                        width: 35,
                                        height: 35,
                                        ...provided.draggableProps.style
                                    }}
                            >
                                <Typography variant={"body1"}>
                                    {initials}
                                </Typography>
                            </Avatar>
                    </Tooltip>
                    </Box>
                )}
            }
        </Draggable>
        </Grid>
    )
}

export default UserAvatar