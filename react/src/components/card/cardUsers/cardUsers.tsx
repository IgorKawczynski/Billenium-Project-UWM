import React from "react";
import {Avatar, AvatarGroup, Tooltip, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CardUsersProps} from "@/components/card/interfaces/CardUsers/cardUsers";


const CardUsers = (props:CardUsersProps) =>{
    const theme = useTheme()

    return(
                    <AvatarGroup
                        max={4}
                        sx={{
                            '.MuiAvatarGroup-more':{
                            fontSize: 12
                            },
                            '.MuiAvatarGroup-avatar': {
                                width: 30,
                                height: 30,
                            },
                        }}
                    >
                        {props.assignedUsers.map(user => {
                            return(
                                <Tooltip
                                    key={user.id}
                                    title={user.firstName + " " +user.lastName}
                                    placement={"bottom"}>
                                    <Avatar
                                        src={user.avatarPath && user.avatarPath}
                                        sx={{
                                            bgcolor:user.avatarColor
                                        }}
                                    >
                                        <Typography variant={"body1"}>
                                            {user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
                                        </Typography>
                                    </Avatar>
                                </Tooltip>
                            )
                        })}
                    </AvatarGroup>
    )
}

export default CardUsers
