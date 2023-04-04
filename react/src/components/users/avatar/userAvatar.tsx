import React from "react";
import AvatarProps from "@/components/card/interfaces/avatarInterface/Avatar"
import Box from "@mui/material/Box";
import {Avatar, Tooltip, Typography, useTheme} from "@mui/material";
import {Draggable} from "react-beautiful-dnd";

const UserAvatar = (props:AvatarProps) => {
    const initials = props.name[0].toUpperCase() + props.lastName[0].toUpperCase()
    const name = props.name + " " + props.lastName
    const theme = useTheme()
    return(
        <Draggable
            key={props.userId+"d"}
            draggableId={props.userId+"u"}
            index={1}
        >
            {(provided, snapshot) => {
                return(
                    <Box>
                    <Tooltip title={name} placement={'top'}
                             sx={{
                                 width:35,
                                 height:35,
                             }}>
                            <Avatar
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                src={props.avatarPath && props.avatarPath}
                                sx={{
                                        bgcolor:props.avatarColor,
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
    )
}

export default UserAvatar