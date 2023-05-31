import React from "react";
import AvatarProps from "@/components/card/interfaces/avatarInterface/Avatar"
import Box from "@mui/material/Box";
import {Avatar, Badge, Tooltip, Typography, useTheme} from "@mui/material";
import {Draggable} from "react-beautiful-dnd";

const UserAvatar = (props:AvatarProps) => {
    const initials = props.name[0].toUpperCase() + props.lastName[0].toUpperCase()
    const name = props.name + " " + props.lastName
    const theme = useTheme()
    return(
        <Draggable
            key={props.userId+"u"}
            draggableId={props.userId+"u"}
            index={props.index}
            isDragDisabled={props.remainingAssignments == 0}
        >
            {(provided, snapshot) => {
                return(
                    <Box
                        maxWidth={'35px'}
                        maxHeight={'35px'}
                        marginLeft={1}
                        marginBottom={1}
                        display={"flex"}
                        alignItems={"center"}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                            sx={{
                            ...provided.draggableProps.style
                        }}
                    >
                        <Badge
                            badgeContent={props.remainingAssignments ? props.remainingAssignments : '0'}
                            color={"primary"}
                        >
                            <Tooltip title={name} placement={'top'}
                                     sx={{
                                         width:35,
                                         height:35,
                                     }}>
                                    <Avatar
                                        src={props.avatarPath && props.avatarPath}
                                        sx={{
                                                border:props.remainingAssignments > 0 ? "" : 'solid 2px red',
                                                bgcolor:props.avatarColor,
                                                width: 35,
                                                height: 35,
                                            }}
                                    >
                                        <Typography variant={"body1"}>
                                            {initials}
                                        </Typography>
                                    </Avatar>
                            </Tooltip>
                        </Badge>
                    </Box>
                )}
            }
        </Draggable>
    )
}

export default UserAvatar