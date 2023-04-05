import React from "react";
import {Droppable} from "react-beautiful-dnd";
import {Box, Stack, useTheme} from "@mui/material";
import UserAvatar from "@/components/users/avatar/userAvatar";
import {UsersAvatarsProps} from "@/components/board/interfaces/usersAvatars/usersAvatars";

const UsersAvatars = (props:UsersAvatarsProps) =>{
    const theme = useTheme()

    return(
        <Droppable
            droppableId={"AvatarBox"}
            direction={"horizontal"}
            type={'user'}>
            {(provided) =>(
                <Box {...provided.droppableProps}
                     ref={provided.innerRef}>
                    <Stack
                        border={`1px dashed ${theme.palette.text.secondary} `}
                        minHeight={'30px'}
                        spacing={1}
                        paddingTop={2}
                        paddingBottom={1}
                        display={"flex"}
                        flexWrap={'wrap'}
                        direction={"row"}
                    >
                        {props.data.assignedUsers.map((user,index) => {
                            return(
                                <UserAvatar
                                    key={user.id}
                                    index={index}
                                    userId={user.id}
                                    setUsers={props.setUsers}
                                    name={user.firstName}
                                    lastName={user.lastName}
                                    avatarPath={user.avatarPath}
                                    avatarColor={user.avatarColor}
                                    remainingAssignments={user.remainingAssignments}
                                />
                            )
                        })}
                        {provided.placeholder}
                    </Stack>
                </Box>

            )}
        </Droppable>
    )
}
export default UsersAvatars